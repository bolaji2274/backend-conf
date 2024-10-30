import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, Box } from '@mui/material';
// import api from '../../context/api';
import useAxios from '../../utils/useAxios'



const AllNotifications = () => {
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
            <Typography variant="h6" gutterBottom>All Notifications</Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Message</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notifications.map(notification => (
                            <TableRow key={notification.id}>
                                <TableCell>{notification.message}</TableCell>
                                <TableCell>{notification.notification_type}</TableCell>
                                <TableCell>{new Date(notification.created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default AllNotifications;
