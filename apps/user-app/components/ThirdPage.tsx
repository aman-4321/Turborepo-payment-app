"use client";
import Image from "next/image";

export const ThirdPage = () => {
  return (
    <div className="flex flex-row items-start p-10 pl-64">
      <div className="mr-24">
        <Image
          alt="third"
          src="/third.png"
          width={600}
          height={200}
          className="transition-transform duration-300 hover:scale-105 ease-in-out"
        />
      </div>
      <div>
        <div className="text-6xl pt-20 font-medium">Shop your favorite</div>
        <div className="text-6xl font-medium pt-5">brands</div>
        <div className="mt-10 text-2xl font-light">
          Just like sending money to friends, you can use
          <div>Paytm to checkout at some of your favorite</div>
          <div>brands in-stores and online. Now getting repaid for</div>
          last night’s dinner can cover this morning’s latte.
        </div>
        <div className="text-2xl mt-4 font-light">
          Digital gift cards are also available to send for last-
          <div>minute gifts, special occasions, or just saying</div>
          thanks.
        </div>
        <div>
          <a className="text-blue-600 mt-1 inline-block text-2xl mb-10">
            Find out how.*
          </a>
        </div>
        <button className="bg-white text-black px-10 py-4 rounded-[20rem] font-bold text-xl border-black border-2 shadow-lg shadow-yellow-500 transition-transform hover:scale-105 ease-in-out mt-6">
          Learn more
        </button>
      </div>
    </div>
  );
};
