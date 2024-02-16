import React, { useEffect, useState, useRef } from 'react';
import {
  useDisclosure,
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from '@chakra-ui/react';

import { useShops } from '../../../hooks/useShops';
import { DeleteIcon, ViewIcon, EditIcon } from '@chakra-ui/icons';
import DeleteDialog from '../sharedComponents/DeleteDialog';
import UpdateShop from './UpdateShop';

const ShopManager = () => {
  const { shops, fetchShops, deleteShop, updateShop } = useShops();
  const editDisclosure = useDisclosure();
  const deleteAlertDisclosure = useDisclosure();
  const cancelRef = useRef();
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    fetchShops();
  }, []);

  const handleEditShop = (shop) => {
    setSelectedShop(shop);
    editDisclosure.onOpen();
  };
  const truncateId = (shopId: string) => {
    return shopId.split('/').pop();
  };

  const handleDeleteShopConfirmation = (shopId) => {
    setSelectedShop(truncateId(shopId));
    deleteAlertDisclosure.onOpen();
  };

  const handleDeleteShop = async () => {
    if (selectedShop) {
      await deleteShop(selectedShop);
      fetchShops();
      deleteAlertDisclosure.onClose();
    }
  };

  const handleUpdateShop = async () => {
    if (selectedShop) {
      await updateShop(truncateId(selectedShop['@id']), selectedShop);
      editDisclosure.onClose();
      fetchShops();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedShop((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Flex></Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Open Hour</Th>
            <Th>Open Days</Th>
            <Th>Address</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {shops.map((shop) => (
            <Tr key={shop['@id']}>
              <Td>{shop.name}</Td>
              <Td>{shop.description}</Td>
              <Td>
                {shop.openHours[0]} - {shop.openHours[1]}
              </Td>
              <Td>
                {shop.openDays[0]} - {shop.openDays[1]}
              </Td>
              <Td>{shop.address}</Td>
              <Td>
                <IconButton aria-label="Show shop" icon={<ViewIcon />} mr={2} />
                <IconButton
                  aria-label="Edit shop"
                  icon={<EditIcon />}
                  colorScheme="green"
                  mr={2}
                  onClick={() => handleEditShop(shop)}
                />
                <IconButton
                  aria-label="Delete shop"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDeleteShopConfirmation(shop['@id'])}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <UpdateShop
        isOpen={editDisclosure.isOpen}
        onClose={editDisclosure.onClose}
        shop={selectedShop}
        handleChange={handleChange}
        onUpdate={handleUpdateShop}
      />
      <DeleteDialog
        entity="shop"
        isOpen={deleteAlertDisclosure.isOpen}
        onClose={deleteAlertDisclosure.onClose}
        cancelRef={React.useRef<HTMLButtonElement>(null)}
        onConfirm={handleDeleteShop}
      />
    </Box>
  );
};

export default ShopManager;
