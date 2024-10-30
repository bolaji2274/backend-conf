import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
// import api from '../../context/api';
import useAxios from '../../utils/useAxios'



const FilteredNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [filterType, setFilterType] = useState('');
    const api = useAxios();
    useEffect(() => {
        fetchFilteredNotifications();
    }, [filterType]);

    const fetchFilteredNotifications = async () => {
        const params = filterType ? { notification_type: filterType } : {};
        const result = await api.get('/notifications/', { params });
        setNotifications(result.data);
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Filtered Notifications</Typography>
            <FormControl sx={{ mb: 2, minWidth: 120 }}>
                <InputLabel>Filter By Type</InputLabel>
                <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="order">Order</MenuItem>
                    <MenuItem value="inventory">Inventory</MenuItem>
                    <MenuItem value="general">General</MenuItem>
                </Select>
            </FormControl>
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

export default FilteredNotifications;
