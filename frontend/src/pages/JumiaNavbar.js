import React, { useState } from 'react';
import { ShoppingCart, User, Heart, Menu, X } from 'lucide-react';

const JumiaNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-orange-500 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
          Jumia
        </a>

        {/* Search bar */}
        <div className="hidden md:flex flex-grow mx-4">  
          <input
            type="text"
            placeholder="Search products, brands, and categories..."
            className="w-full px-4 py-2 rounded-l-md text-gray-900"
          />
          <button className="px-4 py-2 bg-black text-white rounded-r-md">
            Search
          </button>
        </div>

        {/* Icons and account/cart links */}
        <div className="flex items-center space-x-4">
          <a href="/account" className="hidden md:flex items-center space-x-2 hover:text-gray-300">
            <User className="w-5 h-5" />
            <span>Account</span>
          </a>
          <a href="/wishlist" className="hidden md:flex items-center space-x-2 hover:text-gray-300">
            <Heart className="w-5 h-5" />
            <span>Wishlist</span>
          </a>
          <a href="/cart" className="hidden md:flex items-center space-x-2 hover:text-gray-300">
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
          </a>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-orange-600 mt-2 p-4 space-y-4">
          <a href="/account" className="block hover:text-gray-300">
            Account
          </a>
          <a href="/wishlist" className="block hover:text-gray-300">
            Wishlist
          </a>
          <a href="/cart" className="block hover:text-gray-300">
            Cart
          </a>
          <input
            type="text"
            placeholder="Search products, brands, and categories..."
            className="w-full px-4 py-2 rounded-md text-gray-900 mt-2"
          />
        </div>
      )}
    </nav>
  );
};

export default JumiaNavbar;
