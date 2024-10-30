import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import api from '../../context/api'
import useAxios from '../../utils/useAxios'


const CustomerInsights = () => {
    const [customerData, setCustomerData] = useState([]);
    const api = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('/customer-insights/');
            setCustomerData(result.data);
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Customer Insights</Typography>
            <Paper sx={{ p: 2, mt: 2 }}>
                <BarChart
                    width={600}
                    height={300}
                    data={customerData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date_joined" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_customers" fill="#8884d8" />
                </BarChart>
            </Paper>
        </Container>
    );
};

export default CustomerInsights;
