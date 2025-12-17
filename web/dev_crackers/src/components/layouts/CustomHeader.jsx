"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FiMenu, FiX } from "react-icons/fi";
import navLinks from "@/constant/navLinks";
import { useRouter } from "next/navigation";

export default function CustomHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useRouter();

  return (
    <header className="  md:p-4  text-white relative  ">
      <div className="  bg-[#0f0919] mx-auto flex justify-between items-center fixed top-0 z-50 left-0 right-0 md:px-[2%] xl:px-[10%]  bg-primary ">
        {/* Logo */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4 p-3 cursor-pointer"
          onClick={() => navigate.push("/")}
        >
          <img
            src="/logo1.webp"
            className=" w-14 h-14 md:h-20 md:w-20"
            alt="Logo"
          />
          <div>
            <h1 className="text-xl md:text-3xl font-bold">Dev Cracker</h1>
            <p className="text-gray-400 font-light text-xs md:text-base">
              Platform for Developers
            </p>
          </div>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.button
          initial={{ y: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:hidden text-gray-400 hover:text-white mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </motion.button>

        {/* Navigation */}
        <nav
          className={`absolute md:relative top-0 right-0 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent md:block ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 text-center md:text-left p-4 md:p-0">
            {navLinks.map((item, index) => (
              <motion.li
                key={index}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                // whileHover={{ y: -15, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                onClick={() => {
                  navigate.push(item?.path?.toLocaleLowerCase());
                }}
                className="text-gray-300 hover:text-gray-200 cursor-pointer transition-all py-2 md:py-0"
              >
                {item.title}
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
