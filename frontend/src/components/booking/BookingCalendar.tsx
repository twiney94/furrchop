import { useEffect, useState } from "react";
import {
  Button,
  Heading,
  Flex,
  Card,
  Select,
  IconButton,
} from "@chakra-ui/react";
import { useBookings } from "../../hooks/useBookings";
import dayHours from "./day_hours.json"; // Make sure to type this import if possible
import type {
  BookingCalendarProps,
  DayHour,
  Employee,
  UseBookingsReturn,
} from "../../types/schedule";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

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
  const {
    shopSchedule,
    getSchedule,
    selectedDate,
    setSelectedDate,
  }: UseBookingsReturn = useBookings();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("all");
  const [currentBeginDate, setCurrentBeginDate] = useState<Date>(beginDate);
  const [weekOffset, setWeekOffset] = useState<number>(0);

  const handlePreviousWeek = () => {
    if (weekOffset > -3) {
      // Limit to 3 weeks back
      setCurrentBeginDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() - 7);
        return newDate;
      });
      setWeekOffset((prevOffset) => prevOffset - 1);
    }
  };

  const handleNextWeek = () => {
    if (weekOffset < 3) {
      // Limit to 3 weeks ahead
      setCurrentBeginDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() + 7);
        return newDate;
      });
      setWeekOffset((prevOffset) => prevOffset + 1);
    }
  };

  useEffect(() => {
    const endDate = new Date(currentBeginDate);
    endDate.setDate(currentBeginDate.getDate() + 6);

    if (
      endDate.getTime() - currentBeginDate.getTime() >
      7 * 24 * 60 * 60 * 1000
    ) {
      endDate.setDate(currentBeginDate.getDate() + 6);
    }

    getSchedule(shopId, currentBeginDate.toISOString(), endDate.toISOString());
  }, [currentBeginDate]);

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedEmployeeId(id);
  };

  if (!shopSchedule) {
    // Or return a loading spinner, etc.
    return <Card p={8}>Loading...</Card>;
  }
  if (!selectedDate) {
    return (
      <Card p={8}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb={8}
          gap={64}
        >
          {weekOffset > -3 && (
            <IconButton
              aria-label="Previous"
              icon={<ChevronLeftIcon />}
              onClick={handlePreviousWeek}
            />
          )}
          <Select value={selectedEmployeeId} onChange={handleEmployeeChange}>
            <option className="p-4" value="all">
              All Employees
            </option>
            {shopSchedule?.map((employee) => (
              <option key={employee.employee.id} value={employee.employee.id}>
                {employee.employee.name}
              </option>
            ))}
          </Select>
          {weekOffset < 3 && (
            <IconButton
              aria-label="Next"
              icon={<ChevronRightIcon />}
              onClick={handleNextWeek}
            />
          )}
        </Flex>

        {selectedEmployeeId === "all" ? (
          <Flex direction={"column"}>
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
                      <Button
                        key={slotIndex}
                        size="sm"
                        m={1}
                        onClick={() => {
                          const selectedDateTime = new Date(
                            `${date.toISOString().split("T")[0]}T${
                              slot.twenty_four_hour_format
                            }`
                          );
                          setSelectedDate(selectedDateTime);
                        }}
                      >
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
              <Flex direction={"column"} key={index}>
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
                          <Button
                            key={slotIndex}
                            size="sm"
                            m={1}
                            onClick={() => {
                              const selectedDateTime = new Date(
                                `${date.toISOString().split("T")[0]}T${
                                  slot.twenty_four_hour_format
                                }`
                              );
                              setSelectedDate(selectedDateTime);
                            }}
                          >
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
  } else if (selectedDate) {
    return (
      <Card p={8}>
        <Flex direction={"column"}>
          <Heading as="h1" size="md" fontWeight={500}>
            {selectedDate.toDateString()}
          </Heading>
          <Flex direction={"column"} mt={4}>
            {shopSchedule
              ?.filter(
                (employee) =>
                  String(employee.employee.id) === selectedEmployeeId
              )
              .map((employee, index) => (
                <Flex direction={"column"} key={index}>
                  <Heading size="sm" mb={2} fontWeight={400}>
                    {employee.employee.name}
                  </Heading>
                  <Flex flexWrap="wrap" direction="column">
                    {calculateAvailability(
                      employee.employee,
                      selectedDate,
                      dayHours
                    ).map((slot, slotIndex) => (
                      <Button
                        key={slotIndex}
                        size="sm"
                        m={1}
                        onClick={() => {
                          const selectedDateTime = new Date(
                            `${selectedDate.toISOString().split("T")[0]}T${
                              slot.twenty_four_hour_format
                            }`
                          );
                          setSelectedDate(selectedDateTime);
                        }}
                      >
                        {slot.twenty_four_hour_format}
                      </Button>
                    ))}
                  </Flex>
                </Flex>
              ))}
          </Flex>
        </Flex>
      </Card>
    );
  }
};
