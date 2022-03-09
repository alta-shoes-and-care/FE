import React, {useEffect, useState} from "react";
import Image from "next/image";
import style from "../styles/formpayment.module.css";

import { useRouter } from 'next/router';

export default function endpoint() {

    return (
        <section>
            <div className={`z-0 grid grid-cols-1 h-[650px] bg-cover mt-[-100px] ${style.bgImage3}  `}>  
                <div className='z-1 w-[100vw] h-[650px] bg-[#000009] bg-opacity-0 text-left'>
                    <div class="z-2 grid grid-cols-1 gap-4 bg-cover mt-[100px]">
                        {/* Desc Card */}
                        <div className='ml-[20vw] mt-[8vh] z-3 w-[40vw] h-[60vh] bg-[#ffffff] bg-opacity-80 hover:bg-opacity-100 text-left rounded-lg'>
                            <div className="grid grid-cols-1 text-left px-10 py-2">
                                <p className="text-black bold text-2xl">
                                    Service type: Regular Cleaning  
                                </p>
                                <p className="text-black text-sm"> 
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim feugiat ut montes, diam malesuada auctor nunc. Aliquam habitant nulla rhoncus sapien.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                                </p>
                            </div>
                            {/*Invoice Section */}
                            {/*quantity */}
                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-black bold text-lg ml-[3vw]">
                                    Quantity (Pairs): 1
                                </h1>
                            </div>
                            {/*quantity end*/}
                            {/*patment - phone number */}
                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-black bold text-lg ml-[3vw]">
                                    Payment Method  :
                                </h1>
                                <h1 className="text-left text-black bold text-lg ml-[3vw]">
                                    Phone Number :
                                </h1>
                            </div>
                            <div className="grid grid-cols-2 mb-1">
                                <h1 className="text-left text-black bold text-md ml-[3vw]">
                                    Go-Pay
                                </h1>
                                <h1 className="text-left text-black bold text-md ml-[3vw]">
                                    0812345678910
                                </h1>
                            </div>
                            {/*payment-phone number end */}
                            {/*city - pickup date*/}
                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-black bold text-lg ml-[3vw]">
                                    City  :
                                </h1>
                                <h1 className="text-left text-black bold text-lg ml-[3vw]">
                                    Pick-Up Date :
                                </h1>
                            </div>
                            <div className="grid grid-cols-2 mb-1">
                                <h1 className="text-left text-black bold text-md ml-[3vw]">
                                    Jakarta
                                </h1>
                                <h1 className="text-left text-black bold text-md ml-[3vw]">
                                    2022-3-8
                                </h1>
                            </div>
                            {/*city - pickup date */}
                            {/*Adress - Subtotal*/}
                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-black bold text-lg ml-[3vw]">
                                    Adress  :
                                </h1>
                            </div>
                            <div className="grid grid-cols-1 max-w-[38vw] mb-1">
                                <h1 className="text-left text-black bold text-md ml-[3vw]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim feugiat ut montes, diam malesuada auctor nunc. Aliquam habitant nulla rhoncus sapien.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                                </h1>
                            </div>
                            {/*Adress - subtotal end*/}
                            {/*Invoice end */}
                        </div>
                        {/* Desc Card End*/}
                    </div>
                </div>
            </div>
        </section>
    );
}
