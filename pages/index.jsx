import Service from "../components/Service";
import Carousel from "../components/Carousel";

import ReactStars from "react-rating-stars-component";
import Iframe from "react-iframe";
import Image from "next/image";

import g1 from "../assets/gallery/g1.png";
import g2 from "../assets/gallery/g2.png";
import g3 from "../assets/gallery/g3.png";
import g4 from "../assets/gallery/g4.png";
import g5 from "../assets/gallery/g5.png";
import g6 from "../assets/gallery/g6.png";
import g7 from "../assets/gallery/g7.png";
import g8 from "../assets/gallery/g8.png";
import g9 from "../assets/gallery/g9.png";
import vvm from "../assets/vvm.png";

const starReview = {
  size: 30,
  value: 5,
  edit: false,
};

export default function Home() {
  return (
    <div>
      <div className="w-full h-[700px] flex justify-center items-center">
        <Carousel />
      </div>

      <div className="w-full bg-[#f0f0f0]">
        <Service />
      </div>

      <div className="py-10 px-20">
        <h1 className="font-bold text-black text-[48px] text-center mb-8">
          What is everyone saying?
        </h1>
        <div className="flex justify-evenly">
          <div className="border border-primary rounded-2xl w-1/4 p-5 text-center">
            <h2 className="font-bold text-[24px]">James Pattinson</h2>
            <div className="flex justify-center">
              <ReactStars {...starReview} />
            </div>
            <blockquote className="italic font-thin text-[18px]">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit libero vero inventore eos voluptatibus. Asperiores
              aperiam exercitationem soluta recusandae harum."
            </blockquote>
          </div>

          <div className="border border-primary rounded-2xl w-1/4 p-5 text-center">
            <h2 className="font-bold text-[24px]">Greg Stuart</h2>
            <div className="flex justify-center">
              <ReactStars {...starReview} />
            </div>
            <blockquote className="italic font-thin text-[18px]">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit libero vero inventore eos voluptatibus. Asperiores
              aperiam exercitationem soluta recusandae harum."
            </blockquote>
          </div>

          <div className="border border-primary rounded-2xl w-1/4 p-5 text-center">
            <h2 className="font-bold text-[24px]">Trevor Mitchell</h2>
            <div className="flex justify-center">
              <ReactStars {...starReview} />
            </div>
            <blockquote className="italic font-thin text-[18px]">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit libero vero inventore eos voluptatibus. Asperiores
              aperiam exercitationem soluta recusandae harum."
            </blockquote>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#f0f0f0] py-10 px-20">
        <h1 className="font-bold text-black text-[48px] text-center mb-8">
          About S3
        </h1>
        <div className="flex justify-center">
          <div className="w-2/5 mr-1">
            <Image
              src="https://images.unsplash.com/photo-1532561685579-890e8f61456a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80"
              alt="about"
              width="498px"
              height="400px"
            />
          </div>

          <div className="w-2/5 ml-1">
            <p className="text-[24px] text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
              quam, nostrum asperiores earum temporibus culpa expedita harum
              ipsa excepturi veritatis nihil error sit quas ea officia tempora
              est quae quod voluptatibus. Optio consequuntur deserunt ullam
              laudantium consequatur laboriosam corrupti autem odio dolore
              aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Quaerat nisi, iste laboriosam temporibus provident molestiae!
              Optio consequuntur deserunt llam laudantium consequatur laboriosam
              corrupti autem.
            </p>
          </div>
        </div>
      </div>

      <div className="py-10 w-full">
        <h1 className="font-bold text-black text-[48px] text-center mb-8">
          Galley
        </h1>
        <div className="flex justify-between mb-[10px]">
          <Image src={g1} alt="g1" width="560px" height="289px" />
          <Image src={g2} alt="g2" width="420px" height="289px" />
          <Image src={g3} alt="g3" width="420px" height="289px" />
        </div>

        <div className="flex justify-between mb-[10px]">
          <Image src={g4} alt="g4" width="420px" height="289px" />
          <Image src={g5} alt="g5" width="560px" height="289px" />
          <Image src={g6} alt="g6" width="420px" height="289px" />
        </div>

        <div className="flex justify-between">
          <Image src={g7} alt="g7" width="420px" height="289px" />
          <Image src={g8} alt="g8" width="420px" height="289px" />
          <Image src={g9} alt="g9" width="560px" height="289px" />
        </div>
      </div>

      <div className="w-full mb-10">
        <div className="w-full bg-cover bg-no-repeat bg-bg-vvm">
          <div className="w-full bg-[#f0f0f0] bg-cover bg-opacity-30 py-10 px-36 flex justify-between">
            <div className="w-[350px] h-[490px] bg-white bg-opacity-80 backdrop-blur-[10px] flex flex-col justify-center items-center text-center p-10 rounded-2xl">
              <h1 className="text-[36px] text-black mb-5">Value</h1>
              <p className="text-[20px] text-black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident culpa aliquid dolores, cum qui, recusandae, nisi
                obcaecati accusamus praesentium commodi doloremque?
              </p>
            </div>

            <div className="w-[350px] h-[490px] bg-white bg-opacity-80 backdrop-blur-[10px] flex flex-col justify-center items-center text-center p-10 rounded-2xl">
              <h1 className="text-[36px] text-black mb-5">Vision</h1>
              <p className="text-[20px] text-black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident culpa aliquid dolores, cum qui, recusandae, nisi
                obcaecati accusamus praesentium commodi doloremque?
              </p>
            </div>

            <div className="w-[350px] h-[490px] bg-white bg-opacity-80 backdrop-blur-[10px] flex flex-col justify-center items-center text-center p-10 rounded-2xl">
              <h1 className="text-[36px] text-black mb-5">Mission</h1>
              <p className="text-[20px] text-black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident culpa aliquid dolores, cum qui, recusandae, nisi
                obcaecati accusamus praesentium commodi doloremque?
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#f0f0f0] p-10 text-center">
        <Iframe
          url="http://www.youtube.com/embed/kyGR47nDrus"
          width="80%"
          height="500px"
          allow="fullscreen"
          display="initial"
          position="relative"
        />
      </div>
    </div>
  );
}
