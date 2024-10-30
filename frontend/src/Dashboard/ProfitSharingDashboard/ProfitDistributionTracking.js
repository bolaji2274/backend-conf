import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, Button, TextField } from '@mui/material';
// import api from '../../context/api';
import useAxios from '../../utils/useAxios'



const ProfitDistributionTracking = () => {
    const [distributions, setDistributions] = useState([]);
    const [newDistribution, setNewDistribution] = useState({ farmer: '', amount: '', date: '', status: 'Pending' });
    const api = useAxios();
    useEffect(() => {
        fetchDistributions();
    }, []);

    const fetchDistributions = async () => {
        const result = await api.get('/profit-distributions/');
        setDistributions(result.data);
    };

    const handleChange = (e) => {
        setNewDistribution({ ...newDistribution, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        const result = await api.post('/profit-distributions/', newDistribution);
        setDistributions([...distributions, result.data]);
        setNewDistribution({ farmer: '', amount: '', date: '', status: 'Pending' });
    };

    const handleUpdateStatus = async (id, status) => {
        await api.patch(`/profit-distributions/${id}/`, { status });
        fetchDistributions();
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Profit Distribution Tracking</Typography>
            <Box sx={{ my: 2 }}>
                <TextField label="Farmer ID" name="farmer" value={newDistribution.farmer} onChange={handleChange} />
                <TextField label="Amount" name="amount" type="number" value={newDistribution.amount} onChange={handleChange} />
                <TextField label="Date" name="date" type="date" value={newDistribution.date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Farmer</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {distributions.map(distribution => (
                        <TableRow key={distribution.id}>
                            <TableCell>{distribution.farmer}</TableCell>
                            <TableCell>{distribution.amount}</TableCell>
                            <TableCell>{new Date(distribution.date).toLocaleDateString()}</TableCell>
                            <TableCell>{distribution.status}</TableCell>
                            <TableCell>
                                <Button variant="contained" onClick={() => handleUpdateStatus(distribution.id, 'Distributed')}>
                                    Mark as Distributed
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default ProfitDistributionTracking;
