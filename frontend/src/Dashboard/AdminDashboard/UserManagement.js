import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../context/api';
// import useAxios from '../../utils/useAxios'


const UserManagement = () => {
    // const api = useAxios();
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        farm_branch_name: '',
        phone_number: '',
        password: '',
        password2: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('/customers/');
            setUsers(result.data);
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        const result = await api.post('/register/', newUser);
        setUsers([...users, result.data]);
        setNewUser({ first_name: '', last_name: '', email: '', farm_branch_name: '', phone_number: '', password: '', password2: '' });
    };

    const handleDelete = async (id) => {
        await api.delete(`/customers/${id}/`);
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>User Management</Typography>
            <Box sx={{ my: 2 }}>
                <TextField label="First Name" name="first_name" value={newUser.first_name} onChange={handleChange} />
                <TextField label="Last Name" name="last_name" value={newUser.last_name} onChange={handleChange} />
                <TextField label="Email" name="email" value={newUser.email} onChange={handleChange} />
                <TextField label="Farm Branch Name" name="farm_branch_name" value={newUser.farm_branch_name} onChange={handleChange} />
                <TextField label="Phone Number" name="phone_number" value={newUser.phone_number} onChange={handleChange} />
                <TextField label="Password" name="password" type="password" value={newUser.password} onChange={handleChange} />
                <TextField label="Confirm Password" name="password2" type="password" value={newUser.password2} onChange={handleChange} />
                <Button variant="contained" color="primary" onClick={handleAdd}>Add User</Button>
            </Box>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Farm Branch</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.first_name} {user.last_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.farm_branch_name}</TableCell>
                                <TableCell>{user.phone_number}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(user.id)}>
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

export default UserManagement;
