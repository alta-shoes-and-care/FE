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
          <div className="w-screen h-[600px]">
            <Image src={s1} alt="Slide 1" layout="fill" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-screen h-[600px]">
            <Image src={s2} alt="Slide 2" layout="fill" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-screen h-[600px]">
            <Image src={s3} alt="Slide 3" layout="fill" />
          </div>
        </SwiperSlide>
      </Swiper>

      <style jsx global>{`
      .swiper {
        width: 100%;
        height: 600px;
      }

      .swiper-slide {
        background-size: contain;
      }

      .swiper-slide img {
        display: block;
        width: 100%;
        height: 600px;
      }
      `}</style>
    </>
  );
}
