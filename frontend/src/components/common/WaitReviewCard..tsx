import { Card, CardBody, CardFooter, Heading, Stack, Text, Image, Button } from "@chakra-ui/react";
import { FC } from "react";
type WaitReviewCardProps = {
  showImage?: boolean;
}


export const WaitReviewCard:FC<WaitReviewCardProps> = ({showImage=true}) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
  
      <Stack>
        <CardBody>
          <Heading size="md">The perfect latte</Heading>

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
  );
};
