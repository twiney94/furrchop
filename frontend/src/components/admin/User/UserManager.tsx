import { useEffect, useState, useRef } from 'react';
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
} from '@chakra-ui/react';
import { useUsers } from '../../../hooks/useUsers';
import { DeleteIcon, ViewIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import CreateUser from './CreatUser';
import DeleteDialog from './DeleteDialog';
import UpdateModal from './UpdateModal';

const UserManager = () => {
  const { users, fetchUsers, deleteUser, updateUser } = useUsers();
  const editDisclosure = useDisclosure();
  const createDisclosure = useDisclosure();
  const deleteAlertDisclosure = useDisclosure();
  const cancelRef = useRef();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    editDisclosure.onOpen();
  };
  const truncateId = (userId: string) => {
    return userId.split('/').pop();
  };

  const handleDeleteUserConfirmation = (userId) => {
    setSelectedUser(truncateId(userId));
    deleteAlertDisclosure.onOpen();
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser);
      fetchUsers();
      deleteAlertDisclosure.onClose();
    }
  };

  const handleUpdateUser = async () => {
    if (selectedUser) {
      await updateUser(truncateId(selectedUser['@id']), selectedUser);
      editDisclosure.onClose();
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
      {/* Edit User Modal */}
      <UpdateModal
        isOpen={editDisclosure.isOpen}
        onClose={editDisclosure.onClose}
        user={selectedUser}
        handleChange={handleChange}
        onUpdate={handleUpdateUser}
      />
      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={deleteAlertDisclosure.isOpen}
        onClose={deleteAlertDisclosure.onClose}
        cancelRef={cancelRef}
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
