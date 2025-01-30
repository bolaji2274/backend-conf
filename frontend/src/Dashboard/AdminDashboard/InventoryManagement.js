import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import api from '../../context/api';

const InventoryManagement = () => {
    const [livestock, setLivestock] = useState([]);
    const [newLivestock, setNewLivestock] = useState({ name: '', type: '', available_quantity: 0 });
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('name');
    const [filterType, setFilterType] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchLivestock();
    }, [search, sort, filterType, page]);

    const fetchLivestock = async () => {
        const params = {
            search: search,
            ordering: sort,
            page: page,
            ...(filterType && { type: filterType }),
        };
        const result = await api.get('/livestock/', { params });
        setLivestock(result.data.results);
        setTotalPages(result.data.total_pages);
    };

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

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold' }}>Inventory Management</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                    <TextField label="Search" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} fullWidth />
                    <FormControl fullWidth>
                        <InputLabel>Sort By</InputLabel>
                        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                            <MenuItem value="name">Name</MenuItem>
                            <MenuItem value="type">Type</MenuItem>
                            <MenuItem value="available_quantity">Quantity</MenuItem>
                            <MenuItem value="created_at">Date Added</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Filter By Type</InputLabel>
                        <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="fish">Fish</MenuItem>
                            <MenuItem value="broiler">Broiler</MenuItem>
                            <MenuItem value="layers">Layers</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                    <TextField label="Name" name="name" value={newLivestock.name} onChange={handleChange} fullWidth />
                    <TextField label="Type" name="type" value={newLivestock.type} onChange={handleChange} fullWidth />
                    <TextField label="Quantity" name="available_quantity" type="number" value={newLivestock.available_quantity} onChange={handleChange} fullWidth />
                    <Button variant="contained" color="primary" onClick={handleAdd} sx={{ bgcolor: '#3498db', color: '#fff', fontWeight: 'bold' }}>Add</Button>
                </Box>
                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <Table>
                        <TableHead sx={{ bgcolor: '#2c3e50' }}>
                            <TableRow>
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Type</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Quantity</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {livestock.map(item => (
                                <TableRow key={item.id} sx={{ '&:nth-of-type(odd)': { bgcolor: '#ecf0f1' } }}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.available_quantity}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(item.id)} sx={{ bgcolor: '#e74c3c', color: '#fff', fontWeight: 'bold' }}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
                </Box>
            </Paper>
        </Container>
    );
};

export default InventoryManagement;
