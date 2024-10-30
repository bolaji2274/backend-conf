import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import api from '../context/api';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/login/', formData)
            .then(res => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                alert("Login successful!");
            })
            .catch(err => console.error(err));
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Typography component="h1" variant="h5">Login</Typography>
                <TextField margin="normal" fullWidth name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
                <TextField margin="normal" fullWidth name="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Login</Button>
            </Box>
        </Container>
    );
};

export default Login;
