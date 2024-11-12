import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonialsData = [
  {
    id: 1,
    name: "Olateju Saheed",
    location: "Lagos, Nigeria",
    message: "Nasradamuff Farm has completely transformed my farming business. The profit-sharing model allowed me to scale without upfront costs. I am grateful for their support!",
    image: "https://via.placeholder.com/150" // Replace with actual image URL
  },
  {
    id: 2,
    name: "Mary Oladejo",
    location: "Osogbo, Osun State Nigeria",
    message: "Their expert farming consultations have helped me improve my yield significantly. Nasradamuff Farm's team genuinely cares about our success.",
    image: "https://via.placeholder.com/150" // Replace with actual image URL
  },
  {
    id: 3,
    name: "kolade Abdullah",
    location: "Kano, Nigeria",
    message: "The risk-mitigation and support they offer are unmatched. I feel more confident in my farming ventures thanks to Nasradamuff Farm.",
    image: "https://via.placeholder.com/150"
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section className="py-16 px-8 bg-gray-50 text-center">
      <h2 className="text-4xl font-bold mb-8">What Our Farmers Say</h2>
      
      <div className="relative max-w-xl mx-auto">
        <AnimatePresence>
          <motion.div
            key={testimonialsData[current].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md"
          >
            <img
              src={testimonialsData[current].image}
              alt={testimonialsData[current].name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <p className="text-lg italic mb-4">"{testimonialsData[current].message}"</p>
            <h3 className="text-xl font-semibold">{testimonialsData[current].name}</h3>
            <span className="text-gray-500">{testimonialsData[current].location}</span>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={handlePrev}
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
