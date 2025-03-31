"use client";

import { technologies } from "@/constant/quizTech";
import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const categories = [
  "Top Technology",
  "Trending Technology",
  "Back-End Technology",
  "Front-End Technology",
  " Full Stack Technology",
];

// const quizzes = [
//   {
//     title: "Movies",
//     description: "Test your knowledge of classic and modern films.",
//     image:
//       "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     score: "Score: 4.5",
//   },
//   {
//     title: "TV Shows",
//     description: "How well do you know famous TV series?",
//     image:
//       "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     score: "Score: 4.8",
//   },
//   {
//     title: "Music",
//     description: "Can you guess the artist from a single lyric?",
//     image:
//       "https://images.unsplash.com/photo-1605902394069-ff2ae2430e62?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     score: "Score: 4.7",
//   },
// ];

export default function QuizSection() {
  const [activeCategory, setActiveCategory] = useState("Top Technology");

  return (
    <div className="container mx-auto p-2 lg:p-6 my-20">
      <div className=" mb-6">
        <h2 className="text-3xl font-bold ">Explore Quiz</h2>
        <p className=" text-sm text-gray-400">
          Daily comes new and exiting quizes
        </p>
      </div>
      {/* Category Tabs */}
      <div className=" hidden md:block">
        <div className=" flex space-x-3 mb-6 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                activeCategory === category
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-500 text-gray-400"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {/* Quiz Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {technologies.map((quiz, index) => (
          <div
            key={index}
            className="bg-gray-900 shadow-lg rounded-lg p-4 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 flex space-x-4 border-2 border-gray-800"
          >
            {/* <img
              src={quiz.image}
              alt={quiz.title}
              className="w-24 h-24 rounded-lg object-cover"
            /> */}
            <DotLottieReact src={quiz.image} loop autoplay />
            <div>
              <h3 className="text-lg font-semibold ">{quiz.title}</h3>
              <p className=" text-sm mt-2">{quiz.description}</p>
              <button className="mt-3 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm">
                {quiz.score}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
