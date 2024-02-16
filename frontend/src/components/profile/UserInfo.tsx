import React, { useEffect, useState } from 'react';
import { Card, Heading, Box, Button, useToast, Editable, EditablePreview, EditableInput, Flex, IconButton } from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons';
import { useAuth } from '../../hooks/useAuth'; // Mettez à jour avec votre chemin d'accès réel
import { fetchUser, updateUser } from '../../services/user'; // Mettez à jour avec votre chemin d'accès réel

// Fonction pour décoder le token JWT
function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    roles: [],
    isVerified: false,
    createdAt: '',
  });
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const loadUserInfo = async () => {
      if (user && user.token) {
        const payload = parseJwt(user.token);
        const userId = payload.sub; // Assurez-vous que c'est la bonne clé pour l'ID utilisateur dans votre payload JWT
        try {
          const response = await fetchUser(userId);
          setUserInfo(response.data);
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to load user information.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      }
    };

    loadUserInfo();
  }, [user, toast]);

  const handleUpdateUser = async (newData: React.SetStateAction<{ id: string; firstName: string; lastName: string; email: string; phoneNumber: string; roles: never[]; isVerified: boolean; createdAt: string; }>) => {
    try {
      await updateUser(userInfo['id'], newData); // Assurez-vous d'envoyer le bon format de données attendu par l'API
      setUserInfo({ ...userInfo, ...newData }); // Mettre à jour l'état local avec les nouvelles informations
      toast({
        title: 'Success',
        description: 'User information updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating user information',
        description: (error as Error).message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Card p={8} h={"100%"}>
      <Heading as="h1" size="lg" textAlign="left" mb={8} fontWeight={500}>
        My Information
      </Heading>

      <Box>
        {/* Champs éditables pour firstName, lastName et email */}
        <Editable defaultValue={userInfo.firstName} onSubmit={(value) => handleUpdateUser({ firstName: value })}>
          <Flex justify="space-between" align="center">
            <EditablePreview />
            <EditableInput />
            <IconButton size="sm" icon={<EditIcon />} aria-label="Edit first name" />
          </Flex>
        </Editable>

        <Editable defaultValue={userInfo.lastName} onSubmit={(value) => handleUpdateUser({ lastName: value })} mt={4}>
          <Flex justify="space-between" align="center">
            <EditablePreview />
            <EditableInput />
            <IconButton size="sm" icon={<EditIcon />} aria-label="Edit last name" />
          </Flex>
        </Editable>

        <Editable defaultValue={userInfo.email} onSubmit={(value) => handleUpdateUser({ email: value })} mt={4}>
          <Flex justify="space-between" align="center">
            <EditablePreview />
            <EditableInput />
            <IconButton size="sm" icon={<EditIcon />} aria-label="Edit email" />
          </Flex>
        </Editable>
      </Box>
    </Card>
  );
};

export default UserInfo;
