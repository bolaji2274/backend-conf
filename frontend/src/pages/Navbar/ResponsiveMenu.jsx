import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {  Nav, Button } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import Logo from '../../assets/images/nasfarm-logo.ico'

const ResponsiveMenu = ({ showMenu, setShowMenu }) => {
    return (
        <div className={`${showMenu ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md`}>
            <div>
                <div className='flex items-center justify-start gap-3'>
                    {/* <FaUserCircle size={50} /> */}
                    <img
                                          src={Logo} // Nasfarm logo path
                                          alt="logo"
                                          className="w-10 inline-block rounded-full"
                                        />
                    <div>
                        <h1 className='text-green-300'>Welcome To NasFarm</h1>
                        {/* <h1 className='text-sm text-slate-500'>Premium User</h1> */}
                    </div>
                </div>
                <nav className='mt-12'>
                <ul className='flex flex-col space-y-4 text-xl'>
                    <Link to='/'><li onClick={()=>setShowMenu(false)}>Home</li></Link>
                    <Link><Nav.Link as={ScrollLink} to="about" smooth={true} duration={200} onClick={()=>setShowMenu(false)}>About</Nav.Link></Link>
                    <Link><Nav.Link as={ScrollLink} to="contact" smooth={true} duration={200} onClick={()=>setShowMenu(false)}>Contact</Nav.Link></Link>
                    <Link><Nav.Link as={ScrollLink} to="services" smooth={true} duration={200} onClick={()=>setShowMenu(false)}>Services</Nav.Link></Link>
                    <Link><Nav.Link as={ScrollLink} to="product" smooth={true} duration={200} onClick={()=>setShowMenu(false)}>Products</Nav.Link></Link>
                    <Link to='/login'><button onClick={()=>setShowMenu(false)} className='bg-green-500 text-white px-4 py-1 rounded-md'>Login</button></Link>
                    
                </ul>
                </nav>
            </div>
            <div className=''>
                <h5>
                    {/* Made with ❤️ by Bolaji */}
                </h5>
            </div>
        </div>
    )
}

export default ResponsiveMenu
