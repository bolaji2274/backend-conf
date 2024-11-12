import React from 'react';
import { Link } from 'react-router-dom'; // Use Link to enable routing
import chicken3 from '../assets/images/chicken-3.jpg';

function About() {
  return (
    <div>
      {/* About Section */}
      <section className="about_section layout_padding bg-gray-100 py-12">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 px-0">
              <div className="img-box">
                <img src={chicken3} className="box_img" alt="about img" />
              </div>
            </div>
            <div className="col-md-6 offset-md-1">
              <div className="detail-box pr-md-2">
                <div className="heading_container mb-4">
                  <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
                </div>
                <p className="text-gray-700 text-lg mb-4">
                  At Nasradamuff Farm and Agro-Allied Ventures, we specialize in livestock farming, inventory management, and providing farmers with the resources they need to succeed. With decades of experience in the agro-industry, we ensure that our clients get the best livestock, feed, and farming support.
                </p>
                <p className="text-gray-700 mb-4">
                  Our mission is to empower farmers through sustainable practices, quality livestock, and transparent profit-sharing models. We believe in making a positive impact on the agricultural industry by supporting every farmer's unique needs.
                </p>
                {/* Link to scroll to full About Us section */}
                <Link to="/about#full-description" className="text-blue-600 hover:underline font-semibold">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="full-description" className="mission_vision_section py-16 px-8 md:px-16 text-center bg-white">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Our Mission & Vision</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          Nasradamuff Farm is dedicated to driving growth and sustainability in the agricultural sector. We aim to bridge the gap between modern farming techniques and traditional practices, making high-quality livestock and resources accessible to all.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          We envision a future where every farmer, big or small, can rely on our support to overcome challenges, improve yields, and participate in profit-sharing that benefits their livelihoods and communities.
        </p>
      </section>

     

      {/* Call-to-Action Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-semibold mb-4">Partner with NASFARM Today</h2>
        <p className="text-lg mb-6">
          Ready to grow your farm? Connect with us and start your journey to success.
        </p>
        <Link to="/contact" className="px-6 py-3 bg-white text-blue-600 font-bold rounded-md hover:bg-blue-700 transition duration-300">
          Contact Us
        </Link>
      </section>
    </div>
  );
}

export default About;
