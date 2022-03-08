import React, {useEffect, useState} from "react";
import Image from "next/image";
import Service from "../../components/Service";

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function services() {

    const router = useRouter();
    const listService = useSelector(({getServiceReducer}) => getServiceReducer)
  
    useEffect(() => {
      console.log(listService)
    }, [listService]);
  

    return (
        <section>
            <div class="z-0 grid grid-cols-1 h-[650px] bg-cover mt-[-100px]" style={{backgroundImage: `url('https://www.thespruce.com/thmb/NuFOlvnclSdD92adneqIHjhgBC8=/700x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/remove-salt-stains-from-shoes-clothes-2147178-01-5616c76b4c2941f0963e00d83e2e16e5.jpg')`}}> 
                <div className='z-1 w-[100vw] h-[650px] bg-[#000009] bg-opacity-30 text-center'>
                    <div class="z-2 grid grid-cols-2 gap-4 bg-cover mt-[100px]">
                        {/* Desc Card */}git
                        <div className='ml-[15vh] mt-[10vh] z-3 w-[75vh] h-[60vh] bg-[#ffffff] bg-opacity-60 hover:bg-opacity-80 text-left rounded-lg'>
                            <p className="text-black bold text-4xl mt-[3.5vh] ml-[5vh]">
                                Regular Cleaning  
                            </p>
                            <p className="text-black text-xl mt-[7.5vh] ml-[5vh] w-[65vh]"> 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim feugiat ut montes, diam malesuada auctor nunc. Aliquam habitant nulla rhoncus sapien.  
                            </p>
                            <h1 className="text-md italic ml-[5vh] mt-[15vh]"> Service may varry depend on shoes material<bintang className="text-red-600">*</bintang></h1>
                        </div>
                        {/* Desc Card End*/}
                        {/* Price and Button*/}
                        <div class="z-4 object-bottom ml-[5vh]">
                            <p className="z-5 text-white text-6xl hover:text-7xl mt-[55vh] mb-[3vh]"> 
                                Rp.25.0000
                            </p>
                            <button class="bg-[#175C8C] hover:bg-white text-white hover:text-black font-bold py-4 px-6 border border-black rounded-lg">
                                <p className="text-xl rounded-xl"> Book a service </p>
                            </button>
                        </div>
                        {/* Price and Button end*/}
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 mt-[-30px]">
                <Service />
            </div>
        </section>
    );
}
