import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Button,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { MdLocationOn, MdOutlineStarBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BookingShopResponse } from "../../types/schedule";

const ChopperCard = ({
  infos,
  id,
}: {
  infos: BookingShopResponse;
  id: string;
}) => {
  const navigate = useNavigate();


  return (
    <Card
      id={id}
      className="hover:shadow-xl transition duration-300 ease-in-out z-1 hover:z-10"
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      borderRadius={0}
      padding="4"
      minH="300px"
    >
      <Image
        objectFit="cover"
        borderRadius="xl"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody display={"flex"} alignItems={"left"} flexDir={"column"}>
          <Text fontSize="xl" fontWeight="500" textAlign="left">
            {infos.name}
          </Text>
          <Text
            fontSize="md"
            fontWeight="400"
            justifyItems="left"
            className="flex items-center text-gray-400"
          >
            <Icon as={MdLocationOn} />
            {infos.address}
          </Text>
          <Text
            fontSize="md"
            fontWeight="400"
            justifyItems="left"
            className="flex items-center text-gray-400"
          >
            <Icon as={MdOutlineStarBorder} />
            No reviews yet
          </Text>
          <Flex direction="column" align="left" gap={2} marginTop={4}>
            <Flex gap={2} align="center" justify="flex-start">
              <Text className="w-20">Morning:</Text>
              <Button
                variant="outline"
                size="sm"
                colorScheme="purple"
                isDisabled
              >
                Sun 04
              </Button>
              <Button
                variant="outline"
                size="sm"
                colorScheme="purple"
                isDisabled
              >
                Mon 05
              </Button>
              <Button variant="outline" size="sm" colorScheme="purple">
                Tue 06
              </Button>
            </Flex>
            <Flex gap={2} align="center" justify="flex-start">
              <Text className="w-20">Afternoon:</Text>
              <Button
                variant="outline"
                size="sm"
                colorScheme="purple"
                isDisabled
              >
                Sun 04
              </Button>
              <Button variant="outline" size="sm" colorScheme="purple">
                Mon 05
              </Button>
              <Button
                variant="outline"
                size="sm"
                colorScheme="purple"
                isDisabled
              >
                Tue 06
              </Button>
            </Flex>
          </Flex>
        </CardBody>

        <CardFooter py={0}>
          <Button
            variant="solid"
            colorScheme="purple"
            onClick={() => navigate("/book/" + infos.id)}
          >
            Book
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default ChopperCard;
