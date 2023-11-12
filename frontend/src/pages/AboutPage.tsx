import { Box, Heading, Text } from "@chakra-ui/react";

const AboutPage = () => {
    return (
        <Box p={4}>
            <Heading as="h1" size="xl" mb={4}>
                About Us
            </Heading>
            <Text fontSize="lg">
                We are a team of developers passionate about creating amazing software
                solutions for our clients. Our goal is to help businesses achieve their
                full potential through the power of technology.
            </Text>
        </Box>
    );
};

export default AboutPage;
