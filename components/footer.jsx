import React from "react";
import Navicon from "../assets/nav-icon.png";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { useRouter } from "next/router";

function FooterComponent() {
  const router = useRouter();
  return (
    <div className="flex justify-between px-5 lg:px-24 items-center py-2 border-t-2">
      {/* logo nav */}
      <Link href="/">
        <a>
          <div className="relative lg:h-20 lg:w-32 h-[70px] w-[120px] mb-3">
            <Image src={Navicon} layout="fill" />
          </div>
        </a>
      </Link>
      {/* social media */}
      <div className=" grid justify-center items-center content-evenly justify-items-center">
        <h1 className=" text-primary lg:text-2xl text-sm my-1">Contact Us</h1>

        <div className="flex text-primary my-1">
          <h2 className="lg:text-2xl text-lg lg:mx-2 mx-1 hover:animate-bounce">
            <a href="https://web.facebook.com/alterra.academy/" target="_blank">
              <FaFacebook />
            </a>
          </h2>
          <h2 className="lg:text-2xl text-lg lg:mx-2 mx-1 hover:animate-bounce">
            <a href="https://twitter.com/alterraid" target="_blank">
              <FaTwitter />
            </a>
          </h2>

          <h2 className="lg:text-2xl text-lg lg:mx-2 mx-1 hover:animate-bounce">
            <a href="https://www.instagram.com/alterra.id/" target="_blank">
              <FaInstagram />
            </a>
          </h2>
          <h2 className="lg:text-2xl text-lg lg:mx-2 mx-1 hover:animate-bounce">
            <a href="https://www.alterra.id/tech-academy/" target="_blank">
              <FaTelegramPlane />
            </a>
          </h2>
          <h2 className="lg:text-2xl text-lg lg:mx-2 mx-1 hover:animate-bounce">
            <a href="https://www.alterra.id/tech-academy/" target="_blank">
              <FaWhatsapp />
            </a>
          </h2>
        </div>

        <div className="flex text-primary lg:text-xl text-xs my-1">
          <h2>© 2022 Shoes Service Station, Inc. All rights reserved</h2>
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
