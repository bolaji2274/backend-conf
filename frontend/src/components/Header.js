import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaXmark, FaBars } from "react-icons/fa6";
import logo from "../assets/images/nasfarm-logo.jpg";



const Header = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Toggle menu option
  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Fixed cleanup
    };
  }, []);

  // Nav items array
  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Products", path: "/products" },
    { link: "Contact", path: "/contact" },
    { link: "Services", path: "/services" },
    { link: "Services", path: "/services" },
    { link: "Services", path: "/services" },
  ];

  return (
    <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0 z-50">
      <nav
        className={`py-4 lg:px-14 px-4 ${
          isSticky
            ? "sticky top-0 left-0 right-0 border-b bg-white duration-300"
            : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-semibold flex items-center space-x-3"
          >
            <img
              src={logo} // Replace with your logo path
              alt="logo"
              className="w-10 inline-block rounded-full"
            />
            <span>NASFARM</span>
          </Link>

          {/* Nav items for large devices */}
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link
                to={path}
                key={path}
                className="block text-base text-[#18191f] hover:text-[#49dc7c]"
              >
                {link}
              </Link>
            ))}
          </ul>

          {/* Buttons for large devices */}
          <div className="space-x-12 hidden lg:flex items-center">
            <Link
              to="/login"
              className="hidden lg:flex items-center text-[#49dc7c] hover:text-gray-700"
            >
              Login
            </Link>
            <button className="bg-green-500 text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutral-500">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-neutral-500 focus:outline-none focus:text-gray-500"
            >
              {isMenuOpened ? (
                <FaXmark className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Nav items for mobile devices */}
        <div
          className={`space-y-4 px-4 pt-4 pb-4 mt-16 bg-green-500 ${
            isMenuOpened ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          
          {navItems.map(({ link, path }) => (
            <Link
              to={path}
              key={path}
              className="block text-base text-white hover:text-[#49dc7c]"
            >
              {link}
            </Link>
          ))}
          
        </div>
      </nav>
    </header>
  );
};

export default Header;
