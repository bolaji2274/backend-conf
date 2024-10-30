import React from 'react'
import { Link } from "react-router-dom";
import { Container, Typography, Grid, Button, Box } from "@mui/material";
// import Grid from '@mui/material/Unstable_Grid2';
import chicken from "../assets/images/chicken-coop.jpg"; // Replace with the path to your hero image
import "./Home.css"; // Custom CSS for extra styling
import HeroCarousel from './HeroCarousel';

function Hero() {
  return (
    <div>
        {/* <HeroCarousel/> */}
      <Box
        className="hero"
        style={{ backgroundImage: `url(${chicken})`, width: "100%" }}
      >
        <Container maxWidth="lg" className="hero-content">
          <Typography variant="h4" color="white" gutterBottom>
            Welcome to Nasradamuff Farm
          </Typography>
          <Typography variant="h5" color="white" paragraph>
            Your Trusted Partner in Livestock Farming and Agro-Allied Ventures{" "}
            <br />
            Whether you’re into fish farming, broilers, layers, or other
            livestock,
            {/* we make it easy for you to apply for the resources you need, from birds or fish to feed and drugs and
We also empowering Farmers, Growing Livestock, and Sharing Profits */}
          </Typography>
          
            <Link
              to="/register"
              href="#!"
            >
              <Button variant="contained" color="primary" size="large">
                Get Started
                </Button>
            </Link>
        </Container>
      </Box> 
    </div>
  )
}

export default Hero
