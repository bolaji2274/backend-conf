import React, { useState, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import { useSelector } from 'react-redux';
import '../styles/Navbar.css';
import logo from "../assets/images/nasfarm-logo.jpg";
import AuthContext from '../context/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
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
    <nav className="navbar">
      <div className="container cont">
        <div className="brand">
          <Link to="/">
            <img
              style={{
                width: "80px",
                height: "80px",
                padding: "7px",
                borderRadius: "50%",
              }}
              src={logo}
              alt="Nasfarm Logo"
            />
          </Link>
        </div>
        <div className="toggle" onClick={toggleNavbar}>
          &#9776;
        </div>
        <ul className={`nav-list ${isOpen ? 'active' : ''}`}>
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
      </div>
    </nav>
  );
};

export default Navbar;
