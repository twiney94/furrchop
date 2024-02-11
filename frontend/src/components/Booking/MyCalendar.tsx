import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parseISO, startOfWeek, getDay } from 'date-fns';

import { enUS } from 'date-fns/locale';
import { fetchBookings, uploadBooking } from './ApiCalls';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
  startOfWeek: () => startOfWeek(new Date()),
  getDay,
  locales,
});

type Event = {
  title: string;
  start: Date;
  end: Date;
};

const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  useEffect(() => {
    const response = {
      data: [
        {
          date: '2024-02-14',
          availabilities: [
            {
              start: '2024-02-14T09:00:00',
              end: '2024-02-14T10:00:00',
            },
            {
              start: '2024-02-14T10:00:00',
              end: '2024-02-14T11:00:00',
            },
          ],
        },
        {
          date: '2024-02-15',
          availabilities: [
            {
              start: '2024-02-15T09:00:00',
              end: '2024-02-15T10:00:00',
            },
          ],
        },
      ],
    };

    const bookings = response.data.flatMap((day) =>
      day.availabilities.map((availability) => ({
        start: new Date(availability.start),
        end: new Date(availability.end),
        title: 'chopping time',
      }))
    );

    setEvents(bookings);
  }, []);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    console.log('Selected slot:', start, end);

    setSelectedSlot({ start, end });
    setIsBookingModalOpen(true);
  };

  const submitBooking = () => {
    console.log('Booking submitted:', selectedSlot);
    // Close the modal
    setIsBookingModalOpen(false);
  };

  return (
    <>
      {isBookingModalOpen && (
        <div className="booking-modal">
          <h2>Confirm Booking</h2>
          <p>Start: {selectedSlot.start?.toString()}</p>
          <p>End: {selectedSlot.end?.toString()}</p>
          <button onClick={submitBooking}>Book Now</button>
          <button onClick={() => setIsBookingModalOpen(false)}>Cancel</button>
        </div>
      )}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleSelectSlot}
        style={{ height: 500 }}
        defaultDate={new Date()}
        defaultView="week" // or "month", "day", "agenda"
      />
    </>
  );
};

export default MyCalendar;
