"use client";
import Image from "next/image";

export const FourthPage = () => {
  return (
    <div className="pt-64 pl-80 pb-[55rem]">
      <div className="text-8xl font-medium pb-2">Grow a</div>
      <div className="text-8xl font-medium ">business.</div>
      <div className="text-2xl mb-10 pt-24">
        <div>Take business payments and engage customers with the</div>
        <div>help of a seamless checkout experience people already</div>
        <div>know and trust.</div>
      </div>

      <button className="bg-white text-black px-10 py-4 rounded-[20rem] font-bold text-xl border-black border-2 shadow-lg shadow-green-500 transition-transform hover:scale-105 ease-in-out">
        Learn more
      </button>

      <div className="flex flex-row h-2 items-start mt-16">
        <div>
          <Image
            alt="left"
            src="/4left.png"
            width={500}
            height={100}
            className="mr-40 mt-20 transition-transform hover:scale-105 ease-in-out duration-300"
          ></Image>
        </div>
        <div>
          <Image
            alt="right"
            src="/4right.png"
            width={500}
            height={100}
            className="relative -top-10 transition-transform hover:scale-105 ease-in-out duration-300"
          ></Image>
        </div>
      </div>
    </div>
  );
};
