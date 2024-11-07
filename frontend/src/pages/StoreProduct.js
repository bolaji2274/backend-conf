// ProductList.js
import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField } from "@mui/material";
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/CartSlice';
import hen from '../assets/images/hens.jpg';
import catFishs from '../assets/images/images-3.jpeg';
// import catFish from '../assets/images/images.jpeg';
import bird from '../assets/images/birds.jpg';
import chicken from '../assets/images/chicken-5.jpg';
import chick from '../assets/images/chick.jpg';
import layer_chick from '../assets/images/chicken-2.jpg';
import broiler from '../assets/images/chicken-coop.jpg';
import turkey from '../assets/images/turkey-2.jpg';
import egg from '../assets/images/eggs.jpg';
import './ProductList.css';
import Nav from './Nav';

const StoreProduct = () => {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});

  const myProduct = [
    { id: 1, name: "Organic Chicken", category: "Poultry", price: 20.0, stock: 50, image: hen },
    { id: 2, name: "Chicks", category: "Fish", price: 25.0, stock: 400, image: bird },
    { id: 2, name: "Eggs", category: "Eggs", price: 25.0, stock: `${350} Create`, image: egg },
    { id: 3, name: "Layer Chicks", category: "Fish", price: 25.0, stock: 400, image: layer_chick },
    { id: 4, name: "Broiler", category: "Fish", price: 35.0, stock: 400, image: broiler },
    { id: 5, name: "Cat Fish", category: "Fish", price: 15.0, stock: 100, image: chicken },
    { id: 7, name: "Broiler Chicks", category: "Fish", price: 12.0, stock: 350, image: chick },
    { id: 8, name: "Turkey", category: "Turkey", price: 30.0, stock: 30, image: turkey },
  ];

  const handleQuantityChange = (id, stock, value) => {
    const quantity = Math.max(1, Math.min(stock, parseInt(value) || 1));
    setQuantities({ ...quantities, [id]: quantity });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    if (quantity <= product.stock) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  return (
    <>
    <Nav />
    <div className="product-list-container">
      <Typography variant="h4" gutterBottom className='text-center'>Products livestock & Farm product</Typography>
      <div className="product-grid">
        {myProduct.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ₦{product.price.toFixed(2)}</p>
              <p>Stock: {product.stock} available</p>
              
              <TextField
                label="Quantity"
                type="number"
                value={quantities[product.id] || 1}
                onChange={(e) => handleQuantityChange(product.id, product.stock, e.target.value)}
                InputProps={{ inputProps: { min: 1, max: product.stock } }}
                variant="outlined"
                size="small"
              />

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
        </>
  );
};

export default StoreProduct;
