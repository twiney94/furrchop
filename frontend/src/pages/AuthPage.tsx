import {
  Box,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
} from "@chakra-ui/react";
import groomingDog from "/groomingdog.jpeg";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface Props {
  mode: "login" | "register" | "activate";
}

const AuthPage = ({ mode }: Props) => {
  const [error] = useState<{ show: boolean; message?: string }>({
    show: false,
  });
  const { activateAccount } = useAuth();

  useEffect(() => {
    if (mode === "activate") {
      const verifyAccount = async () => {
        await activateAccount();
      }

      verifyAccount();
    }
  }, []);

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
        {mode === "login" ? <Login /> : <Register />}
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
