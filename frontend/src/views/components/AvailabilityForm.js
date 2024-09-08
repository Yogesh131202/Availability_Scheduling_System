import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Container, Paper } from '@mui/material';
import axios from 'axios';

export default function AvailabilityForm() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date in YYYY-MM-DD format
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Retrieve user email and token from localStorage
    const email = localStorage.getItem('email');
    const storedToken = localStorage.getItem('token');
    console.log(email);
    console.log(storedToken);

    if (email && storedToken) {
      setUserEmail(email);
      setToken(storedToken);
    } else {
      setError('User not logged in or token not found.');
    }
  }, []);

  const handleSubmit = async () => {
    setError(''); // Reset error message
    setSuccess(''); // Reset success message

    if (!startTime || !endTime) {
      setError('Please enter valid start and end times.');
      return;
    }

    if (!userEmail || !token) {
      setError('User email or token not found.');
      return;
    }

    try {
      // Save availability to the database
      const response = await axios.post(
        '/api/availability',
        {
          email: userEmail,
          date: selectedDate,
          availability: {
            start: `${selectedDate}T${startTime}:00.000Z`,
            end: `${selectedDate}T${endTime}:00.000Z`,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess('Availability saved successfully!');
      } else {
        setError('Failed to save availability.');
      }
    } catch (error) {
      console.error('Error saving availability:', error);
      setError('An error occurred while saving availability.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Set Availability
        </Typography>
        <Box mb={2}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Start Time"
            type="time"
            fullWidth
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="End Time"
            type="time"
            fullWidth
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Save Availability
        </Button>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        {success && <Typography color="success" sx={{ mt: 2 }}>{success}</Typography>}
      </Paper>
    </Container>
  );
}
