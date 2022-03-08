import Service from "../components/Service";
import Carousel from "../components/Carousel";

import ReactStars from "react-rating-stars-component";
import Iframe from "react-iframe";
import Image from "next/image";

import vvm from "../assets/vvm.png";
import Gallery from "../components/Gallery";

const starReview = {
  size: 30,
  value: 5,
  edit: false,
};

export default function Home() {
  return (
    <div>
      <div>
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
              "Recommend for cleaning shoes, there is a 1 day package, suitable for cleaning safety shoes too"
            </blockquote>
          </div>

          <div className="border border-primary rounded-2xl w-1/4 p-5 text-center">
            <h2 className="font-bold text-[24px]">Greg Stuart</h2>
            <div className="flex justify-center">
              <ReactStars {...starReview} />
            </div>
            <blockquote className="italic font-thin text-[18px]">
              "Good place. Recommended laundry for shoes."
            </blockquote>
          </div>

          <div className="border border-primary rounded-2xl w-1/4 p-5 text-center">
            <h2 className="font-bold text-[24px]">Trevor Mitchell</h2>
            <div className="flex justify-center">
              <ReactStars {...starReview} />
            </div>
            <blockquote className="italic font-thin text-[18px]">
              "The process is fast. The service is also good and friendly. The premium cleaning results are satisfactory. Love it!"
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
            <p className="text-[20px] text-justify">
            Shoes Service Station is a business engaged in laundry and care services for washing quality shoes from Indonesia. <br/>
            We offer various services such as washing and re-staining your shoes to restore the glory of your shoes. To date, we have completed many pairs of shoes and will continue to grow.<br/>
            The name Shoes Service Station means that everyone can wash their shoes at our place with affordable prices and quality service. We hope to provide the best for you.<br/>
            In addition, we also support the #zerowaste program by not using plastic laundry bags like most shoe laundry in general. Laundry bags from Shoes Service Store can be used repeatedly without polluting the environment. We hope that with a small gesture from us and with your help, we can reduce the amount of plastic use in Indonesia.
            </p>
          </div>
        </div>
      </div>

      <div className="p-10">
        <Gallery />
      </div>

      <div className="w-full mb-10">
        <div className="w-full bg-cover bg-no-repeat bg-bg-vvm">
          <div className="w-full bg-[#f0f0f0] bg-cover bg-opacity-30 py-10 px-36 flex justify-between">
            <div className="w-80 h-[400px] bg-white bg-opacity-80 backdrop-blur-[10px] flex flex-col justify-center items-center text-center p-10 rounded-2xl hover:scale-105">
              <h1 className="text-[36px] text-black font-bold my-auto">Value</h1>
              <p className="text-[20px] text-black">
              Respect <br/>
              Responsibility <br/>
              Caring <br/>
              Excellence <br/>
              Integrity <br/>
              Innovation 
              </p>
            </div>

            <div className="w-80 h-[400px] bg-white bg-opacity-80 backdrop-blur-[10px] flex flex-col justify-center items-center text-center p-10 rounded-2xl hover:scale-105">
              <h1 className="text-[36px] text-black font-bold my-auto">Vision</h1>
              <p className="text-[20px] text-black">
              To make footwear hygiene and shoe care a part of every individual's lifestyle by making S3 services available to everyone everywhere & have a positive environmental impact. 
              </p>
            </div>

            <div className="w-80 h-[400px] bg-white bg-opacity-80 backdrop-blur-[10px] flex flex-col justify-center items-center text-center p-10 rounded-2xl hover:scale-105">
              <h1 className="text-[36px] text-black font-bold my-auto">Mission</h1>
              <p className="text-[20px] text-black">
              To provide a world class professional footwear laundry & refurbishing service, of the highest quality & highest level of convenience to everyone, everywhere. 
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
