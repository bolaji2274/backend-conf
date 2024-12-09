import React, { useState } from 'react';
import { Typography, Button, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/CartSlice';
import { selectProducts } from '../store/ProductSlice';
import { motion } from 'framer-motion';
import Nav from '../components/Nav';

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
    <Nav />
    <motion.div
      className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 lg:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Image */}
      <motion.div
        className="w-full max-w-sm lg:max-w-md lg:w-1/2 h-64 lg:h-96 rounded-lg shadow-lg overflow-hidden"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Product Details */}
      <motion.div
        className="w-full max-w-sm lg:max-w-lg flex flex-col text-center lg:text-left gap-4"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" className="font-bold text-gray-800">
          {product.name}
        </Typography>
        <Typography variant="h6" className="text-gray-600">
          Category: {product.category}
        </Typography>
        <Typography variant="body1" className="text-gray-700">
          Price: ₦{product.price.toFixed(2)}
        </Typography>
        <Typography variant="body1" className="text-gray-700">
          Stock: {product.stock} available
        </Typography>

        {/* Quantity Input */}
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          InputProps={{ inputProps: { min: 1, max: product.stock } }}
          variant="outlined"
          size="small"
          className="w-full max-w-xs mx-auto lg:mx-0"
        />

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          className="w-full max-w-xs mx-auto lg:mx-0"
        >
          Add to Cart
        </Button>
      </motion.div>

      {/* Full Description */}
      <motion.div
        className="w-full max-w-3xl bg-gray-100 p-6 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Typography variant="h5" className="font-bold text-gray-800">
          Full Description
        </Typography>
        <Typography variant="body1" className="text-gray-700 mt-2">
          This is a high-quality {product.name} sourced from the best farms. Ideal for all types of farming needs.
        </Typography>
      </motion.div>
    </motion.div>
    </>
  );
};

export default ProductDescription;
