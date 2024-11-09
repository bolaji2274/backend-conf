import React, { useState, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import { useSelector } from 'react-redux';
import '../styles/Navbar.css';
import logo from "../assets/images/nasfarm-logo.jpg";
import AuthContext from '../context/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';
import { ShoppingCart } from 'lucide-react';
import { ToggleLeftIcon } from 'lucide-react';
import { MenuIcon } from 'lucide-react';


const Navbars = () => {
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
            {/* <img
              style={{
                width: "24px",
                height: "24px",
                padding: "7px",
                borderRadius: "50%",
              }}
              src={logo}
              alt="Nasfarm Logo"
            /> */}
            <h2 className='text-2xl text-white'>Nas<span className='text-3xl text-green-500'>Farm</span></h2>
          </Link>
        </div>
        {/* <button className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200">
             <FaShoppingCart size={24} color="white" />
            </button> */}
            <li className="cart-icon-container lg:ml-4 md:ml-4">
              <Link to="/cart" className="cart-icon lg:ml-4 md:ml-4">
                <FaShoppingCart size={24} color="white" className='lg:ml-4 md:ml-4'/>
                {cartItemCount > 0 && (
                  <span className="cart-badge rounded-">{cartItemCount}</span>
                )}
              </Link>
            </li>
        <div className="toggle" onClick={toggleNavbar}>
          {/* &#9776; */}
          <MenuIcon />
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
                <Button variant="outline-info" className="ms-2 m-btn" as={Link} to="/login">Login</Button>
                <Button variant="outline-info" className="ms-2 m-btn" as={Link} to="/register">Register</Button>
              </>
            )}
            {/* <li className="cart-icon-container">
              <Link to="/cart" className="cart-icon">
                <FaShoppingCart size={24} color="white" />
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </Link>
            </li> */}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbars;
