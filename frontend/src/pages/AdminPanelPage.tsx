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
import ShopManager from '../components/admin/Shop/ShopManager';
import EmployeeManager from '../components/admin/Employee/EmployeeManager';
import ServiceManager from '../components/admin/Service/ServiceManager';

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
            <Tab>Employees</Tab>
            <Tab>Services</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserManager />
            </TabPanel>
            <TabPanel>
              <ShopManager />
            </TabPanel>
            <TabPanel>
              <EmployeeManager />
            </TabPanel>
            <TabPanel>
              <ServiceManager />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default AdminPanelPage;
