"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Redirect = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      Hello Welcome. Start Reading, Writing your blogs. Click on the button below
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push("/dashboard")}>
        Click Here
      </button>
    </div>
  );
};

export default Redirect;
