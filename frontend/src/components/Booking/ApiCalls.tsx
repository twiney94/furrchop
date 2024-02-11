const BASE_URL = 'http://localhost:8000/bookings';

// Function to fetch bookings
export const fetchBookings = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    throw error;
  }
};

// Function to upload a new booking
export const uploadBooking = async (booking: {
  start: Date;
  end: Date;
  title: string;
}) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    });
    if (!response.ok) {
      throw new Error('Failed to upload booking');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to upload booking:', error);
    throw error;
  }
};
