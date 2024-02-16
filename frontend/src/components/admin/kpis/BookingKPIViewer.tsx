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
  const { bookingKpiData, fetchBookingKPIs } = useKPI();

  useEffect(() => {
    fetchBookingKPIs();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={4}>Booking KPI Dashboard</Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Daily Bookings</StatLabel>
          <StatNumber>{bookingKpiData.todayBookings}</StatNumber>
          <StatHelpText>
            <StatArrow
              type={bookingKpiData.dailyChange >= 0 ? 'increase' : 'decrease'}
            />
            {/* {Math.abs(bookingKpiData.dailyChange)}% */}
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Yesterday Bookings</StatLabel>
          <StatNumber>{bookingKpiData.yesterdayBookings}</StatNumber>
          <StatHelpText>
            <StatArrow
              type={
                bookingKpiData.yersterdayChange >= 0 ? 'increase' : 'decrease'
              }
            />
            {/* {Math.abs(bookingKpiData.yersterdayChange)}% */}
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Weekly Bookings</StatLabel>
          <StatNumber>{bookingKpiData.weeklyBookings}</StatNumber>
          <StatHelpText>
            <StatArrow
              type={bookingKpiData.weeklyChange >= 0 ? 'increase' : 'decrease'}
            />
            {/* {Math.abs(bookingKpiData.weeklyChange)}% */}
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Monthly Bookings</StatLabel>
          <StatNumber>{bookingKpiData.monthlyBookings}</StatNumber>
          <StatHelpText>
            <StatArrow
              type={bookingKpiData.monthlyChange >= 0 ? 'increase' : 'decrease'}
            />
            {/* {Math.abs(bookingKpiData.monthlyChange)}% */}
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Total Bookings</StatLabel>
          <StatNumber>{bookingKpiData.totalBookings}</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default BookingKPIViewer;
