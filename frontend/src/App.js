import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material/styles';

import UserSignup from './views/pages/UserSignup';
import AdminSignup from './views/pages/AdminSignup';
import UserSignin from './views/pages/UserSignin';
import AdminSignin from './views/pages/AdminSignin';
import AvailabilityForm from './views/components/AvailabilityForm';
import AdminDashboard from './views/components/AdminDashboard';
import LandingPage from './views/pages/LandingPage';
import './views/pages/LandingPage.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#ff9800',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/user/signin" element={<UserSignin />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/user/availability" element={<AvailabilityForm />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
