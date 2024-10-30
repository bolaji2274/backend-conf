import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { deleteProduct } from "../../../context/allApi";

const ProductsTable = () => {
	const [data, setData] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		// Fetch data from the API
		axios.get('http://127.0.0.1:8000/api/products/')
			.then(response => {
				setData(response.data);
				setFilteredProducts(response.data); // Set filteredProducts when data is fetched
				console.log(response.data);
			})
			.catch(error => {
				console.error("There was an error fetching the dashboard data!", error);
			});
	}, []);

	// Update filteredProducts whenever data or searchTerm changes
	useEffect(() => {
		const filtered = data.filter(
			(product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.category.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredProducts(filtered);
	}, [data, searchTerm]); // Dependencies: data and searchTerm

	const handleSearch = (e) => {
		setSearchTerm(e.target.value); // Update searchTerm on input change
	};
	
	const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct()
                .then(response => {
                    setData(data.filter(product => product.id !== id));
                    alert("Product deleted successfully!");
                })
                .catch(error => {
                    console.error("There was an error deleting the product!", error);
                    alert("Error deleting the product. Please try again.");
                });
        }
    };



	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Product List</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search products...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={handleSearch}
						value={searchTerm}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Category
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Price
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Stock
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Sales
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredProducts.map((product) => (
							<motion.tr
								key={product.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
									<img
										src={product.image} // Use the image URL from the product data
										alt='Product img'
										className='size-10 rounded-full'
									/>
									{product.name}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.category}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{/* Assuming price is a string from the API, you can parse it to a float */}
									# {parseFloat(product.price).toFixed(2)} {/* Format as needed */}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.stock}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.sales}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
										<Edit size={18} />
									</button>
									<button onClick={() => handleDelete(product.id)} className='text-red-400 hover:text-red-300' >
										<Trash2 size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default ProductsTable;
