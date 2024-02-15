import React from 'react';
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
} from '@chakra-ui/react';

const UpdateEmployeeModal = ({
  isOpen,
  onClose,
  employee,
  handleChange,
  onUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  employee: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Employee</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Empoyee Name</FormLabel>
            <Input
              name="name"
              value={employee?.name || ''}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onUpdate}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateEmployeeModal;
