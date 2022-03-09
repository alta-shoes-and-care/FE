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
                        <div className='ml-[20vw] mt-[8vh] z-3 w-[40vw] h-[65vh] bg-[#ffffff] bg-opacity-60 hover:bg-opacity-80 text-left rounded-lg'>
                            <div className="grid grid-cols-1 text-center px-10 py-3">
                                <p className="text-black text-center bold text-3xl">
                                    Thankyou for using our services
                                </p>
                                <p className="text-black text-md text-center"> 
                                    If you already finished the payment, click to check the payment status
                                </p>
                            </div>
                            <div className="grid grid-cols-1 text-center w-[20vw] mt-[2vh] ml-[10vw]">
                                <button class="bg-[#175C8C] hover:bg-white text-white hover:text-black font-bold py-2 px-2 border border-black rounded-lg">
                                    <p className="text-md text-center rounded-xl"> Check Payment </p>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 text-center px-10 py-3">
                                <p className="text-black text-center bold text-2xl">
                                    Check Payment Status
                                </p>
                                <p className="text-red-600 text-center bold text-xl mt-[2vh]">
                                    Not Completed
                                </p>
                                <p className="text-green-600 text-center bold text-xl mt-[2vh]">
                                    Completed
                                </p>
                            </div>
                            <div className="grid grid-cols-1 text-center w-[20vw] mt-[3vh] ml-[10vw]">
                                <button class="bg-[#175C8C] hover:bg-white text-white hover:text-black font-bold py-2 px-2 border border-black rounded-lg">
                                    <p className="text-md text-center rounded-xl"> Order History </p>
                                </button>
                            </div>
                        </div>
                        {/* Desc Card End*/}
                    </div>
                </div>
            </div>
        </section>
    );
}
