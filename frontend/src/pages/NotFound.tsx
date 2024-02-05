import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import sadDog from "/saddog.jpeg";

const NotFound = () => {
  return (
    <SimpleGrid columns={2} className="h-full w-full">
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        p={8}
        bgGradient={"linear(to-l, #B6A0E5, #e4cbfd)"}
        className="shadow-2xl"
        zIndex={1}
      >
        <Text
          fontSize="8xl"
          fontWeight="600"
          color="white"
          className="leading-none"
        >
          404
        </Text>
        {/* With a playful phrase based on the website theme, dogs */}
        <Text
          fontSize="2xl"
          fontWeight="500"
          color="gray.100"
          className="leading-none"
        >
          Woops! We couldn't find that page.
        </Text>
      </Flex>
      <Box
        backgroundImage={`url(${sadDog})`}
        bgSize="cover"
        bgPosition="center"
      />
    </SimpleGrid>
  );
};

export default NotFound;
