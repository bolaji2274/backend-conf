import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail, resendVerificationEmail } from '../features/AuthSlices.js';
import { motion, AnimatePresence } from 'framer-motion';

const EmailVerification = () => {
    const { uid, token } = useParams();
    const dispatch = useDispatch();
    const { isVerified, error, resendMessage } = useSelector((state) => state.auth);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        dispatch(verifyEmail({ uid, token }));
    }, [dispatch, uid, token]);

    useEffect(() => {
        if (isVerified || error) {
            setModalIsOpen(true);
        }
    }, [isVerified, error]);

    const handleResendEmail = () => {
        dispatch(resendVerificationEmail());
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <AnimatePresence>
                {modalIsOpen && (
                    <motion.div
                        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center space-y-4"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                        >
                            {isVerified && <p className="text-green-600 text-lg font-semibold">Email verified successfully!</p>}
                            {error && <p className="text-red-600 text-lg font-semibold">{error}</p>}
                            <button 
                                onClick={() => setModalIsOpen(false)} 
                                className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700 transition"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="text-center space-y-4">
                {!isVerified && (
                    <motion.button
                        onClick={handleResendEmail}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-yellow-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-yellow-600 transition"
                    >
                        Resend Verification Email
                    </motion.button>
                )}
                {resendMessage && <p className="text-green-600">{resendMessage}</p>}
            </div>
        </div>
    );
};

export default EmailVerification;
