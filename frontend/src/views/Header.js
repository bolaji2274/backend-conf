import React, { useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../context/AuthContext";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/images/nasfarm-logo.jpg";
import "../styles/nav.css";
import "../styles/Navbar.css";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const MyNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const token = localStorage.getItem("authTokens");
  let isAdmin = false;

  if (token) {
    const decodedToken = jwtDecode(token);
    isAdmin = decodedToken.is_admin;
  }

  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar expanded={expanded} expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Link to="/">
          <img
            src={logo}
            alt="Nasfarm Logo"
            style={{
              width: "80px",
              height: "80px",
              padding: "7px",
              borderRadius: "50%",
            }}
          />
        </Link>
        <Navbar.Toggle onClick={handleToggle} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className={`nav-list ${expanded ? 'active' : ''}`}>
            <div className="nav-center">
              <li><Link to="/" smooth={true} duration={200}>Home</Link></li>
              <li><Nav.Link as={ScrollLink} to="about" smooth={true} duration={200}>About</Nav.Link></li>
              <li><Nav.Link as={ScrollLink} to="contact" smooth={true} duration={200}>Contact</Nav.Link></li>
              <li><Nav.Link as={ScrollLink} to="services" smooth={true} duration={200}>Services</Nav.Link></li>
              <li><Nav.Link as={ScrollLink} to="product" smooth={true} duration={200}>Products</Nav.Link></li>
            </div>
            <div className="nav-right text-white">
              {token ? (
                <>
                  <li><Link to={isAdmin ? "/admin/dashboard" : "/customer/dashboard"}>Dashboard</Link></li>
                  <li><Link onClick={logoutUser} style={{ cursor: "pointer" }}>Logout</Link></li>
                </>
              ) : (
                <>
                  <Button variant="outline-info" className="ms-2" as={Link} to="/login">Login</Button>
                  <Button variant="outline-info" className="ms-2" as={Link} to="/register">Register</Button>
                </>
              )}
              <li className="cart-icon-container">
                <Link to="/cart" className="cart-icon">
                  <FaShoppingCart size={24} color="white" />
                  {cartItemCount > 0 && (
                    <span className="cart-badge">{cartItemCount}</span>
                  )}
                </Link>
              </li>
            </div>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
