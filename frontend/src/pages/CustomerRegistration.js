import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import api from '../context/api';

const CustomerRegistration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        farmRanchName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        await api.post('/cregister/', formData)
            .then(res => {
                alert("Registration successful!");
            })
            .catch(err => console.error(err));
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Typography component="h1" variant="h5">Customer Registration</Typography>
                <TextField margin="normal" fullWidth name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} />
                <TextField margin="normal" fullWidth name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} />
                <TextField margin="normal" fullWidth name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
                <TextField margin="normal" fullWidth name="farmRanchName" label="Farm/Ranch Name" value={formData.farmRanchName} onChange={handleChange} />
                <TextField margin="normal" fullWidth name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
                <TextField margin="normal" fullWidth name="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
                <TextField margin="normal" fullWidth name="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Register</Button>
            </Box>
        </Container>
    );
};

export default CustomerRegistration;
