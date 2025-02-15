"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { BsPencilSquare, BsBell } from "react-icons/bs";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const scrollToText = () => {
    const aboutUsElement = document.getElementById("aboutus");
    if (aboutUsElement) {
      aboutUsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center justify-between px-10 py-3 bg-white shadow-md border-b relative">
      <Link href="/dashboard">
        <p className="text-xl font-bold text-gray-900">LET&lsquo;S READ</p>
      </Link>

      <div className="flex items-center gap-6">
        <p
          className="text-gray-700 cursor-pointer"
          onClick={scrollToText}>
          About Us
        </p>
        <button
          className="flex items-center gap-2 text-gray-700 hover:text-black"
          onClick={() => router.push("/publish")}>
          <BsPencilSquare className="text-lg" /> Write
        </button>
        <BsBell className="text-xl text-gray-700 cursor-pointer hover:text-black" />

        <div
          className="relative"
          ref={dropdownRef}>
          <button
            className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold"
            onClick={toggleDropdown}>
            {session?.user?.name?.charAt(0).toUpperCase()}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 shadow-lg rounded-md py-2 z-50 bg-gray-100">
              <p className="px-4 py-2 text-gray-700 font-semibold">{session?.user?.name}</p>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => router.push("/profile")}>
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => {
                  signOut();
                  router.push("/signin");
                }}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
