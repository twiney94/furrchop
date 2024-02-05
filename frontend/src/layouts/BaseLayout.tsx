import {
  Outlet,
  NavLink,
  Router,
  useRoutes,
  useNavigate,
} from "react-router-dom";
import { useRef } from "react";
import furrChopLogoWhite from "/furrchopwhite.svg";
import homePageJumbo from "/homepage-jumbo.png";
import {
  Flex,
  Avatar,
  Button,
  Container,
  Text,
  Stack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import "./baselayout.module.css";
import { MdOutlineMyLocation } from "react-icons/md";

const user = {
  name: "Ryan Florence",
  imageUrl: "https://bit.ly/ryan-florence",
};

export default function RootLayout() {
  const locationInputRef = useRef<HTMLInputElement>(null);
  const serviceInputRef = useRef<HTMLInputElement>(null);
  const loadingLocation = useRef(false);
  const toast = useToast();
  const toastIdRef = useRef<string | number | undefined>("");
  const navigate = useNavigate();

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
        className="jumbo"
        style={{
          backgroundImage: `url(${homePageJumbo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "60vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="root-layout p-6">
          <header>
            <nav className="flex h-12 flex-grow justify-between">
              <img src={furrChopLogoWhite} alt="FurrChop" className="h-full" />
              <Flex className="items-center gap-4 font-light text-white">
                <NavLink to="/">Home</NavLink>
                <NavLink to="about">About</NavLink>
                <NavLink to="help">Help</NavLink>
                <Button colorScheme="teal" variant="outline">
                  Sign Up
                </Button>
                <Avatar name={user.name} src={user.imageUrl} />
              </Flex>
            </nav>
          </header>
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
                  <span className="w-full flex justify-start px-2">
                    Do you know the name?
                  </span>
                  <input
                    ref={serviceInputRef}
                    className="w-full p-2 placeholder:text-black"
                    type="text"
                    placeholder="Groomer, haircut, special services..."
                    autoComplete="off"
                  />
                </label>
                <label className="flex flex-col grow items-start py-4 font-normal text-[#8D999F]">
                  <span className="w-full flex justify-start px-2">Where?</span>
                  <Flex className="relative w-full items-center">
                    <input
                      ref={locationInputRef}
                      className="w-full h-fit p-2 placeholder:text-black grow"
                      type="text"
                      placeholder="Address, city..."
                      autoComplete="off"
                    />
                    <IconButton
                      onClick={getLocation}
                      isLoading={loadingLocation.current}
                      aria-label="Search database"
                      icon={<MdOutlineMyLocation />}
                      className="absolute right-2"
                    />
                  </Flex>
                </label>
                <button
                  className="bg-[#B6A0E5] text-white grow my-6 mr-10"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </Stack>
            </Stack>
          </Container>
        </div>
      </div>
      <div className="content my-8">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
