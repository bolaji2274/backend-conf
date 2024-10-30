import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Fetch products when the component mounts
        axios.get('http://127.0.0.1:8000/api/products/')
            .then(response => setProducts(response.data))
            .catch(error => setError('Error fetching products'));
    }, []);

    const handleEditClick = (product) => {
        setEditingProduct(product); // Set the product to be edited
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/products/${editingProduct.id}/`, editingProduct)
            .then(response => {
                setProducts(products.map(product => product.id === editingProduct.id ? response.data : product));
                setEditingProduct(null); // Clear editing state
                setSuccessMessage('Product updated successfully!');
            })
            .catch(error => {
                setError('Error updating product');
                console.error(error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`http://127.0.0.1:8000/api/products/${id}/`)
                .then(response => {
                    setProducts(products.filter(product => product.id !== id));
                    alert("Product deleted successfully!");
                })
                .catch(error => {
                    console.error("There was an error deleting the product!", error);
                    alert("Error deleting the product. Please try again.");
                });
        }
    };

    return (
        <div>
            <h2>Products</h2>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{editingProduct?.id === product.id ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editingProduct.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                product.name
                            )}</td>
                            <td>{editingProduct?.id === product.id ? (
                                <input
                                    type="text"
                                    name="category"
                                    value={editingProduct.category}
                                    onChange={handleChange}
                                />
                            ) : (
                                product.category
                            )}</td>
                            <td>{editingProduct?.id === product.id ? (
                                <input
                                    type="number"
                                    name="price"
                                    value={editingProduct.price}
                                    onChange={handleChange}
                                />
                            ) : (
                                product.price
                            )}</td>
                            <td>{editingProduct?.id === product.id ? (
                                <input
                                    type="number"
                                    name="stock"
                                    value={editingProduct.stock}
                                    onChange={handleChange}
                                />
                            ) : (
                                product.stock
                            )}</td>
                            <td>
                                {editingProduct?.id === product.id ? (
                                    <button onClick={handleSubmit}>Save</button>
                                ) : (
                                    <button onClick={() => handleEditClick(product)}>Edit</button>
                                )}
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsTable;
