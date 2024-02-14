import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from '@chakra-ui/react';
import UserManager from '../components/admin/User/UserManager';

// Import ShopList from your components
// import ShopList from '../components/admin/ShopList';

const AdminPanelPage = () => {
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Admin Panel
      </Heading>
      <Text fontSize="lg" mb={4}>
        This is the admin panel page.
      </Text>

      <Flex>
        <Tabs variant="enclosed" orientation="vertical">
          <TabList mb="1em">
            <Tab>Users</Tab>
            <Tab>Shops</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserManager />
            </TabPanel>
            <TabPanel>{/* <ShopList /> */}</TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default AdminPanelPage;
