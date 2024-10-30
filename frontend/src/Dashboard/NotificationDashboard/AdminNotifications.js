import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box } from '@mui/material';
// import api from '../../context/api';
import useAxios from '../../utils/useAxios'



const AdminNotifications = () => {
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
            <Typography variant="h6" gutterBottom>Admin Notifications</Typography>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Message</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notifications.map(notification => (
                            <TableRow key={notification.id}>
                                <TableCell>{notification.message}</TableCell>
                                <TableCell>{notification.customer.email}</TableCell>
                                <TableCell>{new Date(notification.created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Container>
    );
};

export default AdminNotifications;
