"use client";
import Image from "next/image";

export const SecondPage = () => {
  return (
    <div className="pt-72 pl-80">
      <div className="text-8xl font-medium pb-10">Pay friends</div>
      <div className="text-2xl mb-10">
        <div>
          Paytm helps settling up feel more like catching up. Send and receive
        </div>
        <div>
          money with Paytm friends to split everyday necessities, bills, and
        </div>
        <div>shared activities like takeout or travel.</div>
        <div className="mt-10">
          Need a gift? Keep it simple and make any payment feel extra special
        </div>
        <div>
          with Paytm. <a className="text-blue-500">Find out how.</a>
        </div>
      </div>

      <button className="bg-white text-black px-10 py-4 rounded-[20rem] font-bold text-xl border-black border-2 shadow-lg shadow-blue-500">
        Learn more
      </button>
      <div className="flex flex-row h-2">
        <div>
          <Image
            alt="left"
            src="/homeleft.png"
            width={400}
            height={100}
            className="mr-40 mt-20"
          ></Image>
        </div>
        <div>
          <Image
            alt="right"
            src="/homeRight.png"
            width={600}
            height={100}
          ></Image>
        </div>
      </div>
    </div>
  );
};
