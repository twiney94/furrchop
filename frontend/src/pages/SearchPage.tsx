import { Box, IconButton, Spinner, useToast } from "@chakra-ui/react";
import Chopper from "../components/search/Chopper";
import { Map, Marker, MapProvider, MapRef } from "react-map-gl";
import { useEffect, useRef, useState } from "react";
import { httpCall, outsideHttpCall } from "../services/http";
import * as turf from "@turf/turf";

// css module
import "./searchpage.module.css";

// type data
import { StarIcon } from "@chakra-ui/icons";
import { MdAccountCircle } from "react-icons/md";
import { BookingShopResponse } from "../types/schedule";

const SearchPage = () => {
  const [results, setResults] = useState<BookingShopResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<MapRef>();
  const toast = useToast();
  const [userLocation, setUserLocation] = useState<any>({});

  const fetchChoppers = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const service = searchParams.get("service");
    const response = await httpCall(
      "GET",
      `shops?services.name=${service}`,
      {}
    );
    // then batch geocode for each shop
    const shops = response.data["hydra:member"];
    // put each shop location in a string with ; separator
    const batchGeocode = shops.map((shop: any) => {
      const urlEncodedAddress = encodeURIComponent(shop.address);
      return `${urlEncodedAddress}`;
    });

    const requestStrings = [];
    for (let i = 0; i < batchGeocode.length; i++) {
      requestStrings.push(
        `https://api.geoapify.com/v1/geocode/search?text=${batchGeocode[i]}}&format=json&apiKey=${import.meta.env.VITE_GEOCODER_API}`
      );
    }
    // call for each shop
    const geocodedShops = await Promise.all(
      requestStrings.map((requestString) =>
        outsideHttpCall("GET", requestString, {})
      )
    );

    const choppers = shops.map((shop: any, index: number) => {
      const geocodedShop = geocodedShops[index].data;
      const lon = geocodedShop.results[0].lon;
      const lat = geocodedShop.results[0].lat;
      return {
        id: shop.id,
        name: shop.name,
        address: shop.address,
        location: {
          lat: lat,
          lng: lon,
        },
      };
    });

    const location = searchParams.get("location");

    // get the user search "location" like choppers
    const userLocation = await outsideHttpCall(
      "GET",
      `https://api.geoapify.com/v1/geocode/search?text=${location}&apiKey=${import.meta.env.VITE_GEOCODER_API}`,
      {}
    ).then((response) => response.data);

    console.log(userLocation);

    const userLat = userLocation.features[0].geometry.coordinates[1];
    const userLon = userLocation.features[0].geometry.coordinates[0];
    setUserLocation({ lat: userLat, lon: userLon });

    // then calculate the distance between the user and each chopper using turf
    const userPoint = turf.point([userLon, userLat]);
    const choppersWithDistance = choppers.map(
      (chopper: { location: { lng: any; lat: any } }) => {
        const chopperPoint = turf.point([
          chopper.location.lng,
          chopper.location.lat,
        ]);
        const distance = turf.distance(userPoint, chopperPoint);
        return {
          ...chopper,
          distance: distance,
        };
      }
    );

    return choppersWithDistance.sort(
      (a: { distance: number }, b: { distance: number }) =>
        a.distance - b.distance
    );
  };

  useEffect(() => {
    const loadChoppers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch choppers and user location
        const data = await fetchChoppers();
        console.log(data);

        // Calculate the bounding box
        const points = data.map(
          (chopper: { location: { lng: any; lat: any } }) => [
            chopper.location.lng,
            chopper.location.lat,
          ]
        );
        if (userLocation.lat && userLocation.lon) {
          points.push([userLocation.lon, userLocation.lat]);
        }

        setResults(data);
      } catch (err) {
        setError("Failed to load data");
        console.log(err)
        toast({
          title: "Error loading data",
          description: "Could not load chopper data from the server.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadChoppers();
  }, [toast]);

  const handleChopperClick = (chopper: BookingShopResponse) => {
    if (chopper.location)
      mapRef.current?.flyTo({
        center: [chopper.location.lng, chopper.location.lat],
      });
  };

  const goToChopperOnList = (chopper: BookingShopResponse) => {
    const chopperElement = document.getElementById(`chopper-${chopper.id}`);
    chopperElement?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  return (
    <Box w="100%" h="100%" className="flex flex-col">
      <Box w="100%" bg="blue.500" className="flex grow max-h-[84vh] min-h-full">
        <MapProvider>
          <Box
            h={{ base: "auto", sm: "100%" }}
            overflowY={{ base: "auto", sm: "auto" }}
            w="30%"
            borderWidth="1px"
            maxH={{ base: "100%", sm: "100%" }}
            overflow="auto"
            bg="white"
            border="none"
            borderRadius={0}
            className="flex flex-col justify-start"
          >
            {results.map((result) => (
              <div key={result.id} onClick={() => handleChopperClick(result)}>
                <Chopper infos={result} id={`chopper-${result.id}`} />
              </div>
            ))}
          </Box>
          <Box w="70%" className="flex grow">
            <Box w="100%" h="100%">
              <Map
                id="map"
                ref={mapRef as any}
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_GLJS_TOKEN}
                initialViewState={{
                  longitude: userLocation.lon,
                  latitude: userLocation.lat,
                  zoom: 16,
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
              >
                {results.map((result) => (
                  <>
                    <Marker
                      key={result.id}
                      longitude={result.location ? result.location.lng : 0}
                      latitude={result.location ? result.location.lat : 0}
                    >
                      <IconButton
                        isRound={true}
                        variant="solid"
                        colorScheme="purple"
                        aria-label="Done"
                        fontSize="20px"
                        onClick={() => goToChopperOnList(result)}
                        icon={<StarIcon />}
                      />
                    </Marker>
                    // marker for location query
                    <Marker
                      longitude={userLocation.lon}
                      latitude={userLocation.lat}
                    >
                      <IconButton
                        isRound={true}
                        variant="solid"
                        colorScheme="blue"
                        aria-label="Done"
                        fontSize="20px"
                        onClick={() => goToChopperOnList(result)}
                        icon={<MdAccountCircle />}
                      />
                    </Marker>
                  </>
                ))}
              </Map>
            </Box>
          </Box>
        </MapProvider>
      </Box>
    </Box>
  );
};

export default SearchPage;
