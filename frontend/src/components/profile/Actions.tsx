import { Box, Card, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AccordionLink from "../common/AccordionGroupLink";

export const Actions = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const logout = useAuth().logout;

  return (
    <Card p={4} className="shadow-xl">
      <Heading as="h1" size="md" textAlign="left" mb={8} fontWeight={500}>
        My account
      </Heading>
      <Box textAlign={"left"} className="flex flex-col gap-2">
      <AccordionLink title="My reviews">
  
        <Link
          as={RouterLink}
          to="/wait-reviews"
          color={isActive("/") ? "brand.500" : "gray.300"}
        >
          Waiting Reviews
        </Link>
        <Link
          as={RouterLink}
          to="/already-reviews"
          color={isActive("/profile") ? "brand.500" : "gray.300"}
        >
          Already Reviews
        </Link>
      
        </AccordionLink> 

       
        <Link
          as={RouterLink}
          to="/profile"
          color={isActive("/profile") ? "brand.500" : "gray.300"}
        >
          My bookings
        </Link>
        <Link
          as={RouterLink}
          to="/me"
          color={isActive("/me") ? "brand.500" : "gray.300"}
        >
          My informations
        </Link>
        <Link onClick={() => logout()} color={"red.300"}>
          Logout
        </Link>
      </Box>
    </Card>
  );
};

export default Actions;
