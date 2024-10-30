import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import api from './api';

const UserProfile = () => {
    const [profile, setProfile] = useState({});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('/profiles/');
            setProfile(result.data[0]); // Assuming the first profile in the array
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.put(`/profiles/${profile.id}/`, profile);
        setEditMode(false);
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Profile</Typography>
            {editMode ? (
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal" fullWidth name="full_name" label="Name" value={profile.full_name} onChange={handleChange} />
                    <TextField margin="normal" fullWidth name="address" label="Address" value={profile.address} onChange={handleChange} />
                    <TextField margin="normal" fullWidth name="phone_number" label="Phone Number" value={profile.phone_number} onChange={handleChange} />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Save</Button>
                </Box>
            ) : (
                <Box>
                    <Typography>Name: {profile.full_name}</Typography>
                    <Typography>Address: {profile.address}</Typography>
                    <Typography>Phone: {profile.phone_number}</Typography>
                    <Button onClick={() => setEditMode(true)}>Edit</Button>
                </Box>
            )}
        </Container>
    );
};

export default UserProfile;
