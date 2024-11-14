// LogoutPage.jsx
import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/CartSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LogoutPage = () => {
    const { logoutUser, authTokens } = useContext(AuthContext);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
    if (!authTokens) {
      navigate("/"); // Redirect to home or dashboard if the user is not logged in
    }
  }, [authTokens, navigate]);
    useEffect(() => {
        // Perform logout action after a delay and navigate to login
        const timer = setTimeout(() => {
            logoutUser(); // Call the actual logout function to clear session and cart
            dispatch(clearCart());
            navigate("/login"); // Redirect to login page after logout
        }, 3000); // Adjust delay as needed

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [logoutUser, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-white p-10 shadow-lg rounded-lg"
            >
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                    Logging Out...
                </h1>
                <p className="text-gray-600 mb-6">
                    Thank you for visiting! You’ll be redirected to the login page shortly.
                </p>
                <div className="flex justify-center items-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-12 h-12 rounded-full border-4 border-t-4 border-blue-500"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default LogoutPage;
