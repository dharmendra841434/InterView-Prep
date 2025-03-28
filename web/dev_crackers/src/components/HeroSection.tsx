import DynamicText from "./DynamicText";

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center w-full md:my-16 md:mb-32 lg:my-5 lg:mb-24   ">
      {/* Left Side Text */}
      <DynamicText />
      {/* Right Side Image */}
      <div className="relative mt-10 md:mt-0 w-full md:w-[35%]  md:px-0  flex justify-center   ">
        <img
          src="/hero.webp"
          alt="Student Learning"
          className="w-64 md:w-[30rem] rounded-lg shadow-lg object-cover"
        />
      </div>
    </div>
  );
}
