import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import OverView from './OverView';
import UserManagement from './UserManagement';
import InventoryManagement from './InventoryManagement';
import OrderProcessing from './OrderProcessing';
import ProfitSharing from './ProfitSharing';
import Notifications from './Notifications';

const AdminDashboard = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Paper>
                            <OverView />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <UserManagement />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <InventoryManagement />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <OrderProcessing />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <ProfitSharing />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            {/* <Notifications /> */}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default AdminDashboard;
