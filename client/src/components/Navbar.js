import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import authService from '../services/authService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, isGuard } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-white font-semibold' : 'text-white/80 hover:text-white';
  };
  
  const handleLogout = async () => {
    try {
      logout();
      await authService.logout();
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };
  
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg w-full">
      <div className="w-full px-0">
        <div className="flex justify-between h-20">
          {/* Logo - Extreme Left */}
          <div className="flex items-center pl-0">
            <Link to="/" className="flex items-center">
              <div className="relative h-16 w-16 flex items-center justify-center">
                <img
                  className="h-14 w-14 object-contain rounded-full shadow-md border-2 border-white/20"
                  src="/pict_logo.jpeg"
                  alt="PICT Logo"
                />
              </div>
              <span className="ml-2 text-xl font-bold text-white">Lost & Found - PICT College</span>
            </Link>
          </div>
          
          {/* Desktop menu - Extreme Right */}
          <div className="hidden sm:flex sm:items-center pr-2 sm:pr-6">
            <div className="flex space-x-6">
              <Link to="/" className={`px-4 py-2 rounded-md text-base font-medium ${isActive('/')} transition-all duration-300`}>
                Home
              </Link>
              <Link to="/lost-items" className={`px-4 py-2 rounded-md text-base font-medium ${isActive('/lost-items')} transition-all duration-300`}>
                Lost Items
              </Link>
              <Link to="/about" className={`px-4 py-2 rounded-md text-base font-medium ${isActive('/about')} transition-all duration-300`}>
                About Us
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to={isGuard ? "/guard-dashboard" : "/dashboard"} 
                    className={`px-4 py-2 rounded-md text-base font-medium ${isActive('/guard-dashboard') || isActive('/dashboard')} transition-all duration-300`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ml-2 px-4 py-2 rounded-md text-base font-medium text-white bg-white/20 hover:bg-white/30 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/contact" className={`px-4 py-2 rounded-md text-base font-medium ${isActive('/contact')} transition-all duration-300`}>
                    Contact Us
                  </Link>
                  <Link
                    to="/login"
                    className="ml-2 px-4 py-2 rounded-md text-base font-medium text-white bg-white/20 hover:bg-white/30 transition-all duration-300"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden pr-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-7 w-7`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-7 w-7`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')}`}
          >
            Home
          </Link>
          <Link
            to="/lost-items"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/lost-items')}`}
          >
            Lost Items
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about')}`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contact')}`}
          >
            Contact Us
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to={isGuard ? "/guard-dashboard" : "/dashboard"}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/guard-dashboard') || isActive('/dashboard')}`}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white/80 hover:text-white hover:bg-white/10"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-white/80 hover:text-white hover:bg-white/10"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;