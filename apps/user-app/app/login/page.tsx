"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pb-20">
      <div className="bg-white p-12 rounded-xl shadow-lg w-[30rem] text-center">
        <div className="text-4xl font-extrabold text-blue-500 mb-8">Paytm</div>
        <div className="text-2xl font-medium mb-6">Login</div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-6 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-6 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleLogin}
          className="w-full px-6 py-3 mb-6 bg-blue-500 text-white rounded-lg font-bold transition-transform hover:scale-105"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/signup")}
          className="w-full px-6 py-3 border border-blue-500 text-blue-500 rounded-lg font-bold transition-transform hover:scale-105"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
