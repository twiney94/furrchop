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

const UpdateShop = ({
  isOpen,
  onClose,
  shop,
  handleChange,
  onUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  shop: any; // Assuming the Shop type is defined elsewhere
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: () => void;
}) => {
  return (
    // Make sure you have a return statement
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Shop</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Shop Name</FormLabel>
            <Input
              name="name"
              value={shop?.name || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Shop Description</FormLabel>
            <Input
              name="description"
              value={shop?.description || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Shop Open Hours</FormLabel>
            <Input
              name="openHours"
              value={shop?.openHours || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Shop Open Days</FormLabel>
            <Input
              name="openDays"
              value={shop?.openDays || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Shop Location</FormLabel>
            <Input
              name="location"
              value={shop?.address || ''}
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

export default UpdateShop;
