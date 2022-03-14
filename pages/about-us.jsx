import React from "react";
import Image from "next/image";
import Profile from "../assets/profile.png";
import FE_yusuf from "../assets/team/FE_yusuf.png";
import FE_diyah from "../assets/team/FE_diyah.png";
import BE_yusuf from "../assets/team/BE_yusuf.png";
import BE_frans from "../assets/team/BE_frans.png";
import QE_adhit from "../assets/team/QE_adhit.png";
import QE_rendy from "../assets/team/QE_rendy.png";
import QE_zahra from "../assets/team/QE_zahra.png";
import styles from "../styles/about.module.css";
import { AiFillGithub, AiOutlineLinkedin, AiOutlineMail } from "react-icons/ai";

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
      <div className={styles.container}>
        {/* card 1 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={FE_yusuf} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-blue-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">
            Muhammad Yusuf
          </h1>
          <h1 className=" text-center mb-1">Frontend Developer</h1>
          <div className="flex justify-center">
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="https://github.com/myusufuntung"
              target="_blank"
            >
              <AiFillGithub />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="https://www.linkedin.com/in/myusufuntung"
              target="_blank"
            >
              <AiOutlineLinkedin />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="mailto:myusufuntung@gmail.com"
              target="_blank"
            >
              <AiOutlineMail />
            </a>
          </div>
        </div>
        {/* card 2 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={FE_diyah} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-orange-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">
            Chalimatus Sa'diyah
          </h1>
          <h1 className=" text-center mb-1">Frontend Developer</h1>
          <div className="flex justify-center">
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="https://www.github.com/diydiyydiyyy"
              target="_blank"
            >
              <AiFillGithub />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="https://www.linkedin.com/in/chalimatussadiyah"
              target="_blank"
            >
              <AiOutlineLinkedin />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="mailto:chalimatus.sadiyah.098@gmail.com"
              target="_blank"
            >
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
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href=""
              target="_blank"
            >
              <AiFillGithub />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href=""
              target="_blank"
            >
              <AiOutlineLinkedin />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href=""
              target="_blank"
            >
              <AiOutlineMail />
            </a>
          </div>
        </div>
      </div>

      <p className=" text-center text-2xl mb-8">Backend Developer</p>
      {/* BE Card */}
      <div className={styles.container}>
        {/* card 1 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={BE_yusuf} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-orange-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">
            Yusuf Nur Wahid
          </h1>
          <h1 className=" text-center mb-1">Backend Developer</h1>
          <div className="flex justify-center">
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="https://github.com/ynwahid"
              target="_blank"
            >
              <AiFillGithub />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="https://linkedIn.com/in/ynwahid"
              target="_blank"
            >
              <AiOutlineLinkedin />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="mailto:yusufnurwahid.contact@gmail.com"
              target="_blank"
            >
              <AiOutlineMail />
            </a>
          </div>
        </div>
        {/* card 2 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={BE_frans} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-blue-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">
            Frans Ihsan
          </h1>
          <h1 className=" text-center mb-1">Backend Developer</h1>
          <div className="flex justify-center">
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="https://github.com/fransihsan"
              target="_blank"
            >
              <AiFillGithub />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="https://www.linkedin.com/in/fransihsan/"
              target="_blank"
            >
              <AiOutlineLinkedin />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="mailto:fransihsan8888@gmail.com"
              target="_blank"
            >
              <AiOutlineMail />
            </a>
          </div>
        </div>
      </div>

      <p className=" text-center text-2xl mb-8">Quality Engineer</p>
      {/* QE Card */}
      <div className={styles.container}>
        {/* card 1 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={QE_adhit} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-blue-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">
            Adhitya Dwi Prananta
          </h1>
          <h1 className=" text-center mb-1">Quality Engineer</h1>
          <div className="flex justify-center">
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="https://github.com/Adhitya87"
              target="_blank"
            >
              <AiFillGithub />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="https://www.linkedin.com/in/adhitya-dwi-prananta-43b03856/"
              target="_blank"
            >
              <AiOutlineLinkedin />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              href="mailto:prananta.adhitya87@gmail.com"
              target="_blank"
            >
              <AiOutlineMail />
            </a>
          </div>
        </div>
        {/* card 2 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={QE_rendy} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-orange-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">
            Rendy Setiawan
          </h1>
          <h1 className=" text-center mb-1">Quality Engineer</h1>
          <div className="flex justify-center">
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              target="_blank"
              href="https://github.com/rndsetiawan"
            >
              <AiFillGithub />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              target="_blank"
              href="https://www.linkedin.com/in/rndsetiawan/"
            >
              <AiOutlineLinkedin />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              target="_blank"
              href="mailto:rendysetawan89@gmail.com"
            >
              <AiOutlineMail />
            </a>
          </div>
        </div>
        {/* card 3 */}
        <div className="mb-8">
          <div className=" w-[300px] h-[400px] relative ">
            <Image src={QE_zahra} layout="fill"></Image>
            <div className="w-[300px] h-[400px] bg-transparent border-[10px] border-blue-600 absolute z-10 ml-[20px] mt-[20px]"></div>
          </div>

          <h1 className="mt-8 text-xl font-semibold text-center">
            Zahra Asri Septia
          </h1>
          <h1 className=" text-center mb-1">Quality Engineer</h1>
          <div className="flex justify-center">
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              target="_blank"
              href="https://github.com/zahrasept"
            >
              <AiFillGithub />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              target="_blank"
              href="https://id.linkedin.com/in/zahraasriseptia"
            >
              <AiOutlineLinkedin />
            </a>
            <a
              className=" text-2xl mx-1 hover:animate-bounce"
              target="_blank"
              href="mailto:zahraasriseptia@gmail.com"
            >
              <AiOutlineMail />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
