import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import slide1 from "../../../public/reactjs.webp";
import slide2 from "../../../public/javascript.webp";
import slide3 from "../../../public/backend.webp";
import slide4 from "../../../public/slide4.jpg";
import slide5 from "../../../public/slide5.jpg";

const slides = [slide1, slide2, slide3];

const CustomCarousel = () => {
  return (
    <div className=" w-full flex flex-col items-center my-10">
      <div className=" flex flex-col w-full lg:w-[90%] overflow-hidden rounded-2xl    ">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          showArrows={false}
          interval={3000}
          transitionTime={500}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className=" h-[10rem] lg:h-[15rem]  flex items-center justify-center text-xl font-bold text-blue-500 "
            >
              <img src={slide} className=" w-full h-full" />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CustomCarousel;
