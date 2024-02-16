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
  useDisclosure,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
} from '@chakra-ui/react';
import { useEmployees } from '../../../hooks/useEmployees';
import { DeleteIcon, ViewIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import DeleteDialog from '../sharedComponents/DeleteDialog';
import UpdateEmployeeModal from './UpdateEmployeeModal';
import CreateEmployee from './CreateEmployee';

const EmployeeManager = () => {
  const { employees, fetchEmployees, deleteEmployee, updateEmployee } =
    useEmployees();
  const editDisclosure = useDisclosure();
  const createDisclosure = useDisclosure();
  const deleteAlertDisclosure = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEditEmployee = (employee: React.SetStateAction<null>) => {
    setSelectedEmployee(employee);
    editDisclosure.onOpen();
  };
  const truncateId = (employeeId: string) => {
    return employeeId.split('/').pop();
  };

  const handleDeleteEmployeeConfirmation = (employeeId: string) => {
    setSelectedEmployee(truncateId(employeeId));
    deleteAlertDisclosure.onOpen();
  };

  const handleDeleteEmployee = async () => {
    if (selectedEmployee) {
      await deleteEmployee(selectedEmployee);
      fetchEmployees();
      deleteAlertDisclosure.onClose();
    }
  };

  const handleUpdateEmployee = async () => {
    if (selectedEmployee) {
      const updatePayload = {
        name: selectedEmployee ? selectedEmployee.name : '',
        shop: selectedEmployee?.shop?.['@id'],
      };
      await updateEmployee(truncateId(selectedEmployee['@id']), updatePayload);
      editDisclosure.onClose();
      fetchEmployees();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading>Employee Manager</Heading>
        <IconButton
          aria-label="Create Employee"
          colorScheme="teal"
          icon={<AddIcon />}
          onClick={createDisclosure.onOpen}
        />
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Employee's Name</Th>
            <Th>Shop Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((employee) => (
            <Tr key={employee['@id']}>
              <Td>{truncateId(employee['@id'])}</Td>
              <Td>{employee.name}</Td>
              <Td>{employee.shop.name}</Td>
              <Td>
                <IconButton
                  aria-label="View Employee"
                  icon={<ViewIcon />}
                  mr={2}
                />
                <IconButton
                  aria-label="Edit Employee"
                  icon={<EditIcon />}
                  mr={2}
                  colorScheme="green"
                  onClick={() => handleEditEmployee(employee)}
                />
                <IconButton
                  aria-label="Delete Employee"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() =>
                    handleDeleteEmployeeConfirmation(employee['@id'])
                  }
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <UpdateEmployeeModal
        isOpen={editDisclosure.isOpen}
        onClose={editDisclosure.onClose}
        employee={selectedEmployee}
        handleChange={handleChange}
        onUpdate={handleUpdateEmployee}
      />
      <Modal
        isOpen={createDisclosure.isOpen}
        onClose={createDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateEmployee onClose={createDisclosure.onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <DeleteDialog
        entity="Employee"
        isOpen={deleteAlertDisclosure.isOpen}
        onClose={deleteAlertDisclosure.onClose}
        cancelRef={React.useRef<HTMLButtonElement>(null)}
        onConfirm={handleDeleteEmployee}
      />
    </Box>
  );
};

export default EmployeeManager;
