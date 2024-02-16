import { Box, Card, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';

export const Actions = () => {
  const location = useLocation();
  const { logout, isAdmin } = useAuth();

  // Decode token to get user roles

  const isActive = (path: string) => location.pathname === path;
  const { userRole } = useAuth();
  const [showShopMenu, setShowShopMenu] = useState(false);

  console.log(userRole?.());

  useEffect(() => {
    if (!userRole?.()) {
      window.location.href = '/';
    } else {
      if (userRole?.()?.includes('ROLE_OWNER')) {
        setShowShopMenu(true);
      }
    }
  });

  return (
    <Card p={4} className="shadow-xl">
      <Heading as="h1" size="md" textAlign="left" mb={8} fontWeight={500}>
        My account
      </Heading>
      <Box textAlign={'left'} className="flex flex-col gap-2">
        <Link
          as={RouterLink}
          to="/profile"
          color={isActive('/profile') ? 'brand.500' : 'gray.300'}
        >
          My bookings
        </Link>
        <Link
          as={RouterLink}
          to="/me"
          color={isActive('/me') ? 'brand.500' : 'gray.300'}
        >
          My informations
        </Link>

        {isAdmin && (
          <Link
            as={RouterLink}
            to="/admin-panel"
            color={isActive('/admin-panel') ? 'brand.500' : 'gray.300'}
          >
            Admin panel
          </Link>
        )}

        <Link onClick={() => logout()} color={'red.300'}>
          {showShopMenu && (
            <>
              <Link as={RouterLink} to="/my-shops" color={'gray.300'}>
                My shops
              </Link>
            </>
          )}
        </Link>
        <Link onClick={() => logout()} color={'red.300'}>
          Logout
        </Link>
      </Box>
    </Card>
  );
};

export default Actions;
