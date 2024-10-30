import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
// import api from '../../context/api';
import useAxios from '../../utils/useAxios'


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const OperationalPerformance = () => {
    const [performanceData, setPerformanceData] = useState({ inventory_levels: [], order_fulfillment_times: [] });
    const api = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('/operational-performance/');
            setPerformanceData(result.data);
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Operational Performance</Typography>
            <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="h6">Inventory Levels</Typography>
                <PieChart width={400} height={400}>
                    <Pie
                        data={performanceData.inventory_levels}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="total_quantity"
                    >
                        {performanceData.inventory_levels.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </Paper>
            <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="h6">Order Fulfillment Times</Typography>
                {/* Add appropriate visualization for order fulfillment times */}
            </Paper>
        </Container>
    );
};

export default OperationalPerformance;
