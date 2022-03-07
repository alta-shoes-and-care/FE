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
    <div className=" flex justify-between px-24 items-center py-2 border-t-2">
      {/* logo nav */}
      <Link href='/'>
        <a>
          <div
            className=" relative h-20 w-32 mb-3"
          >
            <Image src={Navicon} layout="fill" />
          </div>
        </a>
      </Link>
      {/* social media */}
      <div className=" grid justify-center items-center content-evenly justify-items-center">
        <h1 className=" text-primary text-2xl my-1">Contatc Us</h1>

        <div className="flex text-primary my-1">
          <h2 className="text-2xl mx-2 hover:animate-bounce">
            <a href="https://web.facebook.com/alterra.academy/" target="_blank">
              <FaFacebook />
            </a>
          </h2>
          <h2 className="text-2xl mx-2 hover:animate-bounce">
            <a href="https://twitter.com/alterraid" target="_blank">
              <FaTwitter />
            </a>
          </h2>

          <h2 className="text-2xl mx-2 hover:animate-bounce">
            <a href="https://www.instagram.com/alterra.id/" target="_blank">
              <FaInstagram />
            </a>
          </h2>
          <h2 className="text-2xl mx-2 hover:animate-bounce">
            <a href="https://www.alterra.id/tech-academy/" target="_blank">
              <FaTelegramPlane />
            </a>
          </h2>
          <h2 className="text-2xl mx-2 hover:animate-bounce">
            <a href="https://www.alterra.id/tech-academy/" target="_blank">
              <FaWhatsapp />
            </a>
          </h2>
        </div>

        <div className="flex text-primary my-1">
          <h2>© 2022 Shoes Service Station, Inc. All rights reserved</h2>
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
