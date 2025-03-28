import React from "react";
import js from "../../../public/js.png";
import reactjs from "../../../public/react-js-icon.png";
import nextjs from "../../../public/next-js.png";
import modejs from "../../../public/Nodejs.png";
import mongo from "../../../public/mongo.png";
import dsa from "../../../public/react-native.png";
import Image from "next/image";

const cards = [
  {
    id: 1,
    title: "Card 1",
    description: "This is the first card.",
    image: js,
  },
  {
    id: 2,
    title: "Card 2",
    description: "This is the second card.",
    image: reactjs,
  },
  {
    id: 3,
    title: "Card 3",
    description: "This is the third card.",
    image: nextjs,
  },
  {
    id: 4,
    title: "Card 4",
    description: "This is the fourth card.",
    image: modejs,
  },
  {
    id: 5,
    title: "Card 5",
    description: "This is the fifth card.",
    image: mongo,
  },
  {
    id: 6,
    title: "Card 6",
    description: "This is the sixth card.",
    image: dsa,
  },
];

function Card({ title, description, image }: any) {
  return (
    <div className=" w-full shadow-lg rounded-xl bg-white p-2 cursor-pointer">
      <Image
        alt="image"
        height={100}
        width={100}
        src={image}
        className=" w-full h-full rounded-xl"
      />
    </div>
  );
}

export default function HorizontalCards() {
  return (
    <div className=" my-16">
      <h1 className=" font-bold text-2xl">Trending Technolgy Interviews</h1>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 my-5">
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
}
