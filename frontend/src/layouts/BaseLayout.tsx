import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import homePageJumbo from "/happydog.png";
import {
  Container,
  Text,
  Stack,
  IconButton,
  useToast,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import "./baselayout.module.css";
import { MdOutlineMyLocation } from "react-icons/md";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Header } from "../components/Header";

export default function RootLayout() {
  const locationInputRef = useRef<HTMLInputElement>(null);
  const serviceInputRef = useRef<HTMLInputElement>(null);
  const loadingLocation = useRef(false);
  const toast = useToast();
  const toastIdRef = useRef<string | number | undefined>("");
  const navigate = useNavigate();

  const servicesSuggestions = [
    "Groomer",
    "Haircut",
    "Special services",
    "Nail trimming",
    "Bathing",
    "Teeth cleaning",
    "Ear cleaning",
    "Anal gland expression",
    "Flea bath",
    "Deshedding",
    "Furminator",
  ];

  const showPosition = async (position: any) => {
    loadingLocation.current = true;

    const address = await fetch(
      `${import.meta.env.VITE_MAPBOX_GEOCODE_URI}/${
        import.meta.env.VITE_MAPBOX_GEOCODE_ENDPOINT
      }/${position.coords.longitude},${
        position.coords.latitude
      }.json?access_token=${import.meta.env.VITE_MAPBOX_GLJS_TOKEN}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (locationInputRef.current)
          locationInputRef.current.value = data?.features[0]?.place_name;
        loadingLocation.current = false;
      });

    return address;
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      addToast();
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const addToast = () => {
    toastIdRef.current = toast({
      title: "Unable to get location",
      description: "Geolocation is not supported",
      status: "error",
      duration: 2000,
    });
  };

  const handleSearch = () => {
    if (locationInputRef.current && serviceInputRef.current) {
      if (locationInputRef.current.value && serviceInputRef.current.value) {
        navigate(
          `/search?service=${serviceInputRef.current.value}&location=${locationInputRef.current.value}`
        );
      }
    }
  };

  return (
    <div className="pageContainer">
      <div
        className="jumbo h-screen w-screen flex items-center justify-center"
        style={{
          backgroundColor: `red`,
          backgroundImage: `url(${homePageJumbo}), linear-gradient(to right, #B6A0E5, #e4cbfd)`,
          backgroundSize: "contain",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="root-layout p-6">
          <Header/>
          <Container
            maxW="100%"
            minH={`calc(100% - 48px)`}
            className="p-4 flex justify-start items-center"
          >
            <Stack align="start" className="grow">
              <Text
                fontSize="6xl"
                fontWeight="600"
                color="white"
                align="start"
                className="leading-none"
              >
                Your pup
                <br />
                needs a cut?
              </Text>
              <Text
                fontSize="2xl"
                fontWeight="500"
                color="white"
                className="leading-none"
              >
                easily find your groomie to make puppy happy.
              </Text>
              <Stack
                spacing="4"
                borderRadius="md"
                direction="row"
                background="white"
                className="w-full"
                my="8"
              >
                <label className="flex flex-col grow items-start ml-10 py-4 font-normal text-[#8D999F]">
                  <FormControl w="100%">
                    <FormLabel>What service are you looking for?</FormLabel>
                    <AutoComplete openOnFocus>
                      <AutoCompleteInput
                        variant="filled"
                        placeholder="Groomer, haircut, special services..."
                        value={serviceInputRef.current?.value}
                        ref={serviceInputRef}
                      />
                      <AutoCompleteList>
                        {servicesSuggestions.map((suggestion, cid) => (
                          <AutoCompleteItem
                            key={`option-${cid}`}
                            value={suggestion}
                            textTransform="capitalize"
                            onClick={() => {
                              if (serviceInputRef.current)
                                serviceInputRef.current.value = suggestion;
                            }}
                          >
                            {suggestion}
                          </AutoCompleteItem>
                        ))}
                      </AutoCompleteList>
                    </AutoComplete>
                  </FormControl>
                </label>
                <label className="flex flex-col grow items-start py-4 font-normal text-[#8D999F]">
                  <FormControl w="100%">
                    <FormLabel>Where?</FormLabel>
                    <InputGroup>
                      <Input
                        variant="filled"
                        ref={locationInputRef}
                        type="text"
                        placeholder="Address, city..."
                      />
                      <InputRightElement>
                        <IconButton
                          onClick={getLocation}
                          isLoading={loadingLocation.current}
                          aria-label="Search database"
                          icon={<MdOutlineMyLocation />}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </label>
                <button
                  className="bg-[#B6A0E5] text-white grow my-4 mr-10"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </Stack>
            </Stack>
          </Container>
        </div>
      </div>
    </div>
  );
}
