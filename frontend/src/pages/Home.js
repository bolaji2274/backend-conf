import React from "react";

import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import { Container, Typography, Grid, Button, Box } from "@mui/material";
// import Grid from '@mui/material/Unstable_Grid2';
import chicken from "../assets/images/chicken-coop.jpg"; // Replace with the path to your hero image
import "./Home.css"; // Custom CSS for extra styling
import Footer from "./Footer";
import Navbar from "../views/Navbar";
import Header from "../views/Header";
import About from "../pages/About.js";
import AppFooter from "./AppFooter.js";
import Contact from "./Contact.js";
import Services from "./Services.js";
import Hero from "./Hero.js";
import Nav from './Nav.js'
import ProductList from "./Product.js";

const Home = () => {
  return (
    <>
      <Nav/>
 
<Hero />

      {/* Introduction Section */}
      <Container maxWidth="lg" className="intro-section">
     <Element name="product">
      <ProductList/>
      </Element>   

      <Element name="about">

          <About />
        </Element>
          {" "}
        <Typography variant="h4" gutterBottom className="text-center">
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          At Nasradamuff Farm and Agro-Allied Ventures, we specialize in
          livestock farming, inventory management, and providing farmers with
          the resources they need to succeed. With decades of experience in the
          agro-industry, we ensure that our clients get the best livestock,
          feed, and farming support.
        </Typography>
      </Container>
      {/* // Continue Home.js */}

      {/* Services Section */}
      <Element name="services">
        <Services />
      </Element>
      {/* Testimonials Section */}
      <Container maxWidth="lg" className="testimonials-section">
        <Typography variant="h4" gutterBottom>
          What Our Farmers Say
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box className="testimonial-box">
              <Typography variant="body2" paragraph>
                "Nasradamuff Farm has been a game-changer for my livestock
                farming business. The support and guidance I’ve received is
                unmatched."
              </Typography>
              <Typography variant="subtitle2">- Bolaji Hammed</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="testimonial-box">
              <Typography variant="body2" paragraph>
                "With the resources provided by Nasradamuff Farm, I’ve been able
                to scale my farming operations and increase productivity
                tenfold."
              </Typography>
              <Typography variant="subtitle2">-Bolaji Hammed</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Element name="contact">
        <Contact />
      </Element>

      <AppFooter />
    </>
  );
};

export default Home;
