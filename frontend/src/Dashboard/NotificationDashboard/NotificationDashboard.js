import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import AllNotifications from './AllNotifications';
import FilteredNotifications from './FilteredNotifications';

const NotificationDashboard = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Notification Dashboard</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Paper>
                            <AllNotifications />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <FilteredNotifications />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default NotificationDashboard;
