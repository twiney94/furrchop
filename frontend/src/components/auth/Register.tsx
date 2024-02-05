import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

const Login = () => {
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
        Create your account by giving us your email
      </Text>
      <FormControl fontWeight={300}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" id="email" placeholder="Enter email" mb={4} />
        <Button
          flexGrow={1}
          width={"100%"}
          colorScheme="brand"
          variant="solid"
          size="lg"
          fontWeight={500}
        >
          Register
        </Button>
      </FormControl>
    </Flex>
  );
};

export default Login;
