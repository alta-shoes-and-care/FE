import React, {useEffect, useState} from "react";
import style from "../../styles/formpayment.module.css";

import { useRouter } from 'next/router';
import axios from "axios";
import NumberFormat from 'react-number-format';

export default function formpayment(props) {

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
            <div className={`z-0 grid grid-cols-1 h-[650px] bg-cover mt-[-100px] ${style.bgImage}  `}> 
                <div className='z-1 w-[100vw] h-[650px] bg-[#000009] bg-opacity-30 text-center'>
                    <div className="z-2 grid grid-cols-1 gap-4 bg-cover mt-[100px]">
                        <div className="mt-[0.5vh]">
                            <p className="text-3xl text-white">
                                Confirm your order
                            </p>
                        </div>
                        {/* Desc Card */}
                        <div className='my-auto ml-[25vw] z-3 w-[50vw] h-[70vh] bg-[#ffffff] bg-opacity-60 hover:bg-opacity-80 text-left rounded-lg'>
                            <div className="grid grid-cols-1 text-center mt-[1vh]  px-10 py-2">
                                <p className="text-black bold text-xl">
                                    Service type: {services.title}
                                </p>
                                <p className="text-black text-sm mt-[1vh]"> 
                                    {services.description}
                                </p>
                            </div>
                            {/*form Section */}
                            {/*patment - phone number - quantity */}
                            <div className="grid grid-cols-3 mt-[1vh]">
                                <h1 className="text-left text-[#175C8C] bold text-lg ml-[3vw]">
                                    Payment Method<dot className="text-red-600">*</dot>
                                </h1>
                                <h1 className="text-left text-[#175C8C] bold text-lg ml-[2vw]">
                                    Phone Number<dot className="text-red-600">*</dot>
                                </h1>
                                <h1 className="ml-[2.5vh] text-center text-[#175C8C] bold text-lg">
                                    Quantity<dot className="text-red-600">*</dot>
                                </h1>
                            </div>
                            <div className="grid grid-cols-3 ml-[5vh]">
                                <div className={style.input}>
                                    <select>
                                        <option selected disabled>
                                            Choose Payment
                                        </option>
                                    </select>
                                </div>
                                <div className={style.input}>
                                    <input type="text" id='text' name='text' placeholder='Phone Number' required />
                                </div>
                                <div className={style.input3}>
                                    <input className="text-center" type="number" id='number' name='Number' min='1' placeholder='1' required />
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
                                    <select>
                                        <option selected disabled>
                                            Choose City
                                        </option>
                                        <option>Tangerang</option>
                                        <option>Jakarta Pusat</option>
                                        <option>Jakarta Selatan</option>
                                        <option>Jakarta Barat</option>
                                        <option>Depok</option>
                                        <option>Bandung</option>
                                        <option>Pekalongan</option>
                                        <option>Klaten</option>
                                        <option>Banyuwangi</option>
                                        <option>Madura</option>
                                        <option>Malang</option>
                                        <option>Semarang</option>
                                        <option>Surabaya</option>
                                        <option>Yogyakarta</option>
                                    </select>
                                </div>
                                <div className={style.input}>
                                    <input type="date" id='date' name='date' placeholder='Pick-Up Date' required />
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
                                    <input class="" type="Adress" id='Adress' name='Adress' placeholder='Adress' required />
                                </div>
                                <div className="ml-[10vw]">
                                    <div className="ml-[-1vh]">
                                        <p className="text-2xl text-center bold">Subtotal</p>
                                        <h1 className="text-2xl text-center bold">
                                            <NumberFormat value={services.price} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} />,00
                                        </h1>
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