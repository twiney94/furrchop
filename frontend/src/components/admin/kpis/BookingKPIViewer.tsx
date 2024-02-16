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

const BookingKPIViewer = () => {
  const { kpiData, fetchBookingKPIs } = useKPI();

  useEffect(() => {
    fetchBookingKPIs();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={4}>Booking KPI Dashboard</Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Daily Bookings</StatLabel>
          <StatNumber>{kpiData.todayBookings}</StatNumber>
          <StatHelpText>
            <StatArrow
              type={kpiData.dailyChange >= 0 ? 'increase' : 'decrease'}
            />
            {Math.abs(kpiData.dailyChange)}%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Yesterday Bookings</StatLabel>
          <StatNumber>{kpiData.yesterdayBookings}</StatNumber>
          <StatHelpText>
            <StatArrow
              type={kpiData.yersterdayChange >= 0 ? 'increase' : 'decrease'}
            />
            {Math.abs(kpiData.yersterdayChange)}%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Weekly Bookings</StatLabel>
          <StatNumber>{kpiData.weeklyBookings}</StatNumber>
          <StatHelpText>
            <StatArrow
              type={kpiData.weeklyChange >= 0 ? 'increase' : 'decrease'}
            />
            {Math.abs(kpiData.weeklyChange)}%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Monthly Bookings</StatLabel>
          <StatNumber>{kpiData.monthlyBookings}</StatNumber>
          <StatHelpText>
            <StatArrow
              type={kpiData.monthlyChange >= 0 ? 'increase' : 'decrease'}
            />
            {Math.abs(kpiData.monthlyChange)}%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Total Bookings</StatLabel>
          <StatNumber>{kpiData.totalBookings}</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default BookingKPIViewer;
