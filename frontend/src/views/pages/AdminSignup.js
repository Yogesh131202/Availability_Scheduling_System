import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const AdminSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Signup successful!');
        localStorage.setItem('token', data.token);
        window.location.href = '/admin/dashboard';
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during admin signup:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Admin Signup</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSignup}>
        Signup as Admin
      </Button>
    </Container>
  );
};

export default AdminSignup;
