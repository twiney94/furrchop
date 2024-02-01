import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";

interface ChopperInfos {
  id: number;
  image: string;
  title: string;
  address: string;
  rating: number;
  reviews: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  availabilities: Array<{
    date: string;
    availabilities: Array<{
      start: string;
      end: string;
    }>;
  }>;
}

const ChopperCard = ({ infos }: { infos: ChopperInfos }) => {
  return (
    <Card
      className="hover:shadow-xl transition duration-300 ease-in-out z-1 hover:z-10"
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      borderRadius={0}
      padding='4'
      minH='200px'
    >
      <Image
        objectFit="cover"
        borderRadius='xl'
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Text fontSize='xl' fontWeight='500'>{infos.title}</Text>

          <Text>
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
        </CardBody>

        <CardFooter py={0}>
          <Button variant="solid" colorScheme="blue">
            Book
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default ChopperCard;
