import React, { useState } from "react";
import Image from "next/image";
import Navicon from "../assets/nav-icon.png";
import { useRouter } from "next/router";

function NavbarCompoent() {
  const Swal = require("sweetalert2");
  const router = useRouter();
  const [showOption, setShowOpt] = useState(false);

  function handleDropdown() {
    setShowOpt(!showOption);
  }

  function handleLogout() {
    return Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Thank you!",
          "See you next time:) Shoes Service Station",
          "success"
        );
        router.push("/");
        localStorage.clear();
      }
    });
  }

  function returnNav() {
    if (typeof window !== "undefined") {
      // token = false
      if (!localStorage.getItem("token")) {
        return (
          <div className=" flex">
            <h1 className=" mx-3 text-xl text-primary hover:text-orange-600">
              <a href="">Service</a>
            </h1>
            <h1 className=" mx-3 text-xl text-primary hover:text-orange-600">
              <a href="">About Us</a>
            </h1>

            {/* dropdown */}
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={handleDropdown}
                  type="button"
                  className="inline-flex justify-center w-full px-4  e text-xl  text-primary hover:text-orange-600 "
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Account
                  <svg
                    className="-mr-1 ml-2 h-5 w-5 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {showOption && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div className="py-1" role="none">
                    <a
                      href="/login"
                      className="text-primary block px-4 py-2 text-l  hover:text-orange-600 "
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      Login
                    </a>
                    <a
                      href="/register"
                      className="text-primary block px-4 py-2 text-l  hover:text-orange-600 "
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      Register
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        // token = true & admin = false
      } else if (
        localStorage.getItem("admin") == "false" &&
        localStorage.getItem("token")
      ) {
        return (
          <div className=" flex">
            <h1 className=" mx-3 text-xl text-primary hover:text-orange-600">
              <a href="">Service</a>
            </h1>
            <h1 className=" mx-3 text-xl text-primary hover:text-orange-600">
              <a href="">About Us</a>
            </h1>
            <h1 className=" mx-3 text-xl text-primary hover:text-orange-600">
              <a href="">Order</a>
            </h1>

            {/* dropdown */}
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={handleDropdown}
                  type="button"
                  className="inline-flex justify-center w-full px-4  e text-xl  text-primary hover:text-orange-600 "
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Account
                  <svg
                    className="-mr-1 ml-2 h-5 w-5 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {showOption && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div className="py-1" role="none">
                    <a
                      onClick={() => {
                        handleLogout();
                      }}
                      className="text-primary block px-4 py-2 text-l  hover:text-orange-600 "
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        // token = true & admin = true
      } else if (
        localStorage.getItem("admin") == "true" &&
        localStorage.getItem("token")
      ) {
        return (
          <div className=" flex">
            <h1 className=" mx-3 text-xl text-primary hover:text-orange-600">
              <a href="">Service</a>
            </h1>
            <h1 className=" mx-3 text-xl text-primary hover:text-orange-600">
              <a href="">About Us</a>
            </h1>
            <h1 className=" mx-3 text-xl text-primary hover:text-orange-600">
              <a href="">Store</a>
            </h1>

            {/* dropdown */}
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={handleDropdown}
                  type="button"
                  className="inline-flex justify-center w-full px-4  e text-xl  text-primary hover:text-orange-600 "
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Account
                  <svg
                    className="-mr-1 ml-2 h-5 w-5 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {showOption && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div className="py-1" role="none">
                    <a
                      onClick={() => {
                        handleLogout();
                      }}
                      className="text-primary block px-4 py-2 text-l  hover:text-orange-600 "
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }
    }
  }
  return (
    <div className=" flex justify-between px-24 items-center shadow-md bg-white sticky top-0 z-10 ">
      {/* logo nav */}
      <div
        onClick={() => router.push("/")}
        className=" relative h-20 w-32 mb-3"
      >
        <Image src={Navicon} layout="fill"></Image>
      </div>
      {/* Toggle */}
      {returnNav()}
    </div>
  );
}

export default NavbarCompoent;