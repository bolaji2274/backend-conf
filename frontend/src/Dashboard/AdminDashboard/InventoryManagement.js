import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import api from '../../context/api';
// import useAxios from '../../utils/useAxios'


const InventoryManagement = () => {
    // const api = useAxios();
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
        <Container>
            <Typography variant="h6" gutterBottom>Inventory Management</Typography>
            <Box sx={{ my: 2 }}>
                <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <FormControl sx={{ ml: 2, minWidth: 120 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="type">Type</MenuItem>
                        <MenuItem value="available_quantity">Quantity</MenuItem>
                        <MenuItem value="created_at">Date Added</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ ml: 2, minWidth: 120 }}>
                    <InputLabel>Filter By Type</InputLabel>
                    <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="fish">Fish</MenuItem>
                        <MenuItem value="broiler">Broiler</MenuItem>
                        <MenuItem value="layers">Layers</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ my: 2 }}>
                <TextField label="Name" name="name" value={newLivestock.name} onChange={handleChange} />
                <TextField label="Type" name="type" value={newLivestock.type} onChange={handleChange} />
                <TextField label="Quantity" name="available_quantity" type="number" value={newLivestock.available_quantity} onChange={handleChange} />
                <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
            </Box>
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
                                <Button variant="contained" color="secondary" onClick={() => handleDelete(item.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box sx={{ mt: 2 }}>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Box>
        </Container>
    );
};

export default InventoryManagement;
