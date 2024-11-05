import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/CartSlice';
import hen from '../assets/images/hens.jpg';
import catFishs from '../assets/images/images-3.jpeg';
import catFish from '../assets/images/images.jpeg';
import turkey from '../assets/images/turkey-2.jpg';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get('https://api-bkrt.onrender.com/api/products/');
      setProducts(data);
    }
    fetchProduct();
  }, []);

  const myProduct = [
    { id: 1, name: "Organic Chicken", category: "Poultry", price: 20.0, stock: 50, image: hen },
    { id: 2, name: "Cat Fish", category: "Fish", price: 15.0, stock: 100, image: catFishs },
    { id: 3, name: "Fresh Tilapia", category: "Feed", price: 25.0, stock: 200, image: catFish },
    { id: 4, name: "Turkey", category: "Turkey", price: 30.0, stock: 30, image: turkey },
  ];

  return (
    <div className="product-list-container">
      <Typography variant="h4" gutterBottom className='text-center'>Products</Typography>
      <div className="product-grid">
        {myProduct.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Stock: {product.stock} available</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
