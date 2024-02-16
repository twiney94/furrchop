import { 
  Card,
  CardBody,
  CardFooter,
  Stack, 
  Text, 
  Image, 
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Badge,
  } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { Reviews } from "../../hooks/useReviewCard";
import ButtonModal  from "../UI/buttonModal";
type AlreadyReviewCardProps = {
  showImage?: boolean;
  reviews: Reviews;
}


export const AlreadyReviewCard:FC<AlreadyReviewCardProps> = ({showImage=true, reviews}) => {
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

