import { Box, Card, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import AccordionLink from "../common/AccordionGroupLink";

function parseJwt(token: string) {
  let base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export const Actions = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { logout , user} = useAuth();
  const { userRole } = useAuth();
  const [showShopMenu, setShowShopMenu] = useState(false);

  console.log(userRole?.());

  useEffect(() => {
    if (!userRole?.()) {
      window.location.href = "/";
    } else {
      if (userRole?.()?.includes("ROLE_OWNER")) {
        setShowShopMenu(true);
      }
    }
  });

  const token = user?.token;
  let roles = [];

  // Extraire les rôles du token JWT
  if (token) {
    const payload = parseJwt(token);
    roles = payload.roles || [];
  }


  // Vérifier si l'utilisateur a le rôle ADMIN ou OWNER
  const hasAccess = roles.includes("ROLE_ADMIN") || roles.includes("ROLE_OWNER");


  return (
    <Card p={4} className="shadow-xl">
      <Heading as="h1" size="md" textAlign="left" mb={8} fontWeight={500}>
        My account
      </Heading>
      <Box textAlign={"left"} className="flex flex-col gap-2">
      {hasAccess && (
          <AccordionLink title="My reviews">
            <Link
              as={RouterLink}
              to="/wait-reviews"
              color={isActive("/wait-reviews") ? "brand.500" : "gray.300"}
            >
              Waiting Reviews
            </Link>
            <Link
              as={RouterLink}
              to="/already-reviews"
              color={isActive("/already-reviews") ? "brand.500" : "gray.300"}
            >
              Already Reviews
            </Link>
          </AccordionLink>
        )}


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
        {showShopMenu && (
          <>
            <Link as={RouterLink} to="/my-shops" color={"gray.300"}>
              My shops
            </Link>
          </>
        )}
        <Link onClick={() => logout()} color={"red.300"}>
          Logout
        </Link>
      </Box>
    </Card>
  );
};

export default Actions;
