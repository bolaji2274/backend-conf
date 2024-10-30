import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
// import api from '../../context/api';
import useAxios from '../../utils/useAxios'



const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const api = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('/notifications/');
            setNotifications(result.data);
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Notifications</Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Message</TableCell>
                            <TableCell>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notifications.map(notification => (
                            <TableRow key={notification.id}>
                                <TableCell>{notification.message}</TableCell>
                                <TableCell>{new Date(notification.created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default Notifications;
