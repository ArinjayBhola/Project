"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Redirect = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-700">Hello, Welcome! Start Reading and Writing your blogs.</h1>
        <p className="text-lg text-gray-500 mt-2">Click the button below to get started</p>
      </div>

      <div className="space-y-4">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 mx-auto"
          onClick={() => router.push("/dashboard")}>
          Start Writing
        </button>

        <div className="mt-4 text-center">
          <p className="text-lg text-gray-700">Not signed in yet? Click below to sign in.</p>
          <button
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 mt-2 mx-auto"
            onClick={() => router.push("/signin")}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Redirect;
