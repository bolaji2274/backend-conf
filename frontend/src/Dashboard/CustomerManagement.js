import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import UserProfile from './UserProfile';
import LivestockOffers from './LivestockOffers';
import ApplyForLivestock from './ApplyForLivestock';
import OrderStatus from './OrderStatus';
import CustomerNotifications from './CustomerNotifications';

const CustomerDashboard = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Customer Dashboard</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <UserProfile />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <LivestockOffers />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <ApplyForLivestock />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <OrderStatus />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <CustomerNotifications />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default CustomerDashboard;
