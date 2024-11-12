import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";

// import heroImage from '../assets/hero.jpg'; // Replace with your image paths
// import teamImage from '../assets/team.jpg';
// import servicesImage from '../assets/services.jpg';

import heroImage from '../assets/tabs/1.png'

import servicesImage from '../assets/tabs/3.png'

const AboutUsPage = () => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleFullDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            {/* <section className="relative h-[80vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0"></div>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative text-center text-white z-10 p-6"
                >
                    <h1 className="text-5xl font-bold">Welcome to NASFARM</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto">
                        Empowering Farmers with High-Quality Livestock, Expert Advice, and Sustainable Profit-Sharing.
                    </p>
                </motion.div>
            </section> */}

            {/* Mission & Vision */}
            <section className="py-16 px-8 md:px-16 text-center">
                <motion.h2
                    className="text-4xl font-semibold text-gray-800 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Our Mission & Vision
                </motion.h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    At NASFARM, we are committed to providing farmers with access to the resources and knowledge they need to succeed. Our mission is to foster growth and stability in the agricultural industry by offering livestock, support, and innovative profit-sharing.
                </p>
                <button
                    onClick={toggleFullDescription}
                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                    {showFullDescription ? "Read Less" : "Read More"}
                </button>

                {showFullDescription && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-8 text-gray-600 max-w-3xl mx-auto"
                    >
                        <p className="mb-4">
                            NASFARM was founded on the belief that every farmer should have access to quality livestock, expert guidance, and risk-free financial models. We prioritize the health and well-being of all animals under our care, ensuring that farmers receive only the best.
                        </p>
                        <p className="mb-4">
                            Our approach is to provide tailored support to each farmer, understanding that every farm is unique. Whether through our high-quality livestock, dedicated consultation services, or unique profit-sharing programs, we help farmers thrive with confidence.
                        </p>
                        <p className="mb-4">
                            Additionally, our ethical farming commitments mean that farmers take oaths to ensure livestock welfare, and we require guarantors and next-of-kin information to maintain accountability. Our inventory tracking keeps all parties informed of livestock availability and progress, fostering transparency and trust.
                        </p>
                    </motion.div>
                )}
            </section>



     

            {/* Call-to-Action Section */}
            <section className="py-16 bg-blue-600 text-white text-center">
                <motion.h2
                    className="text-4xl font-semibold mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Partner with NASFARM Today
                </motion.h2>
                <p className="text-lg mb-6">Ready to grow your farm? Connect with us and start your journey to success.</p>
                <Nav.Link as={ScrollLink} to="contact" smooth={true} duration={200}>
                    <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="px-6 py-3 rounded-md bg-white text-blue-600 font-bold"
                >
                    Contact Us
                </motion.button>
                </Nav.Link>
                
            </section>
        </div>
    );
};

export default AboutUsPage;
