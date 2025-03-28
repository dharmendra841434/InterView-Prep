"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  "JavaScript",
  "TypeScript",
  "MongoDB",
  "ReactJs",
  "React-Native",
  "Node.js",
];

export default function DynamicText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" w-full md:w-[60%] px-2 ">
      <div className=" hidden md:block">
        <h1 className="  relative md:text-[3rem] font-medium leading-none  lg:text-[5rem] text-gray-200 ">
          A New Way To Learn{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={languages[currentIndex]}
              className="absolute w-full text-yellow-400 font-bold md:text-[3rem] lg:text-[5rem] ml-3"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {languages[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </h1>
      </div>
      <div className=" md:hidden">
        <h1 className="  text-[2.3rem]   text-gray-200 ">A New Way To Learn</h1>
        <div className=" flex flex-row w-full">
          <h3 className="  text-5xl   text-gray-200 "> </h3>
          <AnimatePresence mode="wait">
            <motion.span
              key={languages[currentIndex]}
              className="absolute w-[90%] text-yellow-400 font-bold text-[2.3rem]  "
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {languages[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-16 md:mt-4  text-gray-300 w-[85%] lg:text-xl ">
        Dev Cracker is the best platform to help you enhance your skills, expand
        your knowledge, and prepare for technical interviews.
      </p>
      <button className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition">
        Explore Now
      </button>
    </div>
  );
}
