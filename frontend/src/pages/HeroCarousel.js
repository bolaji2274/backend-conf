import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { Container, Typography, Grid, Button, Box } from "@mui/material";

import chicken from "../assets/images/chicken-coop.jpg"; // Replace with the path to your hero image
import img from "../assets/images/chicken-3.jpg";
import img3 from '../assets/images/chicken-8.jpg'
function HeroCarousel() {
  return (
    <div>
      <Carousel>
        {/* First Slide */}
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={img} alt="First slide" />
          <Carousel.Caption>
            <Box className="hero">
              <Container maxWidth="lg" className="hero-content p-5">
                <Typography variant="h5" color="red" gutterBottom className="p-5">
                  <marquee behavior="" direction="">
                    Welcome to Nasradamuff Farm
                  </marquee>
                </Typography>
                <Typography variant="h5" color="red" paragraph>
                  Your Trusted Partner in Livestock Farming and Agro-Allied
                  Ventures <br />
                  Whether you’re into fish farming, broilers, layers, or other
                  livestock,
                  {/* we make it easy for you to apply for the resources you need, from birds or fish to feed and drugs and
We also empowering Farmers, Growing Livestock, and Sharing Profits */}
                </Typography>

                <Link to="/register" href="#!">
                  <Button variant="contained" color="primary" size="large">
                    Get Started
                  </Button>
                </Link>
              </Container>
            </Box>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Second Slide */}
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={chicken} alt="Second slide" />
          <Carousel.Caption>
            <Box className="hero">
              <Container maxWidth="lg" className="hero-content">
                <Typography variant="h2" color="white" gutterBottom>
                  <marquee behavior="" direction="">
                    Welcome to Nasradamuff Farm
                  </marquee>
                </Typography>
                <Typography variant="h5" color="white" paragraph>
                  Your Trusted Partner in Livestock Farming and Agro-Allied
                  Ventures <br />
                  Whether you’re into fish farming, broilers, layers, or other
                  livestock,
                  {/* we make it easy for you to apply for the resources you need, from birds or fish to feed and drugs and
We also empowering Farmers, Growing Livestock, and Sharing Profits */}
                </Typography>

                <Link to="/register" href="#!">
                  <Button variant="contained" color="primary" size="large">
                    Get Started
                  </Button>
                </Link>
              </Container>
            </Box>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Third Slide */}
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={chicken} alt="Third slide" />
          <Carousel.Caption>
            <Box className="hero">
              <Container maxWidth="lg" className="hero-content">
                <Typography variant="h2" color="white" gutterBottom>
                 <marquee behavior="scrolling" direction="left">
                    Welcome to Nasradamuff Farm
                  </marquee>
                </Typography>
                <Typography variant="h5" color="white" paragraph>
                  Your Trusted Partner in Livestock Farming and Agro-Allied
                  Ventures <br />
                  Whether you’re into fish farming, broilers, layers, or other
                  livestock,
                  {/* we make it easy for you to apply for the resources you need, from birds or fish to feed and drugs and
We also empowering Farmers, Growing Livestock, and Sharing Profits */}
                </Typography>

                <Link to="/register" href="#!">
                  <Button variant="contained" color="primary" size="large">
                    Get Started
                  </Button>
                </Link>
              </Container>
            </Box>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
