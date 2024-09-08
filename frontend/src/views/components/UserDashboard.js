import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import axios from 'axios';

const UserDashboard = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/user/availability',
        { start, end },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Availability scheduled successfully');
      setOpenSnackbar(true);
      fetchAvailability();
    } catch (error) {
      setMessage('Error scheduling availability');
      setOpenSnackbar(true);
    }
  };

  const fetchAvailability = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/user/availability', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvailability(response.data);
    } catch (error) {
      setMessage('Error fetching availability');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <Typography variant="h4" gutterBottom>
          User Dashboard
        </Typography>
        <Typography variant="h6" gutterBottom>
          Schedule Availability
        </Typography>
        <DateTimePicker
          label="Start Time"
          value={start}
          onChange={setStart}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <DateTimePicker
          label="End Time"
          value={end}
          onChange={setEnd}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Schedule
        </Button>

        <Typography variant="h6" gutterBottom>
          Your Availability
        </Typography>
        <ul>
          {availability.map((slot, index) => (
            <li key={index}>
              {new Date(slot.start).toLocaleString()} - {new Date(slot.end).toLocaleString()}
            </li>
          ))}
        </ul>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={message}
        />
      </Container>
    </LocalizationProvider>
  );
};

export default UserDashboard;
