import {
  Box,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Card,
  Heading,
} from "@chakra-ui/react";
import groomingDog from "/groomingdog.jpeg";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const AlreadyReview = () => {
  return (
    <Card p={8} h={"100%"}>
      <Heading as="h1" size="lg" textAlign="left" mb={8} fontWeight={500}>
        Already reviews
      </Heading>
    </Card>
  );
};

export default AlreadyReview;
