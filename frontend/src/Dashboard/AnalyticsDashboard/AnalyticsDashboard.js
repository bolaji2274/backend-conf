import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import SalesAnalytics from './SalesAnalytics';
// import CustomerAnalytics from './CustomerAnalytics';
import CustomerAnalytics from './CustomerAnalystics'
import OperationalPerformance from './OperationalPerformance';

const AnalyticsDashboard = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Analytics Dashboard</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <SalesAnalytics />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <CustomerAnalytics />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <OperationalPerformance />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default AnalyticsDashboard;
