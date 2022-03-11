import Image from 'next/image';
import Link from 'next/link';

import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Service() {

  const router = useRouter();
  const query = router.query;
  const id = query.id;
  const listService = useSelector(({getServiceReducer}) => getServiceReducer)

  useEffect(() => {
    console.log(listService)
  }, [listService]);

  return (
    <div className='container max-w-screen-xl m-auto px-10'>
      <h1 className='font-bold text-black text-[36px] lg:text-[48px] text-center mb-8'>Our Services</h1>

      <div className='mt-6 flex flex-row flex-wrap justify-between items-baseline space-y-5 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-3'>
        {listService.map((el, i) => (
          <div key={i}>
          <Link href={`/services/${el.id}`}>
            <a>
              <div className='relative cursor-pointer lg:w-[298px] lg:h-[241px] w-[160px] h-[130px] bg-cover mb-1 hover:drop-shadow-2xl' style={{backgroundImage: `url('${el.image}')`}}>
                <div className='absolute lg:w-[298px] lg:h-[241px] w-[160px] h-[130px] bg-[#000009] bg-opacity-30 hover:bg-[#c6c6c6] hover:bg-opacity-50 text-center bottom-0 inset-x-0'>
                  <p className='absolute lg:text-[40px] text-[24px] flex justify-center align-middle items-center text-white hover:font-bold inset-0 px-[50px]'>{el.title}</p>
                </div>
              </div>
            </a>
          </Link>
          </div>
        ))}
      </div>
    </div>
  )
}