import s1 from "../assets/carousel/s8.png";
import s2 from "../assets/carousel/s7.png";
import s3 from "../assets/carousel/s6.png";

import Image from "next/image";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";

export default function Carousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="">
            <Image src={s1} alt="Slide 1" layout="fill" className="relative brightness-50" />
              <div className="absolute text-white font-bold flex items-center justify-center flex-col text-center w-screen h-[650px]">
                <h2 className="text-4xl">Welcome to</h2>
                <h1 className="text-6xl uppercase">Shoes Service Station</h1>
              </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div>
            <Image src={s2} alt="Slide 2" layout="fill" className="relative brightness-50" />
            <div className="absolute text-white font-bold flex items-center justify-center flex-col text-center w-screen h-[650px]">
                <h1 className="text-6xl uppercase">respect your shoes</h1>
                <h2 className="text-4xl">We'll be there to care for your loved ones when you cannot.</h2>
              </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div>
            <Image src={s3} alt="Slide 3" layout="fill" className="relative brightness-50" />
            <div className="absolute text-white font-bold flex items-center justify-center flex-col text-center w-screen h-[650px]">
                <h1 className="text-6xl uppercase">Make your shoes look better</h1>
                <h2 className="text-4xl">Wear it with pride.</h2>
              </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <style jsx global>{`
      .swiper {
        width: 100%;
        height: 670px;
      }

      .swiper-slide {
        background-size: contain;
      }

      .swiper-slide img {
        display: block;
        width: 100%;
        height: 670px;
      }
      `}</style>
    </>
  );
}