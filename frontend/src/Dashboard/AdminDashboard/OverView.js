import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import api from '../../context/api';
// import useAxios from '../../utils/useAxios'



const OverView = () => {
    const [metrics, setMetrics] = useState({});
    // const api = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('/metrics/');
            setMetrics(result.data);
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Overview</Typography>
            <Box>
                <Paper sx={{ p: 2, mt: 2 }}>
                    <Typography variant="h5">Total Livestock: {metrics.totalLivestock}</Typography>
                    <Typography variant="h5">Pending Orders: {metrics.pendingOrders}</Typography>
                    <Typography variant="h5">Approved Orders: {metrics.approvedOrders}</Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default OverView;
