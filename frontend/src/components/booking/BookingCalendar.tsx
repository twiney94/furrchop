import { useEffect, useState } from "react";
import { Button, Heading, Flex, Card, Select } from "@chakra-ui/react";
import { useBookings } from "../../hooks/useBookings";
import dayHours from "./day_hours.json"; // Make sure to type this import if possible
import type {
  BookingCalendarProps,
  DayHour,
  Employee,
  UseBookingsReturn,
} from "../../types/schedule";

const generateDateRange = (startDate: Date, endDate: Date): Date[] => {
  let dates: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const calculateCombinedAvailability = (
  date: Date,
  dayHours: DayHour[],
  employees: Employee[]
): DayHour[] => {
  let combinedSlots: DayHour[] = [];

  employees.forEach((employee) => {
    const employeeSlots = calculateAvailability(employee, date, dayHours);
    combinedSlots = [...combinedSlots, ...employeeSlots];
  });

  // Deduplicate the slots based on the twenty_four_hour_format
  const uniqueSlots = combinedSlots.reduce(
    (acc: DayHour[], current: DayHour) => {
      const x = acc.find(
        (item) =>
          item.twenty_four_hour_format === current.twenty_four_hour_format
      );
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    },
    []
  );

  return uniqueSlots;
};

const calculateAvailability = (
  employee: Employee,
  date: Date,
  dayHours: DayHour[]
): DayHour[] => {
  const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });
  const schedules = employee.schedules.filter(
    (schedule: { dayOfWeek: string }) => schedule.dayOfWeek === dayOfWeek
  );
  const leaves = employee.leaves;
  const bookings = employee.bookings;

  let availableSlots = dayHours.filter((slot) => {
    let isWorkingHour = false;
    schedules.forEach((schedule: { startTime: string; endTime: string }) => {
      const startTime = schedule.startTime.split("T")[1];
      const endTime = schedule.endTime.split("T")[1];
      if (
        slot.twenty_four_hour_format >= startTime &&
        slot.twenty_four_hour_format < endTime
      ) {
        isWorkingHour = true;
      }
    });
    return isWorkingHour;
  });

  leaves.forEach(
    (leave: {
      beginsAt: string | number | Date;
      endsAt: string | number | Date;
    }) => {
      const leaveStart = new Date(leave.beginsAt).getTime();
      const leaveEnd = new Date(leave.endsAt).getTime();
      availableSlots = availableSlots.filter((slot) => {
        const slotTime = new Date(
          `${date.toDateString()} ${slot.twenty_four_hour_format}`
        ).getTime();
        return slotTime < leaveStart || slotTime >= leaveEnd;
      });
    }
  );

  bookings.forEach(
    (booking: {
      beginDateTime: string | number | Date;
      endDateTime: string | number | Date;
    }) => {
      const bookingStart = new Date(booking.beginDateTime).getTime();
      const bookingEnd = new Date(booking.endDateTime).getTime();
      availableSlots = availableSlots.filter((slot) => {
        const slotTime = new Date(
          `${date.toDateString()} ${slot.twenty_four_hour_format}`
        ).getTime();
        return slotTime < bookingStart || slotTime >= bookingEnd;
      });
    }
  );

  return availableSlots;
};

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ shopId }) => {
  const beginDate = new Date();
  const endDate = new Date(beginDate.getTime() + 6 * 24 * 60 * 60 * 1000);
  const dateRange = generateDateRange(beginDate, endDate);
  const { shopSchedule, getSchedule }: UseBookingsReturn = useBookings();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");

  useEffect(() => {
    getSchedule(shopId, beginDate.toISOString(), endDate.toISOString());
  }, []);

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedEmployeeId(id);
  };

  return (
    <Card p={8}>
      <Select
        placeholder="Select an employee"
        onChange={handleEmployeeChange}
        mb={4}
      >
        <option value="all">All Employees</option>
        {shopSchedule?.map((employee) => (
          <option key={employee.employee.id} value={employee.employee.id}>
            {employee.employee.name}
          </option>
        ))}
      </Select>

      {selectedEmployeeId === "all" ? (
        <Flex direction={"column"}>
          <Heading size="sm" mb={2}>
            All Employees
          </Heading>
          <Flex direction="row" mb={4} gap={8} justify={"center"}>
            {dateRange.map((date, dateIndex) => (
              <Flex direction="column" key={dateIndex}>
                <Heading size="sm" mb={2} fontWeight={400}>
                  {date.toDateString()}
                </Heading>
                <Flex flexWrap="wrap" direction="column">
                  {calculateCombinedAvailability(
                    date,
                    dayHours,
                    shopSchedule.map((employee) => employee.employee)
                  ).map((slot, slotIndex) => (
                    <Button key={slotIndex} size="sm" m={1}>
                      {slot.twenty_four_hour_format}
                    </Button>
                  ))}
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      ) : (
        shopSchedule
          ?.filter(
            (employee) => String(employee.employee.id) === selectedEmployeeId
          )
          .map((employee, index) => (
            <Flex direction={"column"}>
              <Heading size="sm" mb={2}>
                {employee.employee.name}
              </Heading>
              <Flex
                key={index}
                direction="row"
                mb={4}
                justify={"center"}
                gap={8}
              >
                {dateRange.map((date, dateIndex) => (
                  <Flex direction="column" key={dateIndex}>
                    <Heading size="sm" mb={2} fontWeight={400}>
                      {date.toDateString()}
                    </Heading>
                    <Flex flexWrap="wrap" direction="column">
                      {calculateAvailability(
                        employee.employee,
                        date,
                        dayHours
                      ).map((slot, slotIndex) => (
                        <Button key={slotIndex} size="sm" m={1}>
                          {slot.twenty_four_hour_format}
                        </Button>
                      ))}
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          ))
      )}
    </Card>
  );
};
