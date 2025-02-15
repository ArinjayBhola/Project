"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Quote from "./Quote";

const Signin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmitData = async () => {
    setLoading(true);
    if (!data.email || !data.password) {
      setLoading(false);
      return;
    }
    try {
      const res = await signIn("credentials", {
        redirect: false,
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (res?.error) {
        console.error(res.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <div className="min-h-screen flex justify-center items-center">
            <div className="p-8 rounded w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Sign In</h1>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Name</div>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                    placeholder="Your Name"
                    onChange={(e) => {
                      setData({
                        ...data,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Email</div>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                    placeholder="Email"
                    onChange={(e) => {
                      setData({
                        ...data,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Password</div>
                  <input
                    type="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                    placeholder="Password"
                    onChange={(e) => {
                      setData({
                        ...data,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded focus:outline-none flex justify-center items-center"
                  onClick={handleSubmitData}
                  disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="invisible sm:visible flex items-center">
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default Signin;
