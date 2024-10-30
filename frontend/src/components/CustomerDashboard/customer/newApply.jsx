// ApplicationForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../../context/api';

const ApplicationForm = ({ onSubmit }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get('/api/products/')
      .then(response => setProducts(response.data.product_list))  // Fetch product list
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ product: selectedProduct, quantity });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Product:
        <select onChange={(e) => setSelectedProduct(e.target.value)} required>
          <option value="">Choose...</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - {product.stock} in stock
            </option>
          ))}
        </select>
      </label>
      <label>
        Quantity:
        <input
          type="number"
          min="1"
          max={products.find((item) => item.id === Number(selectedProduct))?.stock || 1}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit Application</button>
    </form>
  );
};

export default ApplicationForm;
