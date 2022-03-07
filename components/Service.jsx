import Image from 'next/image';
import Link from 'next/link';

import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Service() {

  const router = useRouter();
  const listService = useSelector(({getServiceReducer}) => getServiceReducer)

  useEffect(() => {
    console.log(listService)
  }, [listService]);

  return (
    <div className='container max-w-screen-xl m-auto p-10'>
      <h1 className='font-bold text-black text-[48px] text-center mb-8'>Our Service</h1>

      <div className='mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-3'>
        {listService.map((el, i) => (
          <Link href='/'>
            <a>
              <div key={i} className='relative cursor-pointer w-[298px] h-[241px] bg-cover mb-1 hover:drop-shadow-2xl' style={{backgroundImage: `url('${el.image}')`}}>
                <div className='absolute w-[298px] h-[241px] bg-[#000009] bg-opacity-30 hover:bg-[#c6c6c6] hover:bg-opacity-50 text-center bottom-0 inset-x-0'>
                  <p className='absolute text-[40px] flex justify-center align-middle items-center text-white hover:font-bold inset-0 px-[50px]'>{el.title}</p>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}