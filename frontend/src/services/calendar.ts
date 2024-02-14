import type {
  DayHour,
  Employee,
} from "../types/schedule";

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

export {
  generateDateRange,
  calculateCombinedAvailability,
  calculateAvailability,
};
