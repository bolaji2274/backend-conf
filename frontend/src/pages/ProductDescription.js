// src/components/ProductDescription.js

import React, { useState } from 'react';
import { Typography, Button, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/CartSlice';
import { selectProducts } from '../store/ProductSlice';
import '../styles/ProductDescription.css';
import Nav from './Nav';
import AppFooter from './AppFooter';

const ProductDescription = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);

  const product = products.find((prod) => prod.id === parseInt(productId));
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(product.stock, parseInt(value) || 1));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (quantity <= product.stock) {
      dispatch(addToCart({ ...product, quantity }));
      navigate('/cart');
    }
  };

  if (!product) {
    return <Typography variant="h5">Product not found!</Typography>;
  }

  return (
    <>
    {/* <Nav /> */}
    <div className="product-description-container">
      <img src={product.image} alt={product.name} className="product-image-id" />
      <div className="product-details">
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="h6">Category: {product.category}</Typography>
        <Typography variant="body1">Price: ₦{product.price.toFixed(2)}</Typography>
        <Typography variant="body1">Stock: {product.stock} available</Typography>

        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          InputProps={{ inputProps: { min: 1, max: product.stock } }}
          variant="outlined"
          size="small"
          style={{ marginTop: '20px' }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          style={{ marginTop: '10px' }}
        >
          Add to Cart
        </Button>
      </div>

      <div className="product-full-description">
        <Typography variant="h5" style={{ marginTop: '20px' }}>
          Full Description
        </Typography>
        <Typography variant="body1">
          {/* Detailed description of the product goes here */}
          This is a high-quality {product.name} sourced from the best farms. Ideal for all types of farming needs.
        </Typography>
      </div>
    </div>
    {/* <AppFooter /> */}
        </>
  );
};

export default ProductDescription;
