import ArticlesSection from "@/components/ArticlesSection";
import HorizontalCards from "@/components/common/HorizontalCards";
import HeroSection from "@/components/HeroSection";
import QuizSection from "@/components/QuizSection";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HorizontalCards />
      <div className=" my-12">
        <h3 className=" font-bold text-2xl">
          Try out Our JavaScript Code Editor
        </h3>
        <div className="relative w-full flex justify-center items-center mb-20">
          {/* Image */}
          <Image
            src="/editor.png"
            alt={"alt"}
            width={600}
            height={400}
            className="rounded-lg w-[55rem] h-[30rem]"
          />

          {/* Overlay Effect (Always Visible) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-400  opacity-30 rounded-lg"></div>
        </div>
      </div>
      <QuizSection />
      <ArticlesSection />
    </div>
  );
};

export default Home;
