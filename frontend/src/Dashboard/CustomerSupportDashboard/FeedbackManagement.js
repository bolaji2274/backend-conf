import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, TextField, Button } from '@mui/material';
// import api from '../../context/api';
import useAxios from '../../utils/useAxios'



const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [newFeedback, setNewFeedback] = useState({ ticket: '', customer: '', rating: '', comments: '' });
    const api = useAxios();
    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        const result = await api.get('/feedback/');
        setFeedbacks(result.data);
    };

    const handleChange = (e) => {
        setNewFeedback({ ...newFeedback, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        const result = await api.post('/feedback/', newFeedback);
        setFeedbacks([...feedbacks, result.data]);
        setNewFeedback({ ticket: '', customer: '', rating: '', comments: '' });
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Feedback Management</Typography>
            <Box sx={{ my: 2 }}>
                <TextField label="Ticket ID" name="ticket" value={newFeedback.ticket} onChange={handleChange} />
                <TextField label="Customer ID" name="customer" value={newFeedback.customer} onChange={handleChange} />
                <TextField label="Rating" name="rating" type="number" value={newFeedback.rating} onChange={handleChange} />
                <TextField label="Comments" name="comments" value={newFeedback.comments} onChange={handleChange} />
                <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Ticket ID</TableCell>
                        <TableCell>Customer ID</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Comments</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {feedbacks.map(feedback => (
                        <TableRow key={feedback.id}>
                            <TableCell>{feedback.ticket}</TableCell>
                            <TableCell>{feedback.customer}</TableCell>
                            <TableCell>{feedback.rating}</TableCell>
                            <TableCell>{feedback.comments}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default FeedbackManagement;
