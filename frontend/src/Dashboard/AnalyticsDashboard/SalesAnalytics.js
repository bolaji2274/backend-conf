import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import api from '../../context/api';
import useAxios from '../../utils/useAxios'



const SalesAnalytics = () => {
    const [salesData, setSalesData] = useState([]);
    const api = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('/sales-analysis/');
            setSalesData(result.data);
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Sales Analysis</Typography>
            <Paper sx={{ p: 2, mt: 2 }}>
                <LineChart
                    width={600}
                    height={300}
                    data={salesData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="created_at" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total_sales" stroke="#8884d8" />
                </LineChart>
            </Paper>
        </Container>
    );
};

export default SalesAnalytics;
