import { useEffect, useState } from "react";
import {
  Button,
  Heading,
  Flex,
  Card,
  Select,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useBookings } from "../../hooks/useBookings";
import dayHours from "./day_hours.json"; // Make sure to type this import if possible
import type {
  BookingCalendarProps,
  UseBookingsReturn,
} from "../../types/schedule";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  generateDateRange,
  calculateCombinedAvailability,
  calculateAvailability,
} from "../../services/calendar";

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ shopId }) => {
  const beginDate = new Date();
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const {
    shopSchedule,
    getSchedule,
    selectedDate,
    setSelectedDate,
  }: UseBookingsReturn = useBookings();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("all");
  const [currentBeginDate, setCurrentBeginDate] = useState<Date>(beginDate);
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

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
    const fetchSchedule = async () => {
      setIsLoading(true); // Start loading
      const endDate = new Date(currentBeginDate);
      endDate.setDate(currentBeginDate.getDate() + 6);
      const newDateRange = generateDateRange(currentBeginDate, endDate);
      setDateRange(newDateRange);

      await getSchedule(
        shopId,
        currentBeginDate.toISOString(),
        endDate.toISOString()
      );
      setIsLoading(false); // End loading after fetching
    };

    fetchSchedule();
  }, [currentBeginDate]);

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedEmployeeId(id);
  };

  if (!shopSchedule) {
    // Or return a loading spinner, etc.
    return <Card p={8}>Loading...</Card>;
  }
  if (!isLoading && !selectedDate.date) {
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
                          setSelectedDate({
                            date: selectedDateTime,
                            formatted: selectedDateTime.toISOString(),
                          });
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
                              setSelectedDate({
                                date: selectedDateTime,
                                formatted: selectedDateTime.toISOString(),
                              });
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
  } else if (selectedDate.date !== null) {
    return (
      <>
        <Card p={8}>
          <Heading
            as="h1"
            size="md"
            fontWeight={500}
            display={"flex"}
            gap={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex gap={2}>
              <Text color={"black"}>{selectedDate.date.toDateString()}</Text>-
              <Text color={"brand.300"}>
                {selectedDate.date
                  .toTimeString()
                  .split(":")
                  .slice(0, 2)
                  .join("h")}
              </Text>
            </Flex>
            <Button
              colorScheme="brand"
              variant="outline"
              size="sm"
              onClick={() => setSelectedDate({ date: null, formatted: "" })}
            >
              Change
            </Button>
          </Heading>
        </Card>
        <Button
          mt={8}
          colorScheme="brand"
          variant="solid"
          size="lg"
          onClick={() => {
            // Confirm booking
          }}
        >
          Confirm
        </Button>
      </>
    );
  }
};
