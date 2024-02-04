import { Box } from "@chakra-ui/react";
import Chopper from "../components/search/Chopper";
import Filters from "../components/search/Filters";
import { Map, Marker, MapProvider, useMap  } from "react-map-gl";
import { useRef } from "react";

// css module
import "./searchpage.module.css";

// type data
import type ChopperType from "../types/chopper";

const results = [
  {
    id: 1,
    image:
      "https://as2.ftcdn.net/v2/jpg/04/88/88/03/1000_F_488880354_jMajUoobcE4xFQIkMyycSNYJV3fwXEvW.jpg",
    title: "Chez Toutou",
    address: "123 rue du chien",
    rating: 4.5,
    reviews: 449,
    location: {
      lat: 37.79478,
      lng: -122.446342,
      address: "123 rue du chien",
    },
    availabilities: [
      // Example, 4 availabilities for 11/01/2024
      {
        date: "11/01/2024",
        availabilities: [
          {
            start: "09:00",
            end: "10:00",
          },
          {
            start: "10:00",
            end: "11:00",
          },
          {
            start: "11:00",
            end: "12:00",
          },
          {
            start: "12:00",
            end: "13:00",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    image:
      "https://as2.ftcdn.net/v2/jpg/04/88/88/03/1000_F_488880354_jMajUoobcE4xFQIkMyycSNYJV3fwXEvW.jpg",
    title: "Chez Médor",
    address: "123 rue du chien",
    rating: 4.5,
    reviews: 449,
    location: {
      lat: 45.50884,
      lng: -73.58781,
      address: "123 rue du chien",
    },
    availabilities: [
      // Example, 4 availabilities for 11/01/2024
      {
        date: "11/01/2024",
        availabilities: [
          {
            start: "09:00",
            end: "10:00",
          },
          {
            start: "10:00",
            end: "11:00",
          },
          {
            start: "11:00",
            end: "12:00",
          },
          {
            start: "12:00",
            end: "13:00",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    image:
      "https://as2.ftcdn.net/v2/jpg/04/88/88/03/1000_F_488880354_jMajUoobcE4xFQIkMyycSNYJV3fwXEvW.jpg",
    title: "Chez Rex",
    address: "123 rue du chien",
    rating: 4.5,
    reviews: 449,
    location: {
      lat: 45.50884,
      lng: -73.58781,
      address: "123 rue du chien",
    },
    availabilities: [
      // Example, 4 availabilities for 11/01/2024
      {
        date: "11/01/2024",
        availabilities: [
          {
            start: "09:00",
            end: "10:00",
          },
          {
            start: "10:00",
            end: "11:00",
          },
          {
            start: "11:00",
            end: "12:00",
          },
          {
            start: "12:00",
            end: "13:00",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    image:
      "https://as2.ftcdn.net/v2/jpg/04/88/88/03/1000_F_488880354_jMajUoobcE4xFQIkMyycSNYJV3fwXEvW.jpg",
    title: "Chez Toutou",
    address: "123 rue du chien",
    rating: 4.5,
    reviews: 449,
    location: {
      lat: 45.50884,
      lng: -73.58781,
      address: "123 rue du chien",
    },
    availabilities: [
      // Example, 4 availabilities for 11/01/2024
      {
        date: "11/01/2024",
        availabilities: [
          {
            start: "09:00",
            end: "10:00",
          },
          {
            start: "10:00",
            end: "11:00",
          },
          {
            start: "11:00",
            end: "12:00",
          },
          {
            start: "12:00",
            end: "13:00",
          },
        ],
      },
    ],
  },
];

const SearchPage = () => {
  const map = useMap();
  const mapRef = useRef(null)

  const handleChopperClick = (chopper: ChopperType) => {
    console.log("Chopper clicked", chopper.id);
    console.log(map);
    if (map) {
      mapRef.current?.flyTo({ center: [chopper.location.lng, chopper.location.lat] });
    } else {
      console.error("Map is not initialized");
    }
  };

  return (
    <Box w="100%" h="100%" className="flex flex-col">
      <Filters />
      <Box w="100%" bg="blue.500" className="flex grow max-h-[84vh]">
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
              <Box onClick={() => handleChopperClick(result)}>
                <Chopper key={result.id} infos={result} />
              </Box>
            ))}
            {results.map((result) => (
              <Chopper key={result.id} infos={result} />
            ))}
          </Box>
          <Box w="70%" className="flex grow">
            <Box w="100%" h="100%">
              <Map
                id="map"
                ref={mapRef}
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_GLJS_TOKEN}
                initialViewState={{
                  longitude: -122.4,
                  latitude: 37.8,
                  zoom: 14,
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
              >
                {/* For each result add marker */}
                {results.map((result) => (
                  <Marker
                    key={result.id}
                    longitude={result.location.lng}
                    latitude={result.location.lat}
                    color="red"
                  >
                    <div>Marker</div>
                  </Marker>
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
