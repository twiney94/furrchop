import { Box, SimpleGrid } from "@chakra-ui/react";
import groomingDog from "/groomingdog.jpeg";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

interface Props {
  mode: "login" | "register";
}

const AuthPage = (props: Props) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} className="h-full w-full">
      {props.mode === "login" ? <Login /> : <Register />}
      <Box
        backgroundImage={`url(${groomingDog})`}
        bgSize="cover"
        bgPosition="center"
        visibility={{ base: "hidden", md: "visible" }}
      />
    </SimpleGrid>
  );
};

export default AuthPage;
