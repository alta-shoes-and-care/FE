import React from "react";
import Image from "next/image";
import Profile from "../assets/profile.png";
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";

function AboutUs() {
  return (
    <div className=" px-24">
      {/* about us */}
      <h1 className=" text-4xl text-center my-8">About Us</h1>
      <p className=" text-center mb-10">
        Shoes Service Station is a business engaged in laundry and care services
        for washing quality shoes from Indonesia. <br />
        We offer various services such as washing and re-staining your shoes to
        restore the glory of your shoes. To date, we have completed many pairs
        of shoes and will continue to grow.
        <br />
        The name Shoes Service Station means that everyone can wash their shoes
        at our place with affordable prices and quality service. We hope to
        provide the best for you.
        <br />
        In addition, we also support the #zerowaste program by not using plastic
        laundry bags like most shoe laundry in general. Laundry bags from Shoes
        Service Store can be used repeatedly without polluting the environment.
        We hope that with a small gesture from us and with your help, we can
        reduce the amount of plastic use in Indonesia.
      </p>

      <h1 className=" text-4xl text-center my-3 mb-10">About Our Team</h1>
      <p className=" text-center text-2xl mb-8">Frontend Developer</p>
      {/* FE Card */}
      <div className=" flex justify-around mb-10">
        {/* card 1 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={Profile} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-blue-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">
            Muhammad Yusuf
          </h1>
          <h1 className=" text-center mb-1">Frontend Developer</h1>
          <div className="flex justify-center">
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiFillGithub />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineInstagram />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineMail />
            </a>
          </div>
        </div>
        {/* card 2 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={Profile} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-orange-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">
            Chalimatus Sa'diyah
          </h1>
          <h1 className=" text-center mb-1">Frontend Developer</h1>
          <div className="flex justify-center">
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiFillGithub />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineInstagram />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineMail />
            </a>
          </div>
        </div>
        {/* card 3 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={Profile} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-blue-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">
            Aditya Fabio Hariawan
          </h1>
          <h1 className=" text-center mb-1">Frontend Developer</h1>
          <div className="flex justify-center">
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiFillGithub />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineInstagram />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineMail />
            </a>
          </div>
        </div>
      </div>

      <p className=" text-center text-2xl mb-8">Backend Developer</p>
      {/* BE Card */}
      <div className=" flex justify-around mb-10">
        {/* card 1 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={Profile} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-blue-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">Yusuf</h1>
          <h1 className=" text-center mb-1">Backend Developer</h1>
          <div className="flex justify-center">
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiFillGithub />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineInstagram />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineMail />
            </a>
          </div>
        </div>
        {/* card 2 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={Profile} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-orange-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">Frans</h1>
          <h1 className=" text-center mb-1">Backend Developer</h1>
          <div className="flex justify-center">
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiFillGithub />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineInstagram />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineMail />
            </a>
          </div>
        </div>
      </div>

      <p className=" text-center text-2xl mb-8">Quality Engineer</p>
      {/* QE Card */}
      <div className=" flex justify-around mb-10">
        {/* card 1 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={Profile} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-blue-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">Adhitya</h1>
          <h1 className=" text-center mb-1">Quality Engineer</h1>
          <div className="flex justify-center">
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiFillGithub />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineInstagram />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineMail />
            </a>
          </div>
        </div>
        {/* card 2 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={Profile} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-orange-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">Rendy</h1>
          <h1 className=" text-center mb-1">Quality Engineer</h1>
          <div className="flex justify-center">
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiFillGithub />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineInstagram />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineMail />
            </a>
          </div>
        </div>
        {/* card 3 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={Profile} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-blue-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">Zahra</h1>
          <h1 className=" text-center mb-1">Quality Engineer</h1>
          <div className="flex justify-center">
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiFillGithub />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineInstagram />
            </a>
            <a className=" text-2xl mx-1 hover:animate-bounce" href="">
              <AiOutlineMail />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
