import Image from "next/image";

const FirstSection = () => {
  return (
    <div className="pl-32 pr-[25rem] w-full pt-10">
      <div className="bg-blue-100 h-[56rem] rounded-[2rem]">
        <div className="pl-48 font-medium text-8xl pt-40">
          <div>Fast, safe,</div>
          <div className="pt-1 pb-1">social</div>
          <div>payments</div>
        </div>
        <div className="pl-48 text-2xl pt-10">
          <div>Pay, get paid, grow a business, and more. Join</div>
          <div>the tens of millions of people on Venmo.</div>
        </div>
        <div className="pl-[50rem] absolute pr-32 top-80 transition-transform hover:scale-105 ease-in-out duration-300">
          <Image
            src="/home.png"
            alt="first-section"
            width={900}
            height={90}
          ></Image>
        </div>
        <button className="ml-48 mt-20 bg-blue-500 text-white px-14 py-4 rounded-[20rem] font-bold text-xl shadow-2xl shadow-purple-400">
          Get Paytm
        </button>
      </div>
    </div>
  );
};

export default FirstSection;
