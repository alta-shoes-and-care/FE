import React, {useEffect, useState} from "react";
import Image from "next/image";
import style from "../../styles/formpayment.module.css";

import { useRouter } from 'next/router';
import axios from "axios";
import NumberFormat from 'react-number-format';
import moment from "moment";
import Swal from "sweetalert2";


export default function endpoint() {

    const router = useRouter();
    let {id}=router.query
    const [loading, setLoading] = useState(false);
    
    const [invoice, setInvoice] = useState({
        'service_title': ""
        ,'qty': ""
        ,'payment_method_name': ""
        ,'city': ""
        ,'phone': ""
        ,'date': ""
        ,'address': ""
        ,'total': 0
        ,'url': ""
    });
    console.log(invoice)  
    
    useEffect(() => {
        setLoading(true);
        if (!localStorage.getItem("token")) {
            return router.push("/login");
        }
        else if(id!=='undefined'){
            const token = localStorage.getItem("token");
            const config = {
            headers: { Authorization: `Bearer ${token}` },
            }; 
            axios
                .get(`https://ynwahid.cloud.okteto.net/orders/${id}`,config)
                .then(({ data }) => {
                    setInvoice(data.data)
                    console.log(data.data,'berhasil get')
                })
                .catch((err) => {
                    console.log(err, "error bang");
                    if (err.response.status === 401) {
                        Swal.fire({
                          title: "Your session has ended!",
                          text: "Please login again to continue.",
                          icon: "error",
                          showCancelButton: false,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Ok",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            router.push("/login");
                            localStorage.clear();
                          }
                        });
                      }
                })
                .finally(() => {
                    setLoading(false);
                });  
            }
        }, [id]);
    

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
