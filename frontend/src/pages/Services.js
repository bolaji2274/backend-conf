import React from 'react'
import { motion } from 'framer-motion';
// import { Link, Element } from "react-scroll";
import { Container, Typography, Grid, Button, Box } from "@mui/material";

import servicesImage from '../assets/images/chicken-3.jpg'

function Services() {
  return (
    <div>
                  {/* Services Section */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2 className="text-4xl font-semibold text-gray-800 mb-6" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }}>
                        Our Services
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Livestock Supply */}
                        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg">
                            <img src={servicesImage} alt="Livestock" className="rounded-md h-48 w-full object-cover mb-4" />
                            <h3 className="text-xl font-bold text-gray-700">High-Quality Livestock</h3>
                            <p className="text-gray-600 mt-2">
                                Broilers, layers, and fish, raised under optimal conditions for farmers’ success.
                            </p>
                        </motion.div>
                        {/* Consultation */}
                        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg">
                            <img src={servicesImage} alt="Consultation" className="rounded-md h-48 w-full object-cover mb-4" />
                            <h3 className="text-xl font-bold text-gray-700">Farming Consultation</h3>
                            <p className="text-gray-600 mt-2">
                                Expert agricultural advice for better livestock management and productivity.
                            </p>
                        </motion.div>
                        {/* Profit-Sharing */}
                        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg">
                            <img src={servicesImage} alt="Profit Sharing" className="rounded-md h-48 w-full object-cover mb-4" />
                            <h3 className="text-xl font-bold text-gray-700">Profit-Sharing Programs</h3>
                            <p className="text-gray-600 mt-2">
                                Join our profit-sharing model and grow without upfront capital investment.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
             {/* Services Section */}
      <section className="services_section py-16 bg-gray-50 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">What We Offer</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="service-box bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Livestock Supply</h3>
            <p className="text-gray-600">
              We provide a wide range of high-quality livestock, including poultry, cattle, and fish, all raised with care and adhering to the highest standards of health and welfare.
            </p>
          </div>
          <div className="service-box bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Farming Consultation</h3>
            <p className="text-gray-600">
              Our experts offer personalized consultation services, helping farmers optimize their operations, adopt sustainable practices, and maximize profitability.
            </p>
          </div>
          <div className="service-box bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Profit-Sharing Programs</h3>
            <p className="text-gray-600">
              We engage in partnerships with farmers through innovative profit-sharing arrangements, ensuring that their hard work translates into sustainable financial growth.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
