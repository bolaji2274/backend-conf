import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import api from '../../context/api';
// import useAxios from '../../utils/useAxios'



const ApplyForLivestock = () => {
    // const api = useAxios();
    const [application, setApplication] = useState({
        livestock_type: '',
        quantity: '',
    });

    const handleChange = (e) => {
        setApplication({ ...application, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/orders/', application);
        setApplication({ livestock_type: '', quantity: '' });
        alert('Application submitted successfully.');
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Apply for Livestock</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField margin="normal" fullWidth name="livestock_type" label="Livestock Type" value={application.livestock_type} onChange={handleChange} />
                <TextField margin="normal" fullWidth name="quantity" label="Quantity" value={application.quantity} onChange={handleChange} />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Submit Application</Button>
            </Box>
        </Container>
    );
};

export default ApplyForLivestock;
