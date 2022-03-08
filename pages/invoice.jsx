import React, {useEffect, useState} from "react";
import Image from "next/image";
import bgImage from "../assets/form.png"
import style from "../styles/formpayment.module.css";

import { useRouter } from 'next/router';

export default function invoice() {

    return (
        <section>
            <div class="z-0 grid grid-cols-1 h-[650px] bg-cover mt-[-100px]" style={{ backgroundImage: `url('${bgImage}')` }}> 
                <div className='z-1 w-[100vw] h-[650px] bg-[#000009] bg-opacity-30 text-left'>
                    <div class="z-2 grid grid-cols-1 gap-4 bg-cover mt-[100px]">
                        <div className="mt-[0.5vh] ml-[20vh]">
                            <p className="text-4xl text-black">
                                Payment Invoice
                            </p>
                        </div>
                        {/* Desc Card */}
                        <div className='ml-[30vw] mt-[-2vh] z-3 w-[40vw] h-[60vh] bg-[#ffffff] bg-opacity-60 hover:bg-opacity-80 text-left rounded-lg'>
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
                        {/* Button Subtotal*/}
                        <div className="ml-[25vw] mt-[-2vh] text-center">
                            <div className="bold text-xl">
                                Subtotal : Rp.25.000
                            </div>
                            <button class="ml-[3vw] bg-[#175C8C] hover:bg-white text-white hover:text-black font-bold py-2 px-3 border border-black rounded-lg">
                                <p className="text-md text-center rounded-xl"> Confirm Payment </p>
                            </button>
                        </div>
                        {/* Button Subtotal end*/}
                    </div>
                </div>
            </div>
        </section>
    );
}
