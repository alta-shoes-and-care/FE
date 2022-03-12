import React, {useEffect, useState} from "react";
import style from "../../styles/formpayment.module.css";

import { useRouter } from 'next/router';
import axios from "axios";
import NumberFormat from 'react-number-format';
import moment from "moment";
import Swal from "sweetalert2";


export default function invoice() {

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
    
        function handleButton(){
            return Swal.fire({
                title: "Confirm your Payment?",
                text: "",
                icon: "question",
                showDenyButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
              }).then((result) => {
                if (result.isConfirmed) {
                  setLoading(true);
                  window.open(`${invoice.url}`,"_blank")
                  router.push(`/endpoint/${id}`)
                }
            });
        }
    
    return (
        <section>
            <div className={`z-0 grid grid-cols-1 h-[650px] bg-cover mt-[-100px] ${style.bgImage2}  `}>  
                <div className='z-1 w-[100vw] h-[650px] bg-[#000009] bg-opacity-0 text-left'>
                    <div class="z-2 grid grid-cols-1 gap-4 bg-cover mt-[100px]">
                        <div className="mt-[2vh]">
                            <p className="text-4xl text-center text-white">
                                Payment Invoice
                            </p>
                        </div>
                        {/* Desc Card */}
                        <div className='ml-[30vw] mt-[-2vh] z-3 w-[40vw] h-[65vh] bg-[#ffffff] bg-opacity-80 hover:bg-opacity-100 text-left rounded-lg'>
                            <div className="grid grid-cols-1 text-left px-10 py-2">
                                <p className="text-black text-center bold text-2xl">
                                    Service type: {invoice.service_title}  
                                </p>
                            </div>
                            {/*Invoice Section */}
                            {/*quantity */}
                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-black bold text-lg ml-[3vw]">
                                    Quantity (Pairs): {invoice.qty}
                                </h1>
                            </div>
                            {/*quantity end*/}
                            {/*patment - phone number */}
                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-black bold text-lg ml-[3vw]">
                                    Payment Method  : 
                                </h1>
                                <h1 className="text-left text-black bold text-lg ml-[3vw]">
                                    Phone Number : 
                                </h1>
                            </div>
                            <div className="grid grid-cols-2 mb-1">
                                <h1 className="text-left text-black bold text-md ml-[3vw]">
                                    {invoice.payment_method_name}
                                </h1>
                                <h1 className="text-left text-black bold text-md ml-[3vw]">
                                    {invoice.phone}
                                </h1>
                            </div>
                            {/*payment-phone number end */}
                            {/*city - pickup date*/}
                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-black bold text-lg ml-[3vw]">
                                    City  :
                                </h1>
                                <h1 className="text-left text-black bold text-lg ml-[3vw]">
                                    Pick-Up Date :
                                </h1>
                            </div>
                            <div className="grid grid-cols-2 mb-1">
                                <h1 className="text-left text-black bold text-md ml-[3vw]">
                                    {invoice.city}
                                </h1>
                                <div className="text-left text-black bold text-md ml-[3vw]">
                                    {moment(invoice.date).format('LL')}
                                </div>
                            </div>
                            {/*city - pickup date */}
                            {/*Adress - Subtotal*/}
                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-black bold text-lg ml-[3vw]">
                                    Adress  :
                                </h1>
                            </div>
                            <div className="grid grid-cols-1 max-w-[38vw] mb-1">
                                <h1 className="text-left text-black bold text-md ml-[3vw]">
                                    {invoice.address} 
                                </h1>
                            </div>
                            {/*Adress - subtotal end*/}
                            {/*Invoice end */}
                        </div>
                        {/* Desc Card End*/}
                        {/* Button Subtotal*/}
                        <div className="ml-[25vw] mt-[-1vh] text-center">
                            <div className="bold text-xl">
                                Subtotal : <NumberFormat
                                value={invoice.total}
                                displayType={"text"}
                                decimalSeparator={","}
                                thousandSeparator={"."}
                                prefix={"Rp"}
                            />
                            </div>
                            <button class="mt-[1vh] ml-[3vw] bg-[#175C8C] hover:bg-white text-white hover:text-black font-bold py-2 px-3 border border-black rounded-lg"
                            onClick={handleButton}
                            type="button">
                                <p className="text-md text-center rounded-xl"> Confirm Payment </p>
                            </button>
                        </div>
                        {/* Button Subtotal end*/}
                    </div>
                </div>
            </div>
        </section>
    );
}
