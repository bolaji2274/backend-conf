import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import InventoryManagement from './InventoryManagement';
import OrderManagement from './OrderManagement';
import CustomerManagement from './CustomerManagement';
import ProfitSharing from './ProfitSharingDashboard';
import Notifications from './Notifications';

const AdminDashboard = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <InventoryManagement />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <OrderManagement />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <CustomerManagement />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <ProfitSharing />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <Notifications />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default AdminDashboard;
