import {
  Card,
  CardBody,
  CardFooter,
  Heading,
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
    <div className="card bg-yellow-300 grow">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Text fontSize='xl' fontWeight='500'>{ infos.title }</Text>

            <Text py="2">
              Caffè latte is a coffee beverage of Italian origin made with
              espresso and steamed milk.
            </Text>
          </CardBody>

          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Buy Latte
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
};

export default ChopperCard;
