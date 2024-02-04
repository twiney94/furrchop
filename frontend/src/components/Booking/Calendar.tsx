import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

type Event = {
  start: Date;
  end: Date;
  title: string;
};

const MyCalendar = ({ events }: { events: Event[] }) => {
  <div>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor={(events) => events.start}
      endAccessor={(events) => events.end}
      style={{ height: 500 }}
    />
  </div>;
};

export default MyCalendar;
