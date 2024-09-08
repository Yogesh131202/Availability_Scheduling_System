import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        // Assuming the response contains a token and user data
        alert('Signup successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id); // Store user ID if needed
        window.location.href = '/user/availability'; // Redirect to user dashboard
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during user signup:', error);
    }
  };
  

  return (
    <Container>
      <Typography variant="h4">User Signup</Typography>
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
        Signup as User
      </Button>
    </Container>
  );
};

export default UserSignup;
