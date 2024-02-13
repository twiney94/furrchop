import React, { useEffect, useState } from 'react';
import {
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
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useUsers } from '../../hooks/useUsers';
import { DeleteIcon, ViewIcon, EditIcon } from '@chakra-ui/icons';

const UserList = () => {
  const { users, fetchUsers, deleteUser, updateUser } = useUsers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const cancelRef = React.useRef();

  useEffect(() => {
    fetchUsers();
  }, []);

  const truncateId = (userId: string) => {
    return userId.split('/').pop();
  };

  const handleDeleteUserConfirmation = (userId: string) => {
    setSelectedUserId(truncateId(userId));
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteUser = () => {
    if (selectedUserId) {
      deleteUser(selectedUserId); // Adjust deleteUser call as needed
    }
    fetchUsers();
    setIsDeleteAlertOpen(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleUpdateUser = () => {
    if (selectedUser) {
      updateUser(truncateId(selectedUser['@id']) || '', selectedUser); // Assuming updateUser takes id and user data
      onClose();
      fetchUsers();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box overflowX="auto">
      <Heading as="h3" size="lg" mb={4}>
        Users
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Firstname</Th>
            <Th>Lastname</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user['@id']}>
              <Td>{user.firstName}</Td>
              <Td>{user.lastName}</Td>
              <Td>{user.email}</Td>
              <Td>
                <IconButton aria-label="Show user" icon={<ViewIcon />} mr={2} />
                <IconButton
                  aria-label="Edit user"
                  icon={<EditIcon />}
                  mr={2}
                  onClick={() => handleEditUser(user)}
                />
                <IconButton
                  aria-label="Delete user"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDeleteUserConfirmation(user['@id'])}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* Modal for editing user */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                name="firstName"
                value={selectedUser?.firstName || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                name="lastName"
                value={selectedUser?.lastName || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={selectedUser?.email || ''}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateUser}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setIsDeleteAlertOpen(false)}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteUser} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default UserList;
