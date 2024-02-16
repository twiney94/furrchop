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

const ShopKPIViewer = () => {
  const { shopKpiData, fetchShopsKPIs } = useKPI();

  useEffect(() => {
    fetchShopsKPIs();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={4}>Shop KPI Dashboard</Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Total Shops</StatLabel>
          <StatNumber>{shopKpiData.totalShops}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>New Shops</StatLabel>
          <StatNumber>{shopKpiData.newShop}</StatNumber>
          <StatHelpText>
            <StatArrow
              type={shopKpiData.activeChange >= 0 ? 'increase' : 'decrease'}
            />
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Hot Shops</StatLabel>
          <StatNumber>{shopKpiData.activeShops}</StatNumber>
          <StatHelpText>
            <StatArrow
              type={shopKpiData.activeChange >= 0 ? 'increase' : 'decrease'}
            />
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Cold Shops</StatLabel>
          <StatNumber>{shopKpiData.inactiveShops}</StatNumber>
          <StatHelpText>
            <StatArrow
              type={shopKpiData.inactiveChange >= 0 ? 'increase' : 'decrease'}
            />
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default ShopKPIViewer;
