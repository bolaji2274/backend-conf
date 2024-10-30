import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box } from '@mui/material';
// import api from '../../context/api';
import useAxios from '../../utils/useAxios'



const LivestockOffers = () => {
    const [livestock, setLivestock] = useState([]);
    const api = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('/livestock/');
            setLivestock(result.data);
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Available Livestock</Typography>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {livestock.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.available_quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Container>
    );
};

export default LivestockOffers;
