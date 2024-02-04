import { useQuery } from '@chakra-ui/react';
import { useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const SchedulePage = () => {
  const [schedule, setSchedule] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //use fetch to fetch data from the backend
  fetch('http://localhost:8000/api/schedule')
    .then((response) => response.json())
    .then((data) => {
      setSchedule(data);
      setData(data);
      setLoading(false);
    })
    .catch((error) => {
      setError(true);
      setLoading(false);
    });

  if (error) {
    return <div>Error loading schedule</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Schedule</h1>
      <ul>
        {/* {data.schedule.map((item) => (
          <li key={item.id}>
            {item.title} - {item.description}
          </li>
        ))} */}
      </ul>
    </div>
  );
};
