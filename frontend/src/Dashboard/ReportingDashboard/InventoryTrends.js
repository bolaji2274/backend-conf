import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import api from '../../context/api'
import useAxios from '../../utils/useAxios'



const InventoryTrends = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const api = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('/inventory-trends/');
            setInventoryData(result.data);
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Inventory Trends</Typography>
            <Paper sx={{ p: 2, mt: 2 }}>
                <LineChart
                    width={600}
                    height={300}
                    data={inventoryData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="created_at" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total_inventory" stroke="#82ca9d" />
                </LineChart>
            </Paper>
        </Container>
    );
};

export default InventoryTrends;
