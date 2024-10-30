import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, Button, TextField } from '@mui/material';
// import api from '../../context/api';
import useAxios from '../../utils/useAxios'



const FarmerCommitments = () => {
    const [commitments, setCommitments] = useState([]);
    const [newCommitment, setNewCommitment] = useState({ farmer: '', commitment: '', status: 'Pending' });
    const api = useAxios();
    
    useEffect(() => {
        fetchCommitments();
    }, []);

    const fetchCommitments = async () => {
        const result = await api.get('/farmer-commitments/');
        setCommitments(result.data);
    };

    const handleChange = (e) => {
        setNewCommitment({ ...newCommitment, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        const result = await api.post('/farmer-commitments/', newCommitment);
        setCommitments([...commitments, result.data]);
        setNewCommitment({ farmer: '', commitment: '', status: 'Pending' });
    };

    const handleUpdateStatus = async (id, status) => {
        await api.patch(`/farmer-commitments/${id}/`, { status });
        fetchCommitments();
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Farmer Commitments</Typography>
            <Box sx={{ my: 2 }}>
                <TextField label="Farmer ID" name="farmer" value={newCommitment.farmer} onChange={handleChange} />
                <TextField label="Commitment" name="commitment" value={newCommitment.commitment} onChange={handleChange} />
                <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Farmer</TableCell>
                        <TableCell>Commitment</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {commitments.map(commitment => (
                        <TableRow key={commitment.id}>
                            <TableCell>{commitment.farmer}</TableCell>
                            <TableCell>{commitment.commitment}</TableCell>
                            <TableCell>{commitment.status}</TableCell>
                            <TableCell>
                                <Button variant="contained" onClick={() => handleUpdateStatus(commitment.id, 'Completed')}>
                                    Mark as Completed
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default FarmerCommitments;
