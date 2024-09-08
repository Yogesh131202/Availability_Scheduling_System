import { useEffect, useState } from 'react';
import { Typography, Container, List, ListItem, ListItemText, Paper } from '@mui/material';
import axios from 'axios';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3002/api/admin/availability');
      setUsers(response.data);
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Admin Dashboard - User Availability
        </Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.email}>
              <ListItemText
                primary={`User: ${user.email}`}
                secondary={`Availability: ${user.availability.map(
                  (slot) => `${slot.start} - ${slot.end}`
                ).join(', ')}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
