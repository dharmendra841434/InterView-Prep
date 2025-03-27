import { motion } from "motion/react";

import React from "react";

const CustomFooter = () => {
  return (
    <footer className=" text-white py-6 px-4">
      <div className=" flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Logo and Address */}
        <div
        // initial={{ opacity: 0, y: -20 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.5 }}
        >
          <>
            <h1 className="text-xl md:text-3xl font-bold">Dev Cracker</h1>
            <p className="text-gray-400 font-light text-xs md:text-base">
              Crack your dream job with us
            </p>
          </>
          <p className="text-sm text-gray-400 mt-2">
            1234 Street Name, City, Country
          </p>
          <p className="text-sm text-gray-400">Email: contact@mycompany.com</p>
        </div>

        {/* Navigation */}
        <ul
          className="flex space-x-6 mt-4 md:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <li>
            <a href="#" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Contact
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <p
          className="text-sm mt-4 md:mt-0 self-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default CustomFooter;
