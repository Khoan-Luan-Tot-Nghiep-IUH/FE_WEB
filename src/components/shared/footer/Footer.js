import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <p>Register for free</p>
          <Link to="/register" className="mt-2 inline-block px-4 py-2 border border-gray-300 text-gray-300 rounded-full hover:bg-gray-700 transition duration-300">
            SIGN UP!
          </Link>
        </div>
        
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            <FaFacebookF className="text-xl" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            <FaTwitter className="text-xl" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            <FaGoogle className="text-xl" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            <FaInstagram className="text-xl" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            <FaLinkedinIn className="text-xl" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            <FaPinterestP className="text-xl" />
          </a>
        </div>

        <div className="text-gray-500 text-sm mt-4">
          © 2023 Copyright: VeXeOnline
        </div>
      </div>
    </footer>
  );
};

export default Footer;
