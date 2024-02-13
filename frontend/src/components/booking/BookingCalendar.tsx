import { Button, Heading, Flex, Card } from "@chakra-ui/react";
import dayHours from "./day_hours.json";
import { useEffect } from "react";
import { useBookings } from "../../hooks/useBookings";

interface Slot {
  military_format: string;
  twenty_four_hour_format: string;
  standard_format: string;
  time_of_day: string;
}

const generateDateRange = (startDate: Date, endDate: Date) => {
  let dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

/**
[
    {
        "employee": {
            "id": 1,
            "name": "Juanito Rodriguez",
            "schedules": [
                {
                    "id": 1,
                    "employee": "\/employees\/1",
                        "dayOfWeek": "Monday",
                        "startTime": "1970-01-01T09:00:00+00:00",
                        "endTime": "1970-01-01T17:00:00+00:00"
                },
                {
                    "id": 2,
                    "employee": "\/employees\/1",
                    "dayOfWeek": "Tuesday",
                    "startTime": "1970-01-01T09:00:00+00:00",
                    "endTime": "1970-01-01T17:00:00+00:00"
                },
                {
                    "id": 3,
                    "employee": "\/employees\/1",
                    "dayOfWeek": "Wednesday",
                    "startTime": "1970-01-01T09:00:00+00:00",
                    "endTime": "1970-01-01T17:00:00+00:00"
                },
                {
                    "id": 4,
                    "employee": "\/employees\/1",
                    "dayOfWeek": "Thursday",
                    "startTime": "1970-01-01T09:00:00+00:00",
                    "endTime": "1970-01-01T17:00:00+00:00"
                },
                {
                    "id": 5,
                    "employee": "\/employees\/1",
                    "dayOfWeek": "Friday",
                    "startTime": "1970-01-01T09:00:00+00:00",
                    "endTime": "1970-01-01T17:00:00+00:00"
                }
            ],
            "leaves": [
                {
                    "id": 1,
                    "beginsAt": "2024-02-16T09:30:07+00:00",
                    "endsAt": "2024-02-17T16:30:07+00:00",
                    "employee": "\/employees\/1"
                }
            ],
            "bookings": [
                {
                    "id": 1,
                    "beginDateTime": "2024-02-15T11:00:00+00:00",
                    "endDateTime": "2024-02-15T11:30:00+00:00",
                    "service": "\/services\/1",
                    "comment": null,
                    "status": "validated",
                    "user": "\/users\/1eec9958-af2d-63a0-aaa3-378fb6639009",
                    "shop": "\/shops\/1",
                    "employee": "\/employees\/1"
                }
            ]
        }
    },
    {
        "employee": {
            "id": 2,
            "name": "Michelle Gonzales",
            "schedules": [],
            "leaves": [],
            "bookings": []
        }
    },
    {
        "employee": {
            "id": 3,
            "name": "Papito Munito",
            "schedules": [],
            "leaves": [],
            "bookings": []
        }
    }
]
 */

// We want to filter timeSlots based on employees availability.
// A button will display if one of the employee is available on the slot
// Availability is based on the shopSchedule, more preciseley on schedules, leaves and bookings of each employee
// We have to calculate the available time slots based on the shopSchedule

export const BookingCalendar = ({ shopId }: { shopId: string }) => {
  const beginDate = new Date();
  const endDate = new Date(beginDate.getTime() + 6 * 24 * 60 * 60 * 1000); // 6 days added to include the total of 7 days including the start date
  const dateRange = generateDateRange(beginDate, endDate);
  const { shopSchedule, getSchedule } = useBookings();

  useEffect(() => {
    const getShopSchedule = async () => {
      await getSchedule(shopId, beginDate.toISOString(), endDate.toISOString());
    };
    getShopSchedule();
  }, []);

  const renderTimeSlots = (slots: Slot[]) => {    

    return slots.map((slot, index) => (
      <Button key={index} size="sm" m={1} fontWeight={400}>
        {slot.twenty_four_hour_format}
      </Button>
    ));
  };

  return (
    <Card p={8}>
      {shopSchedule?.map((employee, index) => {
        return (
          <Flex key={index} justifyContent={"center"} gap={4}>
            {employee.employee.name}
          </Flex>
        );
      })    }
      <Flex justifyContent={"center"} gap={4}>
        {dateRange.map((date, index) => (
          <Flex direction={"column"} key={index}>
            <Heading size="sm" mb={2} fontWeight={400}>
              {date.toDateString()}
            </Heading>
            <Flex flexWrap="wrap" direction={"column"} gap={2}>
              {renderTimeSlots(dayHours)}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};
