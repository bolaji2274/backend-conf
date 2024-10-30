import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import ProfitSharingRatios from './ProfitSharingRatios';
import FarmerCommitments from './FarmerCommitments';
import ProfitDistributionTracking from './ProfitDistributionTracking';

const ProfitSharingDashboard = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Profit Sharing Dashboard</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Paper>
                            <ProfitSharingRatios />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <FarmerCommitments />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <ProfitDistributionTracking />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ProfitSharingDashboard;
