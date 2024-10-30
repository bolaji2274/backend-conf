import React from 'react'
// import { Link, Element } from "react-scroll";
import { Container, Typography, Grid, Button, Box } from "@mui/material";
// import Grid from '@mui/material/Unstable_Grid2';
// import chicken from "../assets/images/chicken-coop.jpg"; // Replace with the path to your hero image
// import "./Home.css"; // Custom CSS for extra styling

function Services() {
  return (
    <div>
            {/* Services Section */}
      <Container maxWidth="lg" className="services-section">
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
      </Container>
    </div>
  )
}

export default Services
