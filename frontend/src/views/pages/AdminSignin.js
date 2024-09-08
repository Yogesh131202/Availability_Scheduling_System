import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const AdminSignin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Login successful!');
        localStorage.setItem('token', data.token);
        window.location.href = '/admin-dashboard';
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during admin signin:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Admin Login</Typography>
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
      <Button variant="contained" color="primary" onClick={handleSignin}>
        Login as Admin
      </Button>
    </Container>
  );
};

export default AdminSignin;
