import React, { useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/CartSlice';
import '../styles/Navbar.css';
import logo from "../assets/images/nasfarm-logo.jpg";
import AuthContext from '../context/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';
import { MenuIcon } from 'lucide-react';

const Navbars = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (isOpen) {
      setIsOpen(false); // Close the menu when scrolling starts
    }
  };

  useEffect(() => {
    const closeNavbarOnClickOutside = (e) => {
      if (isOpen && !e.target.closest(".navbar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeNavbarOnClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener("mousedown", closeNavbarOnClickOutside);
      window.removeEventListener('scroll', handleScroll); // Clean up on component unmount
    };
  }, [isOpen]);

  const userLogout = () => {
    logoutUser();
    dispatch(clearCart());
    navigate("/logout");
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
      <div className="container cont" style={{ zIndex: isOpen ? 10 : 1 }}>
        <div className="brand">
           <Link
            to="/"
            className="text-2xl font-semibold flex items-center space-x-3"
          >
            <img
              src={logo} // Replace with your logo path
              alt="logo"
              className="w-10 inline-block rounded-full"
            />
            {/* <span>NASFARM</span> */}
            <h2 className='text-2xl text-white'>Nas<span className='text-3xl text-green-500'>Farm</span></h2>
          </Link>
        </div>
          {/* This is the link to the cart item  */}
        {/* <li className="cart-icon-container lg:ml-4 md:ml-4">
          <Link to="/cart" className="cart-icon lg:ml-4 md:ml-4">
            <FaShoppingCart size={24} color="white" className='lg:ml-4 md:ml-4'/>
            {cartItemCount > 0 && (
              <span className="cart-badge rounded-sm">{cartItemCount}</span>
            )}
          </Link>
        </li> */}
       <div className="nav-right text-white">
            {token ? (
              <>
                <li><Link to={isAdmin ? "/admin/dashboard" : "/customer/dashboard"}>Dashboard</Link></li>
                <li><Link onClick={userLogout} style={{ cursor: "pointer" }}>Logout</Link></li>
              </>
            ) : (
              <>
                <Button variant="outline-info" className="ms-2 m-btn text-green-500" as={Link} to="/login">Login</Button>
                {/* <Button variant="outline-info" className="ms-2 m-btn" as={Link} to="/register">Register</Button> */}
              </>
            )}
          </div>
      </div>
    </nav>
  );
};

export default Navbars;
