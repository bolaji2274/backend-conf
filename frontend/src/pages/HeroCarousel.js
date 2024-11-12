import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { Nav } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";

import slide1 from '../assets/images/chicken-3.jpg';
import slide2 from '../assets/images/chicken-coop.jpg'; // Replace with your image paths
import slide3 from '../assets/images/chicken-4.jpg';

const slides = [
  {
    image: slide1,
    title: 'Welcome to NASFARM',
    description: 'Your Trusted Partner in Livestock Farming and Agro-Allied Ventures. Empowering Farmers with High-Quality Livestock, Expert Advice, and Sustainable Profit-Sharing.. Whether you’re into fish farming, broilers, layers, or other livestock. We make it easy for you to apply for the resources you need, from birds or fish to feed and drugs. Join our Farming Consultation and Start Growing with Confidence.',
  },
  {
    image: slide2,
    title: 'Farming Consultation',
    description: 'Providing Expert Advice for Better Farming Practices. And we make it easy for you to apply for the resources you need, from birds or fish to feed and drugs. Join our Farming Consultation and Start Growing with Confidence.',
  },
  {
    image: slide3,
    title: 'Profit-Sharing Programs',
    description: 'Grow with Us Without Financial Risk. We also empowering Farmers, Growing Livestock, and with our Profit-Sharing Programs. Join our Profit-Sharing Programs and Start Growing with Confidence.',
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Handlers for manual navigation
  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  return (
    <div className="relative h-[80vh] overflow-hidden bg-gray-800 text-white">
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1 }}
            >
              <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0"></div>
              <div className="relative z-10 text-center px-6 max-w-3xl">
                <motion.h1
                  className="text-5xl font-bold mb-4"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="text-lg mb-6"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {slide.description}
                </motion.p>
                <Nav.Link as={ScrollLink} to="services" smooth={true} duration={200}>
                   <motion.button
                  className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Learn More
                </motion.button>
                </Nav.Link>
               
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
      >
        <MdArrowBackIos size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
      >
        <MdArrowForwardIos size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`cursor-pointer w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-blue-600' : 'bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
