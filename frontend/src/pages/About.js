import React from "react";
import { motion } from "framer-motion";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import Slider from "react-slick";

import chicken3 from "../assets/nasImages/chicks_farm.jpg";
import broilersImage from "../assets/nasImages/broilers_bg.jpg";
import fishingImage from "../assets/nasImages/broiler_multiple.jpg";
import cattleImage from "../assets/nasImages/chicken_bg.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function About() {
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {/* About Section */}
      <section className="about_section layout_padding bg-gray-100 py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-5/12">
              <div className="img-box">
                <img
                  src={broilersImage}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  alt="about img"
                />
              </div>
            </div>
            <div className="md:w-7/12 md:pl-8">
              <div className="detail-box">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  About Us
                </h2>
                <p className="text-gray-700 text-lg mb-4">
                  At Nasradamuff Farm and Agro-Allied Ventures, we specialize in
                  livestock farming, inventory management, and providing farmers
                  with the resources they need to succeed. With decades of
                  experience in the agro-industry, we ensure that our clients
                  get the best livestock, feed, and farming support.
                </p>
                <p className="text-gray-700 mb-4">
                  Our mission is to empower farmers through sustainable
                  practices, quality livestock, and transparent profit-sharing
                  models. We believe in making a positive impact on the
                  agricultural industry by supporting every farmer's unique
                  needs.
                  Let work together for making a livestock farm a success.
                </p>
                <Link
                  to="/about#full-description"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Image Carousel Section */}
      <section className="carousel_section py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
            Our Livestock Services
          </h2>
          <Slider {...sliderSettings} className="livestock-slider">
            <div className="px-4">
              <motion.img
                src={chicken3}
                alt="Chicken"
                className="w-full h-64 object-cover rounded-lg shadow-md"
                whileHover={{ scale: 1.1 }}
              />
            </div>
            <div className="px-4">
              <motion.img
                src={broilersImage}
                alt="Broilers"
                className="w-full h-64 object-cover rounded-lg shadow-md"
                whileHover={{ scale: 1.1 }}
              />
            </div>
            <div className="px-4">
              <motion.img
                src={fishingImage}
                alt="Fishing"
                className="w-full h-64 object-cover rounded-lg shadow-md"
                whileHover={{ scale: 1.1 }}
              />
            </div>
            <div className="px-4">
              <motion.img
                src={cattleImage}
                alt="Cattle"
                className="w-full h-64 object-cover rounded-lg shadow-md"
                whileHover={{ scale: 1.1 }}
              />
            </div>
          </Slider>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        id="full-description"
        className="mission_vision_section py-16 px-8 md:px-16 text-center bg-white"
      >
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">
          Our Mission & Vision
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          Nasradamuff Farm is dedicated to driving growth and sustainability in
          the agricultural sector. We aim to bridge the gap between modern
          farming techniques and traditional practices, making high-quality
          livestock and resources accessible to all.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          We envision a future where every farmer, big or small, can rely on our
          support to overcome challenges, improve yields, and participate in
          profit-sharing that benefits their livelihoods and communities.
        </p>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-semibold mb-4">Partner with NASFARM Today</h2>
        <p className="text-lg mb-6">
          Ready to grow your farm? Connect with us and start your journey to success.
        </p>
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
}

export default About;
