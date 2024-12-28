import React, { useContext, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
// import Logo from '../../assets/Logo.png'
import Logo from '../../assets/images/nasfarm-logo.ico'
import { ShoppingCart } from 'lucide-react'
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import {  Nav, Button } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import ResponsiveMenu from './ResponsiveMenu';
import AuthContext from '../../context/AuthContext';

// import { Shopcontext } from '../../Context/ShopContext';
// import { Shopcontext } from '../../context/ShopContext'


const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const userLogout = () => {
      logoutUser();
    //   dispatch(clearCart());
      navigate("/logout");
    };
  
    const token = localStorage.getItem("authTokens");
    let isAdmin = false;
  
    if (token) {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.is_admin;
    }
  const [showMenu, setShowMenu] = useState(false)

//   const {getTotalCartItems} = useContext(Shopcontext)

  const toggleMenu = () => {
    setShowMenu(!showMenu)   //it will toggle if the showmenu is false it will be true and if true it will be false
  }
  return (
    <div className='bg-white fixed w-full z-50 shadow-sm top-0 shadow-gray-400'>
      <div className='max-w-7xl mx-auto py-2 px-5 flex justify-between items-center'>
        {/* <Link to='/'> <img src={Logo} alt="" className='md:w-24 w-20'/></Link> */}
         <Link
                    to="/"
                    className="text-2xl font-semibold flex items-center space-x-3"
                  >
                    <img
                      src={Logo} // NAsfarm logo path
                      alt="logo"
                      className="w-10 inline-block rounded-full"
                    />
                    {/* <span>NASFARM</span> */}
                    <h2 className='text-2xl text-black'>Nas<span className='text-3xl text-green-500'>Farm</span></h2>
                  </Link>
       
        <div className='flex items-center gap-5'>
            <nav className='hidden md:block'>
                <ul className='flex items-center font-semibold text-xl gap-7'>
                    <Link to='/'><li>Home</li></Link>
                    <Link><Nav.Link as={ScrollLink} to="about" smooth={true} duration={200} className="text-blue-400">About</Nav.Link></Link>
                    <Link><Nav.Link as={ScrollLink} to="contact" smooth={true} duration={200}>Contact</Nav.Link></Link>
                    <Link><Nav.Link as={ScrollLink} to="services" smooth={true} duration={200}>Services</Nav.Link></Link>
                    <Link><Nav.Link as={ScrollLink} to="product" smooth={true} duration={200}>Products</Nav.Link></Link>

                    {/* <Link to='/login'><button className='bg-green-500 text-white px-4 py-1 rounded-md'>Login</button></Link> */}
                    <div className="ml-24">


                    {token ? (
                                  <>
                                    <Link to={isAdmin ? "/admin/dashboard" : "/customer/dashboard"}><button className='bg-green-500 text-white px-4 py-1 rounded-md'>Dashboard</button></Link>
                                    <Button onClick={userLogout} style={{ cursor: "pointer" }} variant="outline-info" className="ms-2 m-btn">Logout</Button>
                                  </>
                                ) : (
                                  <>
                                    <Button variant="outline-info" className="ms-2 m-btn" as={Link} to="/login">Login</Button>
                                    <Button variant="outline-info" className="ms-2 m-btn" as={Link} to="/register">Register</Button>
                                  </>
                                )}
                                            </div>
                </ul>
            </nav>
            {/* <Link to='/cart' className='relative w-10'>
            <ShoppingCart/> 
            <div className='bg-red-500 w-5 absolute -top-2 right-1 flex items-center justify-center rounded-full text-white'>
                {getTotalCartItems() || 0} 
                </div>
            </Link> */}
            {/* mobile hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1 onClick={toggleMenu} className='cursor-pointer transition-all md:hidden' size={30}/>
            ):(
              <HiMenuAlt3 onClick={toggleMenu} className='cursor-pointer transition-all md:hidden' size={30}/>
            )}
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu}/>
    </div>
  )
}

export default Navbar
