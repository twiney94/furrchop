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

const UpdateServiceModal = ({
  isOpen,
  onClose,
  service,
  handleChange,
  onUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  service: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Service</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Service Name</FormLabel>
            <Input
              name="name"
              value={service?.name || ''}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="float"
              name="price"
              value={service?.price}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Duration</FormLabel>
            <Input
              type="number"
              name="duration"
              value={service?.duration}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={service?.description || ''}
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

export default UpdateServiceModal;
