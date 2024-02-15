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
  Select,
  Input,
} from '@chakra-ui/react';

const servicesSuggestions = [
  'Groomer',
  'Haircut',
  'Special services',
  'Nail trimming',
  'Bathing',
  'Teeth cleaning',
  'Ear cleaning',
  'Anal gland expression',
  'Flea bath',
  'Deshedding',
  'Furminator',
];

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
  handleChange: (event: React.ChangeEvent<any>) => void;
  onUpdate: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Service</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mt={4}>
            <FormLabel htmlFor="name">Service Name</FormLabel>
            <Select
              id="name"
              placeholder="Select service"
              value={service?.name || ''}
              onChange={handleChange}
              name="name"
            >
              {servicesSuggestions.map((serviceName) => (
                <option key={serviceName} value={serviceName}>
                  {serviceName}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              value={service?.price || ''}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Duration</FormLabel>
            <Input
              type="number"
              name="duration"
              value={service?.duration || ''}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
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
