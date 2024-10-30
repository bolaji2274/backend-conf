import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import CustomerDashboard from './Dashboard/CustomerManagement';
import CustomerDashboard from './Dashboard/CustomerDashboard/CustomerDashboard';
import AdminDashboard from './Dashboard/AdminDashboard/AdminDashboard';
import ReportingDashboard from './Dashboard/ReportingDashboard/ReportingDashboard';
import CustomerSupportDashboard from './Dashboard/CustomerSupportDashboard/CustomerSupportDashboard';
import NotificationDashboard from './Dashboard/NotificationDashboard/NotificationDashboard';
import ProfitSharingDashboard from './Dashboard/ProfitSharingDashboard/ProfitSharingDashboard';
import AnalyticsDashboard from './Dashboard/AnalyticsDashboard/AnalyticsDashboard';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const App = () => {
    return (
        <>
            <Container maxWidth="lg">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            NASFARM
                        </Typography>
                        <Button color="inherit" href="/">Customer Dashboard</Button>
                        <Button color="inherit" href="/admin">Admin Dashboard</Button>
                        <Button color="inherit" href="/reporting">Reporting Dashboard</Button>
                        <Button color="inherit" href="/support">Support Dashboard</Button>
                        <Button color="inherit" href="/notifications">Notifications</Button>
                        <Button color="inherit" href="/profit-sharing">Profit Sharing</Button>
                        <Button color="inherit" href="/analytics">Analytics</Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{ mt: 4 }}>
                    <Routes>
                        <Route path="/" exact component={CustomerDashboard} />
                        <Route path="/admin" component={AdminDashboard} />
                        <Route path="/reporting" component={ReportingDashboard} />
                        <Route path="/support" component={CustomerSupportDashboard} />
                        <Route path="/notifications" component={NotificationDashboard} />
                        <Route path="/profit-sharing" component={ProfitSharingDashboard} />
                        <Route path="/analytics" component={AnalyticsDashboard} />
                    </Routes>
                </Box>
            </Container>
        </>
    );
};

export default App;
