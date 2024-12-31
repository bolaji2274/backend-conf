import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";

function AppFooter() {
  return (
    <div>
      <>
        
        <section className="info_section">
          <div className="container">
            <div className="info_top">
              <div className="row">
                <div className="col-md-3 ">
                  <Link to='/' className="navbar-brand">
                    Nasradamuff
                  </Link>
                </div>
                <div className="col-md-5 ">
                  <div className="info_contact">
                    <a href="">
                      <i className="fa fa-map-marker" aria-hidden="true" />
                      <span>Location</span>
                    </a>
                    <a href="">
                      <i className="fa fa-phone" aria-hidden="true" />
                      <span>+234 91 55 11 37 97</span>
                    </a>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className="social_box">
                    <a href="">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                    <a href="">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                    <a href="">
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </a>
                    <a href="">
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="info_bottom">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="info_detail">
                    <h5>Company</h5>
                    <p>
                      Nasradamuff Farm offers high-quality livestock, including
                      broilers, layers, fish, and other agricultural animals,
                      tailored to meet the specific needs of farmers. Our
                      livestock is raised under optimal conditions, ensuring
                      that farmers receive healthy animals ready for farming.
                      Farmers can apply for livestock directly through our
                      platform, selecting the quantity, type of feed, and
                      required drugs for the animals.
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="info_form">
                    <h5>NEWSLETTER</h5>
                    <form action="">
                      <input type="text" placeholder="Enter Your Email" />
                      <button type="submit">Subscribe</button>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="info_detail">
                    <h5>Services</h5>
                    <p>
                      Through our unique profit-sharing model, farmers have
                      access to livestock without the need for immediate
                      capital. We partner with farmers by providing livestock
                      and other essential resources, and in return, we share
                      profits at the end of the farming cycle. This reduces
                      financial risk for the farmers while allowing them to
                      focus on growing their business. The profit-sharing ratio
                      is determined based on factors such as farming experience
                      and the farmer's capacity.
                    </p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="">
                    <h5>Useful links</h5>
                    <ul className="info_menu">
                      <li>
                        <Link to='/'>Home</Link>
                      </li>
                      <li>
                        <Nav.Link as={ScrollLink} to="about">About</Nav.Link>
                      </li>
                      <li>
                        <Nav.Link as={ScrollLink} to="services">Services</Nav.Link>
                      </li>
                      <li>
                        <Nav.Link as={ScrollLink} to="product">Product</Nav.Link>
                      </li>
                      <li className="mb-0">
                        <Nav.Link as={ScrollLink} to="Contact">Contact Us</Nav.Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end info_section */}
        {/* footer section */}
        <footer className="footer_section">
          <div className="container">
            <p>
              © <span id="displayYear" /> All Rights Reserved By 
              <a href="https://github.com/bolaji2274/"> Bolaji Dev</a>
            </p>
          </div>
        </footer>
        {/* footer section */}
      </>
    </div>
  );
}

export default AppFooter;
