import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root') // Mounts React app to the "root" div in index.html
);
