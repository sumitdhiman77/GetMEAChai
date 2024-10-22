"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
const Navbar = () => {
  const { data: session, signIn, status } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);
  return (
    <nav className="sm:px-4 bg-blue-950 sm:bg-red-950 md:bg-green-950 lg:bg-blue-950 flex text-white justify-between h-16 sm:h-12 sm:align-middle items-center">
      <Link href={"/"} className="flex logo font-bold mr-10">
        <Image
          className="invertImg"
          src="/tea.gif"
          alt="Tea Mug"
          width={30}
          height={49}
        ></Image>
        <span>GetMeAChai</span>
      </Link>
      <div>
        {signIn || status === "authenticated" ? (
          <>
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              onBlur={() => setTimeout(() => setShowdropdown(false), 100)}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white mr-2 sm:mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:font-medium sm:rounded-lg text-xs sm:text-sm px-1 sm:px-5 py-1 sm:py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              {session.user.email}
              <svg
                className="w-1 sm:w-2.5 h-0.5 sm:h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`z-10 ${
                showdropdown ? "" : "hidden"
              } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                ariaLabelledBy="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href={"/dashboard"}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.name}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-xs sm:text-md sm:font-medium rounded-lg px-1 sm:px-5 py-1 sm:py-2.5 text-center sm:me-2 sm:mb-2"
              href={"/login"}
              onClick={() => signOut()}
            >
              Logout
            </Link>
          </>
        ) : (
          <Link
            href={"/login"}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
