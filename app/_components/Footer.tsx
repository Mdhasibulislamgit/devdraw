import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src="/logo.png" alt="Logo" className="w-32 h-32 mx-auto md:mx-0" />
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
            <a href="/about" className="text-white hover:text-gray-400 text-center md:text-left" title="About Us">About</a>
            <a href="/services" className="text-white hover:text-gray-400 text-center md:text-left" title="Our Services">Services</a>
            <a href="/contact" className="text-white hover:text-gray-400 text-center md:text-left" title="Contact Us">Contact</a>
            <a href="/privacy" className="text-white hover:text-gray-400 text-center md:text-left" title="Privacy Policy">Privacy Policy</a>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400" title="Facebook">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400" title="Twitter">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400" title="Instagram">
              <Instagram size={24} />
            </a>
          </div>
        </div>
        <div className="text-center mt-4 text-sm">
          &copy; {new Date().getFullYear()} DevDraw All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;