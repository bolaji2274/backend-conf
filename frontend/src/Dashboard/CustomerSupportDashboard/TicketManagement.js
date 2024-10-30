import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, Button, TextField, Select, MenuItem } from '@mui/material';
// import api from '../../context/api';
import useAxios from '../../utils/useAxios'



const TicketManagement = () => {
    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState({ subject: '', description: '', status: 'Open' });
    const api = useAxios();
    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        const result = await api.get('/tickets/');
        setTickets(result.data);
    };

    const handleChange = (e) => {
        setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        const result = await api.post('/tickets/', newTicket);
        setTickets([...tickets, result.data]);
        setNewTicket({ subject: '', description: '', status: 'Open' });
    };

    const handleUpdate = async (id, status) => {
        await api.patch(`/tickets/${id}/`, { status });
        fetchTickets();
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Ticket Management</Typography>
            <Box sx={{ my: 2 }}>
                <TextField label="Subject" name="subject" value={newTicket.subject} onChange={handleChange} />
                <TextField label="Description" name="description" value={newTicket.description} onChange={handleChange} />
                <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.map(ticket => (
                        <TableRow key={ticket.id}>
                            <TableCell>{ticket.subject}</TableCell>
                            <TableCell>{ticket.description}</TableCell>
                            <TableCell>{ticket.status}</TableCell>
                            <TableCell>
                                <Select value={ticket.status} onChange={(e) => handleUpdate(ticket.id, e.target.value)}>
                                    <MenuItem value="Open">Open</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Closed">Closed</MenuItem>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default TicketManagement;
