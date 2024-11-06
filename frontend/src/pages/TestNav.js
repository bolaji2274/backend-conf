import React, { useState } from "react";
import { Home, ShoppingCart, User, Menu, X, Box } from "lucide-react";

const TestNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <a href="/" className="flex items-center">
            <span className="text-blue-500">Shop</span>Zone
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-500">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </a>
          <a href="/products" className="flex items-center space-x-1 text-gray-700 hover:text-blue-500">
            <Box className="h-5 w-5" />
            <span>Products</span>
          </a>
          <a href="/categories" className="flex items-center space-x-1 text-gray-700 hover:text-blue-500">
            <Box className="h-5 w-5" />
            <span>Categories</span>
          </a>
          <a href="/cart" className="flex items-center space-x-1 text-gray-700 hover:text-blue-500">
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
          </a>
          <a href="/account" className="flex items-center space-x-1 text-gray-700 hover:text-blue-500">
            <User className="h-5 w-5" />
            <span>Account</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-800 hover:text-blue-500 focus:outline-none">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-2 space-y-2">
            <a href="/" className="block text-gray-700 hover:text-blue-500 flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </a>
            <a href="/products" className="block text-gray-700 hover:text-blue-500 flex items-center space-x-2">
              <Box className="h-5 w-5" />
              <span>Products</span>
            </a>
            <a href="/categories" className="block text-gray-700 hover:text-blue-500 flex items-center space-x-2">
              <Box className="h-5 w-5" />
              <span>Categories</span>
            </a>
            <a href="/cart" className="block text-gray-700 hover:text-blue-500 flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
            </a>
            <a href="/account" className="block text-gray-700 hover:text-blue-500 flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Account</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TestNav;
