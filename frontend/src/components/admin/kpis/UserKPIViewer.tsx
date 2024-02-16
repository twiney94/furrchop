import { useEffect } from 'react';
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Heading,
} from '@chakra-ui/react';

import { useKPI } from '../../../hooks/useKpi';

const UserKPIViewer = () => {
  const { kpiData, fetchUserKPIs } = useKPI();

  useEffect(() => {
    fetchUserKPIs();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={4}>User KPI Dashboard</Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Total Users</StatLabel>
          <StatNumber>{kpiData.totalUsers}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Active Users</StatLabel>
          <StatNumber>{kpiData.activeUsers}</StatNumber>
          <StatHelpText>
            <StatArrow
              type={kpiData.activeChange >= 0 ? 'increase' : 'decrease'}
            />
            {Math.abs(kpiData.activeChange)}%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Inactive Users</StatLabel>
          <StatNumber>{kpiData.inactiveUsers}</StatNumber>
          <StatHelpText>
            <StatArrow
              type={kpiData.inactiveChange >= 0 ? 'increase' : 'decrease'}
            />
            {Math.abs(kpiData.inactiveChange)}%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default UserKPIViewer;
