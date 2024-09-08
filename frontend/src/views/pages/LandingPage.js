import React from 'react';
import { Container, Paper, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';  // External CSS for extra styling

const LandingPage = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/user/signup');  // Navigate to User Signup
  };

  const handleAdminClick = () => {
    navigate('/admin/signup');  // Navigate to Admin Signup
  };

  return (
    <Container className="landing-page" maxWidth="lg" sx={{ textAlign: 'center', marginTop: 10 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to availability Scheduling System
      </Typography>
      <Typography variant="h5" gutterBottom>
        Please choose how you want to join:
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 4 }}>
        {/* User Card */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ padding: 4, textAlign: 'center', height: '100%' }}>
            <Typography variant="h4" gutterBottom>
              Join as a User
            </Typography>
            <Typography variant="body1" gutterBottom>
              Sign up as a user and schedule your availability to participate in sessions.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleUserClick} sx={{ marginTop: 2 }}>
              User Signup
            </Button>
          </Paper>
        </Grid>

        {/* Admin Card */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ padding: 4, textAlign: 'center', height: '100%' }}>
            <Typography variant="h4" gutterBottom>
              Join as an Admin
            </Typography>
            <Typography variant="body1" gutterBottom>
              Sign up as an admin to manage user availability and schedule sessions.
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleAdminClick} sx={{ marginTop: 2 }}>
              Admin Signup
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
