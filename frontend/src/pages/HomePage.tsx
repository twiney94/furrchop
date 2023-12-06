import { Box, Heading, Text } from "@chakra-ui/react";


const HomePage = () => {
  return (
    <Box p={4}>
      <Heading as="h1" size="2xl" mb={4}>
        Welcome to my website!
      </Heading>
      <Text fontSize="xl">
        This is a basic home page built using Chakra UI.
      </Text>
    </Box>
  );
};

export default HomePage;
