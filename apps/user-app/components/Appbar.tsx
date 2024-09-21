"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke="currentColor"
    className={` text-blue-500 size-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const NavItem = ({ text }: { text: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className="flex items-center text-black cursor-pointer font-medium"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="mr-1">{text}</span>
      <ArrowIcon isOpen={isOpen} />
    </div>
  );
};

export const Appbar = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between p-4 bg-white pt-8 pb-6 sticky top-0 z-50 drop-shadow-lg">
      <div className="flex items-center">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="pl-72 text-5xl font-extrabold pr-16 cursor-pointer text-blue-500"
        >
          Paytm
        </div>
        <nav className="flex space-x-16">
          <NavItem text="Send & Receive" />
          <NavItem text="Pay with Paytm" />
          <NavItem text="Paytm for merchant" />
          <div
            className="font-medium pl-52 cursor-pointer"
            onClick={() => {
              router.push("/login");
            }}
          >
            Log in
          </div>
        </nav>
      </div>
    </div>
  );
};
