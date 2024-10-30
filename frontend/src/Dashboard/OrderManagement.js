import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import api from '../api';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('/orders/');
            setOrders(result.data);
        };
        fetchData();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        await api.patch(`/orders/${id}/`, { status });
        setOrders(orders.map(order => order.id === id ? { ...order, status } : order));
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Order Management</Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer</TableCell>
                            <TableCell>Livestock</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>{order.customer.name}</TableCell>
                                <TableCell>{order.livestock.name}</TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleUpdateStatus(order.id, 'Approved')}>
                                        <CheckIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleUpdateStatus(order.id, 'Declined')}>
                                        <ClearIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default OrderManagement;
