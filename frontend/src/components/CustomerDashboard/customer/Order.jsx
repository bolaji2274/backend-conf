import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { getCustomerOrders, cancelCustomerOrder } from '../../../context/allApi';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getCustomerOrders()
        .then((response) => setOrders(response.data))
        .catch((error) => console.error(error));
    }, []);
    const handleCancelOrder = async (orderId) => {
        try {
        const response = await cancelCustomerOrder(orderId);
        if (response.status === 200) {
            alert(response.data.detail);
            getCustomerOrders();  // Refresh the order list
        } else {
            alert(response.data.detail || "Failed to cancel the order");
        }
        } catch (error) {
        console.error("Error cancelling order:", error);
        }
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>My Orders</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Livestock Type</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.application_details.product_details.name}</TableCell>
                            <TableCell>{order.customer_name}</TableCell>
                            <TableCell>{order.application_details.quantity}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>${order.total_price}</TableCell>
                            <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrderList;