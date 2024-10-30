import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import TicketManagement from './TicketManagement';
import FeedbackManagement from './FeedbackManagement';

const CustomerSupportDashboard = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Customer Support Dashboard</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Paper>
                            <TicketManagement />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <FeedbackManagement />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default CustomerSupportDashboard;
