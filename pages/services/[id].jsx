import React, {useEffect, useState} from "react";
import Service from "../../components/Service";

import { useRouter } from 'next/router';
import axios from "axios";
import NumberFormat from 'react-number-format';

export default function services() {

    const router = useRouter();
    let {id}=router.query
    console.log(router.query.id)

    useEffect(() => {
        if(id!=='undefined'){
            console.log('running use effect')

            axios
                .get(`https://ynwahid.cloud.okteto.net/services/${id}`)
                .then(({ data }) => {
                    setServices(data.data)
                    console.log(data.data,'berhasil get')
                })
                .catch((err) => {
                    console.log(err, "error bang");
                });
            }
        }, [id]);

        const [services, setServices] = useState({
            'city': ""
            ,'description': ""
            ,'id': 0
            ,'name': ""
            ,'price': 0
            ,'user_id': 0
        });
        console.log(services)

    return (
        <section>
            <div class="z-0 grid grid-cols-1 h-[650px] bg-cover mt-[-100px]" style={{backgroundImage: `url('${services.image}')`}}> 
                <div className='z-1 w-[100vw] h-[650px] bg-[#000009] bg-opacity-30 text-center'>
                    <div class="z-2 grid grid-cols-2 gap-4 bg-cover mt-[100px]">
                        {/* Desc Card */} 
                        <div className='ml-[15vh] mt-[10vh] z-3 w-[75vh] h-[60vh] bg-[#ffffff] bg-opacity-90  text-left rounded-lg'>
                            <p className="text-black bold text-4xl mt-[3.5vh] ml-[5vh]">
                                {services.title}  
                            </p>
                            <p className="text-black text-xl mt-[7.5vh] ml-[5vh] w-[65vh]"> 
                                {services.description}
                            </p>
                            <h1 className="text-md italic ml-[5vh] mt-[15vh]"> Service may varry depend on shoes material<bintang className="text-red-600">*</bintang></h1>
                        </div>
                        {/* Desc Card End*/}
                        {/* Price and Button*/}
                        <div class="z-4 object-bottom ml-[5vh]">
                            <p className="z-5 text-white text-6xl mt-[55vh] mb-[3vh]"> 
                                <NumberFormat value={services.price} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} />,00
                            </p>
                            <button class="bg-[#175C8C] hover:bg-white text-white hover:text-black font-bold py-4 px-6 border border-black rounded-lg"
                            onClick={() => router.push(`/payment/${services.id}`)} >
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
