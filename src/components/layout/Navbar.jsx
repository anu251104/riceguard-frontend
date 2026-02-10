import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, User, History, Phone, LogIn } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Detect Now', path: '/detect', icon: Leaf },
    { name: 'History', path: '/history', icon: History },
    { name: 'Contact Us', path: '/contact', icon: Phone },
    // { name: 'Admin', path: '/admin/messages', icon: Phone },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">RiceGuard AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.icon && <link.icon size={16} />}
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 ml-4 border-l border-gray-200 dark:border-gray-700 pl-4">
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 font-medium text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.icon && <link.icon size={18} />}
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-800 mt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
