interface Slot {
  military_format: string;
  twenty_four_hour_format: string;
  standard_format: string;
  time_of_day: string;
}

interface ShopSchedule {
  employee: {
    id: number;
    name: string;
    schedules: Schedule[];
    leaves: Leave[];
    bookings: Booking[];
  }[];
}

interface Schedule {
  id: number;
  employee: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface Leave {
  id: number;
  beginsAt: string;
  endsAt: string;
  employee: string;
}

interface Booking {
  id: number;
  beginDateTime: string;
  endDateTime: string;
  service: string;
  comment: string;
  status: string;
  user: string;
  shop: string;
  employee: string;
}

interface Schedule {
  id: number;
  employee: string; // Assuming it's a URL or ID reference
  dayOfWeek: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
}

interface Leave {
  id: number;
  beginsAt: string; // ISO string
  endsAt: string; // ISO string
  employee: string; // Assuming it's a URL or ID reference
}

interface Booking {
  id: number;
  beginDateTime: string; // ISO string
  endDateTime: string; // ISO string
  // Other fields...
}

interface Employee {
  employee: any;
  id: number;
  name: string;
  schedules: Schedule[];
  leaves: Leave[];
  bookings: Booking[];
}

interface DayHour {
  military_format: string;
  twenty_four_hour_format: string;
  standard_format: string;
  time_of_day: string;
}

// Props for your component
interface BookingCalendarProps {
  shopId: string;
}

// Assuming useBookings hook provides a specific return type
interface UseBookingsReturn {
  shopSchedule: Employee[];
  selectedDate: SelectedDate;
  createBooking: () => void;
  getSchedule: (shopId: string, startDate: string, endDate: string) => void;
  setSelectedDate: (selectedDate: SelectedDate) => void;
}

interface SelectedDate {
  date: Date | null;
  formatted: string;
  employee?: { id: string };
}

export type {
  Slot,
  ShopSchedule,
  Schedule,
  Leave,
  Booking,
  Schedule,
  Leave,
  Booking,
  Employee,
  DayHour,
  BookingCalendarProps,
  UseBookingsReturn,
  SelectedDate,
};
