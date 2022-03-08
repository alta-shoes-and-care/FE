import React, {useEffect, useState} from "react";
import Image from "next/image";
import bgImage from "../assets/form.png"
import style from "../styles/formpayment.module.css";

import { useRouter } from 'next/router';

export default function formpayment() {

    return (
        <section>
            <div class="z-0 grid grid-cols-1 h-[650px] bg-cover mt-[-100px]" style={{ backgroundImage: `url('${bgImage}')` }}> 
                <div className='z-1 w-[100vw] h-[650px] bg-[#000009] bg-opacity-30 text-center'>
                    <div class="z-2 grid grid-cols-1 gap-4 bg-cover mt-[100px]">
                        <div className="mt-[0.5vh]">
                            <p className="text-3xl text-white">
                                Confirm your order
                            </p>
                        </div>
                        {/* Desc Card */}
                        <div className='ml-[25vw] z-3 w-[50vw] h-[70vh] bg-[#ffffff] bg-opacity-60 hover:bg-opacity-80 text-left rounded-lg'>
                            <div className="grid grid-cols-1 text-center px-10 py-2">
                                <p className="text-black bold text-xl">
                                    Service type: Regular Cleaning  
                                </p>
                                <p className="text-black text-sm hover:text-lg hover:text-gray-600 "> 
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim feugiat ut montes, diam malesuada auctor nunc. Aliquam habitant nulla rhoncus sapien.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                                </p>
                            </div>
                            {/*form Section */}
                            {/*quantity */}
                            <div className="grid grid-cols-3">
                                <h1 className="text-left text-[#175C8C] bold text-lg ml-[3vw]">
                                    Quantity<dot className="text-red-600">*</dot>
                                </h1>
                            </div>
                            <div className="grid grid-cols-3 mt-[0.25vh] ml-[5vh]">
                                <div className={style.input}>
                                    <input type="Name" id='Name' name='Name' placeholder='Quantity' required />
                                    <label>Quantity</label>
                                </div>
                            </div>
                            {/*quantity end*/}
                            {/*patment - phone number */}
                            <div className="grid grid-cols-3">
                                <h1 className="text-left text-[#175C8C] bold text-lg ml-[3vw]">
                                    Payment Method<dot className="text-red-600">*</dot>
                                </h1>
                                <h1 className="text-left text-[#175C8C] bold text-lg ml-[2vw]">
                                    Phone Number<dot className="text-red-600">*</dot>
                                </h1>
                            </div>
                            <div className="grid grid-cols-3 ml-[5vh]">
                                <div className={style.input}>
                                    <input type="Name" id='Name' name='Name' placeholder='Payment Method' required />
                                    <label>Payment Method</label>
                                </div>
                                <div className={style.input}>
                                    <input type="Email" id='email' name='Email' placeholder='Phone Number' required />
                                    <label>Phone Number</label>
                                </div>
                            </div>
                            {/*payment-phone number end */}
                            {/*city - pickup date*/}
                            <div className="grid grid-cols-3">
                                <h1 className="text-left text-[#175C8C] bold text-lg ml-[3vw]">
                                    City<dot className="text-red-600">*</dot>
                                </h1>
                                <h1 className="text-left text-[#175C8C] bold text-lg ml-[2vw]">
                                    Pick-Up Date<dot className="text-red-600">*</dot>
                                </h1>
                            </div>
                            <div className="grid grid-cols-3 ml-[5vh]">
                                <div className={style.input}>
                                    <input type="Name" id='Name' name='Name' placeholder='City' required />
                                    <label>City</label>
                                </div>
                                <div className={style.input}>
                                    <input type="Email" id='email' name='Email' placeholder='Pick-Up Date' required />
                                    <label>Pick-Up Date</label>
                                </div>
                            </div>
                            {/*city - pickup date */}
                            {/*Adress - Subtotal*/}
                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-[#175C8C] bold text-lg ml-[3vw]">
                                    Adress <dot className="text-red-600">*</dot>
                                </h1>
                            </div>
                            <div className="grid grid-cols-2 ml-[5vh]">
                                <div className={style.input2}>
                                    <input class="" type="Name" id='Name' name='Name' placeholder='Adress' required />
                                </div>
                                    <div className="ml-[10vw] mt-[-6.5vh] mb-[1vh]">
                                    <div className="">
                                        <p className="text-2xl text-center bold hover:text-3xl ">Subtotal</p>
                                        <h1 className="text-2xl text-center bold hover:text-3xl ">Rp.25.000</h1>
                                    </div>
                                    <button class="bg-[#175C8C] hover:bg-white text-white hover:text-black font-bold py-2 px-3 border border-black rounded-lg mt-[1vh] ml-[2vw]">
                                        <p className="text-md text-center rounded-xl"> Confirm Order </p>
                                    </button>
                                </div>
                            </div>
                            {/*Adress - subtotal end*/}
                            {/*form Section end */}
                        </div>
                        {/* Desc Card End*/}
                    </div>
                </div>
            </div>
        </section>
    );
}
