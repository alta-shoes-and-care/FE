import React, {useEffect, useState} from "react";
import style from "../../styles/formpayment.module.css";

import { useRouter } from 'next/router';
import axios from "axios";
import NumberFormat from 'react-number-format';
import Swal from "sweetalert2";

export default function formpayment(props) {

    const router = useRouter();
    let {id}=router.query
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if(id!=='undefined'){
            setLoading(true);

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

        if (loading) {
            Swal.fire({
              title: "Please Wait!",
              html: "This may take a few seconds, please don't close this page.",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer:750,
                
              willOpen: () => {
                Swal.showLoading();
               },
            }); 
        }

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

                        <div className='my-auto ml-[25vw] z-3 w-[50vw] h-[70vh] bg-[#ffffff] bg-opacity-90 text-left rounded-lg'>
                            <div className="grid grid-cols-1 text-center mt-[1vh]  px-10 py-2">
                                <p className="text-black bold text-2xl">
                                    Service type: {services.title}
                                </p>
                                <p className="text-black text-md mt-[1vh]"> 
                                    {services.description}
                                </p>
                            </div>

                            {/*form Section */}

                            {/*patment - phone number - quantity */}

                            <div className="grid grid-cols-3 mt-[1vh]">
                                <h1 className="text-left text-[#175C8C] bold text-lg ml-[3vw]">
                                    Payment Method<dot className="text-red-600">*</dot>
                                </h1>
                                <h1 className="text-left text-[#175C8C] bold text-lg ml-[0.7vw]">
                                    Phone Number<dot className="text-red-600">*</dot>
                                </h1>
                                <h1 className="text-center text-[#175C8C] bold text-lg">
                                    Quantity<dot className="text-red-600">*</dot>
                                </h1>
                            </div>

                            <div className="grid grid-cols-3 ml-[0.5vw]">

                                <div className={style.input}>
                                    <select className="text-gray-500">
                                        <option selected disabled>
                                            Choose Payment
                                        </option>
                                        <option>

                                        </option>
                                    </select>
                                </div>

                                <div className="">
                                    <label htmlFor="phonenumber" className="sr-only">
                                        Phone number
                                    </label>
                                    <input
                                        id="phonenumber"
                                        name="phonenumber"
                                        type="phonenumber"
                                        maxLength="3"
                                        placeholder="Phone Number"
                                        autoComplete="off"
                                        required
                                        className="h-[30px] bg-transparent appearance-none relative block w-full px-3 py-2 border-2 border-primary placeholder-gray-500 text-gray-500 md:text-[18px] rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        value={""}
                                        onChange={(e) => {
                                        setPhonenumber(e.target.value);
                                        }}
                                    />
                                </div>

                                 <div className="">
                                    <label htmlFor="quantity" className="sr-only">
                                        Quantity
                                    </label>
                                    <input
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        maxLength="3"
                                        placeholder="1"
                                        autoComplete="off"
                                        required
                                        className="mx-auto h-[30px] bg-transparent appearance-none relative block w-[5vw] px-3 py-2 border-2 border-primary placeholder-gray-500 text-gray-500 md:text-[18px] rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        value={""}
                                        min="1"
                                        onChange={(e) => {
                                        setQuantity(e.target.value);
                                        }}
                                    />
                                </div>

                            </div>

                            {/*payment-phone number end */}

                            {/*city - pickup date*/}

                            <div className="grid grid-cols-3">
                                <h1 className="text-left text-[#175C8C] bold text-lg ml-[3vw]">
                                    City<dot className="text-red-600">*</dot>
                                </h1>
                                <h1 className="text-left text-[#175C8C] bold text-lg ml-[0.7vw]">
                                    Pick-Up Date<dot className="text-red-600">*</dot>
                                </h1>
                            </div>

                            <div className="grid grid-cols-3 ml-[0.5vw]">
                                <div className={style.input}>
                                    <select className="text-gray-500 w-[11.5vw]">
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

                                <div className="">
                                    <label htmlFor="pickupdate" className="sr-only">
                                        Pick up date
                                    </label>
                                    <input
                                        id="pickupdate"
                                        name="pickupdate"
                                        type="date"
                                        maxLength="3"
                                        placeholder="Pick Up Date"
                                        autoComplete="off"
                                        required
                                        className="ml-[0.1vw] h-[30px] bg-transparent appearance-none relative block w-full px-3 py-2 border-2 border-primary placeholder-gray-500 text-gray-500 md:text-[18px] rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        value={""}
                                        onChange={(e) => {
                                        setPhonenumber(e.target.value);
                                        }}
                                    />
                                </div>

                            </div>

                            {/*city - pickup date */}

                            {/*Adress - Subtotal*/}

                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-[#175C8C] bold text-lg ml-[3vw]">
                                    Address <dot className="text-red-600">*</dot>
                                </h1>
                            </div>

                            <div className="grid grid-cols-2 ml-[6vh]">

                                <div className="">
                                    <label htmlFor="Address" className="sr-only">
                                        Address
                                    </label>
                                    <textarea
                                        id="Address"
                                        name="Adress"
                                        type="text"
                                        maxLength="3"
                                        placeholder="Adress"
                                        autoComplete="off"
                                        required
                                        className="h-[20vh] bg-transparent appearance-none relative block w-[30.5vw] px-3 py-2 border-2 border-primary placeholder-gray-500 text-gray-500 md:text-[18px] rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        value={""}
                                        onChange={(e) => {
                                        setAdress(e.target.value);
                                        }}
                                    />
                                </div>

                                <div className="ml-[7vw]">
                                    <div className="">
                                        <p className="text-2xl text-center bold">Subtotal</p>
                                        <h1 className="text-2xl text-center bold">
                                            <NumberFormat value={services.price} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} />,00
                                        </h1>
                                    </div>
                                    <button className="ml-[2.5vw] bg-primary hover:bg-white text-white hover:text-primary font-bold py-2 px-3 border-2 border-primary rounded-lg mt-[1vh]">
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

            <style jsx global>{`
                select option {
                    background-opacity:0;
                }
            `}</style>

        </section>
    );
}