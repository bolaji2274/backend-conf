import React from 'react';
import { Link } from 'react-router-dom'; // Use Link to enable routing
import chicken3 from '../assets/images/chicken-3.jpg';

function About() {
  return (
    <div>
      <section className="about_section layout_padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 px-0">
              <div className="img-box">
                <img src={chicken3} className="box_img" alt="about img" />
              </div>
            </div>
            <div className="col-md-5 offset-md-1">
              <div className="detail-box pr-md-2">
                <div className="heading_container">
                  <h2>About Us</h2>
                </div>
                <p className="detail_p_mt">
                  At Nasradamuff Farm and Agro-Allied Ventures, we specialize in livestock farming,
                  inventory management, and providing farmers with the resources they need to succeed.
                  With decades of experience in the agro-industry, we ensure that our clients get the
                  best livestock, feed, and farming support.
                </p>
                {/* Link to scroll to full About Us section */}
                <Link to="/about#full-description" className="text-blue-600 hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
