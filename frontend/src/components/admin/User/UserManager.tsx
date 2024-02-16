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
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { useUsers } from '../../../hooks/useUsers';
import { DeleteIcon, ViewIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import CreateUser from './CreatUser';
import DeleteDialog from '../sharedComponents/DeleteDialog';
import UpdateUserModal from './UpdateUserModal';
import { useAuth } from '../../../hooks/useAuth';
import { User } from '../../../types/user';

const UserManager = () => {
  const { users, fetchUsers, deleteUser, updateUser } = useUsers();
  const editDisclosure = useDisclosure();
  const createDisclosure = useDisclosure();
  const deleteAlertDisclosure = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const { userFullData } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const truncateId = (employeeId: any) => {
    return employeeId.split('/').pop();
  };

  const handleEditUser = (user: any) => {
    if (user && 'email' in user && user.email !== userFullData?.username) {
      setSelectedUser(user);
      editDisclosure.onOpen();
    }
  };

  const handleDeleteUserConfirmation = (userId: any, user: User) => {
    if (user.email !== userFullData?.username) {
      console.log('asas', userId);

      setSelectedUser(truncateId(userId));
      deleteAlertDisclosure.onOpen();
    }
  };
  const handleDeleteUser = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser);
      fetchUsers();
      deleteAlertDisclosure.onClose();
    }
  };

  const handleUpdateUser = async (updatedUser: { [x: string]: any }) => {
    await updateUser(truncateId(updatedUser['id']), updatedUser);
    editDisclosure.onClose();
    fetchUsers();
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setSelectedUser((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box overflowX="auto">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h3" size="lg">
          Users
        </Heading>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={createDisclosure.onOpen}
        >
          Add User
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Firstname</Th>
            <Th>Lastname</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Verified</Th>
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
                {user.roles.map((role) => (
                  <Badge m={1} variant="subtle" key={role} colorScheme="green">
                    {role}
                  </Badge>
                ))}
              </Td>
              <Td>
                {user.isVerified ? (
                  <Badge variant="solid" colorScheme="green">
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="solid" colorScheme="red">
                    Not Verified
                  </Badge>
                )}
              </Td>
              <Td>
                <IconButton aria-label="Show user" icon={<ViewIcon />} mr={2} />
                <IconButton
                  aria-label="Edit user"
                  icon={<EditIcon />}
                  mr={2}
                  colorScheme="green"
                  onClick={() => handleEditUser(user)}
                />
                <IconButton
                  aria-label="Delete user"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDeleteUserConfirmation(user.id, user)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* Edit User Modal */}
      <UpdateUserModal
        isOpen={editDisclosure.isOpen}
        onClose={editDisclosure.onClose}
        user={selectedUser}
        handleChange={handleChange}
        onUpdate={handleUpdateUser}
      />
      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        entity="users"
        isOpen={deleteAlertDisclosure.isOpen}
        onClose={deleteAlertDisclosure.onClose}
        cancelRef={React.useRef<HTMLButtonElement>(null)}
        onConfirm={handleDeleteUser}
      />
      {/* Create User Modal */}
      <Modal
        isOpen={createDisclosure.isOpen}
        onClose={createDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateUser onClose={createDisclosure.onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserManager;
