import React, {useEffect, useState} from "react";
import Image from "next/image";
import style from "../../styles/formpayment.module.css";

import { useRouter } from 'next/router';
import axios from "axios";
import NumberFormat from 'react-number-format';
import moment from "moment";
import Swal from "sweetalert2";
import Service from "../../components/Service";


export default function endpoint() {

    const router = useRouter();
    let {id}=router.query
    const [loading, setLoading] = useState(false);
    let statuss="";
    
    const [invoice, setInvoice] = useState({
        'is_paid': ""
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
    
        if (invoice.is_paid == false ){
           statuss= <div className="text-red-600 text-center bold text-xl mt-[2vh]">Payment is Not Completed</div>
        }
        else {
           statuss= <div className="text-green-600 text-center bold text-xl mt-[2vh]">Payment is Completed</div>
        }

        function refreshPage() {
            window.location.reload(false);
          }
        
        function handlehistory(){
            setLoading(true);
            router.push(`/history-order`)
        }
    

    return (
        <section>
            <div className={`z-0 grid grid-cols-1 h-screen bg-cover ${style.bgImage3}  `}>  
                <div className='z-1 w-[100vw] h-screen bg-[#000009] bg-opacity-0 text-left'>
                    <div class="z-2 grid grid-cols-1 gap-4 bg-cover">
                        {/* Desc Card */}
                        <div className='ml-[20vw] mt-[10vh] z-3 w-[40vw] h-auto bg-[#ffffff] bg-opacity-80 hover:shadow-xl text-left rounded-lg pb-5'>
                            <div className="grid grid-cols-1 text-center px-10 py-3">
                                <p className="text-black text-center bold text-4xl">
                                    Thankyou for using our services {invoice.payment_status}
                                </p>
                                <p className="text-gray-600 text-md text-center mt-[3vh]"> 
                                    If you already finished the payment, click refresh to check the payment status
                                </p>
                            </div>
                            <div className="grid grid-cols-1 text-center w-[20vw] mt-[1vh] ml-[10vw]">
                                <button class="bg-[#175C8C] hover:bg-white text-white hover:text-black font-bold py-2 px-2 border border-black rounded-lg"
                                onClick={refreshPage}>
                                    <p className="text-md text-center rounded-xl"> Refresh Payment Status</p>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 text-center px-10 py-3">
                                <p className="text-black text-center bold text-2xl">
                                    Payment Status :
                                </p>
                                {statuss}
                            </div>
                            <div className="grid grid-cols-1 text-center w-[20vw] mt-[3vh] ml-[10vw]">
                                <button class="bg-[#175C8C] hover:bg-white text-white hover:text-black font-bold py-2 px-2 border border-black rounded-lg"
                                onClick={handlehistory}>
                                    <p className="text-md text-center rounded-xl"> Order History </p>
                                </button>
                            </div>
                            <p className="text-gray-600 text-md text-center mt-[2.5vh]"> 
                                Click to check your order history 
                            </p>
                            <p className="text-black text-md text-center mt-[1vh]"> 
                                Or
                            </p>
                            <p className="text-primary text-md text-center mt-[1vh]"> 
                                See our other services bellow on this page
                            </p>
                        </div>
                        {/* Desc Card End*/}
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 pt-2">
                <Service />
            </div>
        </section>
    );
}
