import { useEffect, useState, useRef, SetStateAction } from 'react';
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

import { useServices } from '../../../hooks/useServices';
import CreateService from './CreateService';
import DeleteDialog from '../sharedComponents/DeleteDialog';
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import UpdateServiceModal from './UpdateServiceModal';

const ServiceManager = () => {
  const { services, fetchServices, deleteService, updateService } =
    useServices();
  const editDisclosure = useDisclosure();
  const createDisclosure = useDisclosure();
  const deleteAlertDisclosure = useDisclosure();
  const cancelRef = useRef();
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEditService = (service: SetStateAction<null>) => {
    setSelectedService(service);
    editDisclosure.onOpen();
  };
  const truncateId = (employeeId: any) => {
    return employeeId.split('/').pop();
  };

  const handleDeleteServiceConfirmation = (serviceId: any) => {
    setSelectedService(truncateId(serviceId));
    deleteAlertDisclosure.onOpen();
  };

  const handleDeleteService = async () => {
    if (selectedService) {
      await deleteService(selectedService);
      fetchServices();
      deleteAlertDisclosure.onClose();
    }
  };

  const handleUpdateService = async () => {
    if (selectedService) {
      const updatePayload = {
        name: selectedService ? selectedService.name : '',
        price: parseFloat(selectedService.price),
        duration: parseInt(selectedService.duration),
        description: selectedService ? selectedService.description : '',
        shop: selectedService?.shop?.['@id'],
      };

      await updateService(truncateId(selectedService['@id']), updatePayload);
      editDisclosure.onClose();
      fetchServices();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="lg">
          Services
        </Heading>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={createDisclosure.onOpen}
        >
          Create Service
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Shop Name</Th>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Duration</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {services.map((service) => (
            <Tr key={service['@id']}>
              <Td>{service.shop.name}</Td>
              <Td>{service.name}</Td>
              <Td>
                {service.price} {' €'}
              </Td>
              <Td>
                {service.duration}
                {' min'}
              </Td>
              <Td>{service.description}</Td>
              <Td>
                <IconButton
                  aria-label="View"
                  icon={<ViewIcon />}
                  onClick={() => console.log('View')}
                  mr={2}
                />
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  colorScheme="green"
                  onClick={() => handleEditService(service)}
                  mr={2}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() =>
                    handleDeleteServiceConfirmation(service['@id'])
                  }
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <UpdateServiceModal
        isOpen={editDisclosure.isOpen}
        onClose={editDisclosure.onClose}
        service={selectedService}
        handleChange={handleChange}
        onUpdate={handleUpdateService}
      />
      <Modal
        isOpen={createDisclosure.isOpen}
        onClose={createDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateService onClose={createDisclosure.onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <DeleteDialog
        entity="Service"
        isOpen={deleteAlertDisclosure.isOpen}
        onClose={deleteAlertDisclosure.onClose}
        cancelRef={cancelRef}
        onConfirm={handleDeleteService}
      />
    </Box>
  );
};

export default ServiceManager;
