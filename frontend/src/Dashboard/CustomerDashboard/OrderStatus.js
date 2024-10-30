import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box } from '@mui/material';
import api from '../../context/api';
// import useAxios from '../../utils/useAxios'



const OrderStatus = () => {
    const [orders, setOrders] = useState([]);
    // const api = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('/orders/');
            setOrders(result.data);
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Order Status</Typography>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Livestock Type</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>{order.livestock_type}</TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>{order.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Container>
    );
};

export default OrderStatus;
