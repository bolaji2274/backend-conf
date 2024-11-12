import React from 'react'
import { motion } from 'framer-motion';
// import { Link, Element } from "react-scroll";
import { Container, Typography, Grid, Button, Box } from "@mui/material";

import servicesImage from '../assets/images/chicken-3.jpg'

function Services() {
  return (
    <div>
            {/* Services Section */}
      {/* <Container maxWidth="lg" className="services-section">
        <Typography variant="h4" gutterBottom className='text-center'>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box className="service-box">
              <Typography variant="h6">Livestock Provision</Typography>
              <Typography variant="body2" paragraph>
                We provide high-quality broilers, layers, fish, and other livestock to farmers, ensuring
                that they receive the healthiest and most productive stock.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className="service-box">
              <Typography variant="h6">Feed and Supplies</Typography>
              <Typography variant="body2" paragraph>
                Our farm provides premium feeds and necessary supplies for your livestock, making sure
                they grow healthy and strong.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className="service-box">
              <Typography variant="h6">Farm Management Support</Typography>
              <Typography variant="body2" paragraph>
                We assist farmers with farm management, offering expert advice, training, and resources
                to ensure successful operations.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container> */}


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
    </div>
  )
}

export default Services
