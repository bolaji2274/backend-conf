import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, Button, TextField } from '@mui/material';
// import api from '../../context/api';
import useAxios from '../../utils/useAxios';



const ProfitSharingRatios = () => {
    const [ratios, setRatios] = useState([]);
    const [newRatio, setNewRatio] = useState({ farmer: '', profit_ratio: 0 });
    const api = useAxios();
    useEffect(() => {
        fetchRatios();
    }, []);

    const fetchRatios = async () => {
        const result = await api.get('/profit-sharing/');
        setRatios(result.data);
    };

    const handleChange = (e) => {
        setNewRatio({ ...newRatio, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        const result = await api.post('/profit-sharing/', newRatio);
        setRatios([...ratios, result.data]);
        setNewRatio({ farmer: '', profit_ratio: 0 });
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Profit Sharing Ratios</Typography>
            <Box sx={{ my: 2 }}>
                <TextField label="Farmer ID" name="farmer" value={newRatio.farmer} onChange={handleChange} />
                <TextField label="Profit Ratio" name="profit_ratio" type="number" value={newRatio.profit_ratio} onChange={handleChange} />
                <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Farmer</TableCell>
                        <TableCell>Profit Ratio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ratios.map(ratio => (
                        <TableRow key={ratio.id}>
                            <TableCell>{ratio.farmer}</TableCell>
                            <TableCell>{ratio.profit_ratio}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default ProfitSharingRatios;
