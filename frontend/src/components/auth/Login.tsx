import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormHelperText,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login.module.css";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      // padding responsive
      px={{ base: 8, md: 16, lg: 24, xl: 64 }}
      className="shadow-2xl"
      zIndex={1}
    >
      <Text
        fontSize="3xl"
        fontWeight="600"
        color="brand.500"
        className="leading-none"
        mb={8}
      >
        Already chopped your pet with us?
      </Text>
      <FormControl fontWeight={300}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" id="email" placeholder="Enter email" mb={4} />
        <FormLabel>Password</FormLabel>
        <InputGroup size="md" mb={4}>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            id="password"
          />
          <InputRightElement width="4.5rem">
            <Button
              fontWeight={400}
              h="1.75rem"
              size="sm"
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText textAlign="right" mb={8} fontWeight={300}>
          <Link to={"/forgot-password"}>Forgot password?</Link>
        </FormHelperText>
        <Button
          flexGrow={1}
          width={"100%"}
          colorScheme="brand"
          variant="solid"
          size="lg"
          fontWeight={500}
        >
          Login
        </Button>
      </FormControl>
      {/* Splitter with dashes and in the middle 'or' */}
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        my={8}
        gap={4}
      >
        <Box className="h-0.5 grow bg-gray-300" />
        <Text fontWeight={500}>or</Text>
        <Box className="h-0.5 grow bg-gray-300" />
      </Flex>
      <Text
        fontSize="3xl"
        fontWeight="600"
        color="brand.500"
        className="leading-none"
        mb={8}
      >
        New here?
      </Text>
      <Button
        width={"100%"}
        colorScheme="purple"
        variant="outline"
        size="lg"
        fontWeight={500}
        onClick={() => navigate("/register")}
      >
        Create my account
      </Button>
    </Flex>
  );
};

export default Login;
