import React from "react";

import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import { Container, Typography, Grid, Button, Box } from "@mui/material";
// import Grid from '@mui/material/Unstable_Grid2';
import chicken from "../assets/images/chicken-coop.jpg"; // Replace with the path to your hero image
import "./Home.css"; // Custom CSS for extra styling
import Footer from "./Footer";
// import Navbar from "../views/Navbar";
// import Header from "../views/Header";
import About from "../pages/About.js";
import AppFooter from "./AppFooter.js";
import Contact from "./Contact.js";
import Services from "./Services.js";
import Nav from "./Nav.js";
import ProductList from "./Product.js";
import AboutUsPage from "./AboutUsPage.js";
import HeroCarousel from "./HeroCarousel.js";

// import heroImage from '../assets/tabs/1.png'
// import teamImage from '../assets/tabs/2.png'
// import servicesImage from '../assets/tabs/3.png'

import AddProductForm from "../products/AddProductForm.js";
import Testimonials from "./Testimonials.js";
import Team from "./Team.js";
import Header from '../components/Header.js'
import Navbar from './Navbar/Navbar.jsx'

import AdminContactMessages from "../components/AdminContactMessage.js";

const Home = () => {
  return (
    <>
      {/* <Nav /> */}
      <Navbar />
        {/* <Header /> */}
      <HeroCarousel />
      {/* <AdminContactMessages /> */}
    
      <AboutUsPage />

      <Element name="product">
        <ProductList />
      </Element>



      {/* Introduction Section */}
      <Container maxWidth="lg" className="intro-section">
        <Element name="about">
          <About />
        </Element>{" "}

      </Container>
      {/* // Continue Home.js */}

      {/* Services Section */}
      <Element name="services">
        <Services />
      </Element>
      {/* Testimonials Section */}
          <Testimonials />
      <Team />

      <Element name="contact">
        <Contact />
      </Element>

      <AppFooter />
    </>
  );
};

export default Home;
