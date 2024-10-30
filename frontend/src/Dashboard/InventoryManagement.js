import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api';

const InventoryManagement = () => {
    const [livestock, setLivestock] = useState([]);
    const [newLivestock, setNewLivestock] = useState({
        name: '',
        type: '',
        available_quantity: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('/livestock/');
            setLivestock(result.data);
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setNewLivestock({ ...newLivestock, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        const result = await api.post('/livestock/', newLivestock);
        setLivestock([...livestock, result.data]);
        setNewLivestock({ name: '', type: '', available_quantity: 0 });
    };

    const handleDelete = async (id) => {
        await api.delete(`/livestock/${id}/`);
        setLivestock(livestock.filter(item => item.id !== id));
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Inventory Management</Typography>
            <Box sx={{ my: 2 }}>
                <TextField label="Name" name="name" value={newLivestock.name} onChange={handleChange} />
                <TextField label="Type" name="type" value={newLivestock.type} onChange={handleChange} />
                <TextField label="Quantity" name="available_quantity" type="number" value={newLivestock.available_quantity} onChange={handleChange} />
                <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
            </Box>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {livestock.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.available_quantity}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(item.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default InventoryManagement;
