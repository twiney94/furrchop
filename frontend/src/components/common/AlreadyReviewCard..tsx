import { 
  Card,
  CardBody,
  Stack, 
  Heading,
  } from "@chakra-ui/react";
import { FC } from "react";
import { Reviews } from "../../hooks/useReviewCard";
type AlreadyReviewCardProps = {
  reviews: Reviews;
}


export const AlreadyReviewCard:FC<AlreadyReviewCardProps> = ({reviews}) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
  
      <Stack>
        <CardBody>
          <Heading size="md">{reviews.comment}</Heading>
        </CardBody>
      </Stack>
    </Card>
  );
};

