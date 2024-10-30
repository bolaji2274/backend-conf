import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import SalesData from './SalesData';
import InventoryTrends from './InventoryTrends';
import CustomerInsights from './CustomerInsights';

const ReportingDashboard = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Reporting Dashboard</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <SalesData />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <InventoryTrends />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <CustomerInsights />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ReportingDashboard;
