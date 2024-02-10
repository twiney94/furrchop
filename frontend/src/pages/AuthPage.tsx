import {
  Box,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  useToast,
} from "@chakra-ui/react";
import groomingDog from "/groomingdog.jpeg";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  mode: "login" | "register" | "activate";
}

const AuthPage = (props: Props) => {
  const [error, setError] = useState<{ show: boolean; message?: string }>({
    show: false,
  });
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (props.mode === "activate") {
      const urlParams = window.location.pathname;
      const token = urlParams.split("/")[2];
      const decodedToken = atob(token);

      fetch(`${import.meta.env.VITE_BACKEND_API}/activate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify({ uuid: decodedToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast({
              title: "Error",
              description: data.error,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Success",
              description: "Your account has been activated, you may now log in!",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: "An error occurred. " + err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
        navigate("/login");
    }
  }, [props.mode, navigate, toast]);

  return (
    <Flex direction="column" className="h-full w-full">
      {error.show && (
        <Alert status="error" className="mb-4">
          <AlertIcon />
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      <SimpleGrid columns={{ base: 1, md: 2 }} className="h-full w-full">
        {props.mode === "login" ? <Login /> : <Register />}
        <Box
          backgroundImage={`url(${groomingDog})`}
          bgSize="cover"
          bgPosition="center"
          visibility={{ base: "hidden", md: "visible" }}
        />
      </SimpleGrid>
    </Flex>
  );
};

export default AuthPage;
