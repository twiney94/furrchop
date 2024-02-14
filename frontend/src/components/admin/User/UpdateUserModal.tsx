import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Stack,
} from '@chakra-ui/react';

import { User } from '../../../types/user';

const allRoles = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_OWNER'];

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: (updatedUser: User) => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isOpen,
  onClose,
  user,
  handleChange,
  onUpdate,
}) => {
  const [roles, setRoles] = useState<{ [key: string]: boolean }>({
    ROLE_USER: false,
    ROLE_ADMIN: false,
    ROLE_OWNER: false,
  });

  useEffect(() => {
    if (user) {
      const rolesUpdate = allRoles.reduce(
        (acc, role) => ({
          ...acc,
          [role]: user.roles.includes(role),
        }),
        {}
      );
      setRoles(rolesUpdate);
    }
  }, [user]);

  const handleRoleChange = (role: string) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [role]: !prevRoles[role],
    }));
  };

  const handleUpdateClick = () => {
    if (user) {
      const updatedRoles = Object.keys(roles).filter((role) => roles[role]);
      const updatedUser = { ...user, roles: updatedRoles };
      onUpdate(updatedUser);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input
              name="firstName"
              value={user.firstName || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Last name</FormLabel>
            <Input
              name="lastName"
              value={user.lastName || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={user.email || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Roles</FormLabel>
            <Stack spacing={4}>
              {allRoles.map((role) => (
                <Switch
                  key={role}
                  id={role}
                  isChecked={roles[role]}
                  onChange={() => handleRoleChange(role)}
                  colorScheme="green"
                >
                  {role}
                </Switch>
              ))}
            </Stack>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdateClick}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUserModal;
