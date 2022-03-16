import React, {useEffect, useState} from "react";
import style from "../../styles/formpayment.module.css";

import { useRouter } from 'next/router';
import axios from "axios";
import NumberFormat from 'react-number-format';
import moment from "moment";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

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
        ,'user_id'  :id
    });
    
    // history for validate checker
    const [history, setHistory] = useState([[]]);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        if (!localStorage.getItem("token")) {
          router.push("/login");
        }
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(`https://ynwahid.cloud.okteto.net/orders/me`, config)
        .then(({ data }) => {
            setHistory(data.data);
            console.log(data.data, "masuk");
        })
        .catch((err) => {
          console.log(err.response, "error");
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);
    // end load history
    
     useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/login");
        }
        else if(localStorage.getItem("is_admin") == "true"){
            return router.push("/404");
          }
        else if(id!=='undefined'){
            setLoading(true);
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
                  router.push(`/endpoint/${id}`)
                  window.open(`${invoice.url}`,"_blank")
                }
            });
        }


        if(history[0].user_id !== invoice.user_id
            && history[0].user_id !== undefined 
            && invoice.user_id !== undefined ) {

            console.log("ga valid")
            router.push("/404")
        }
        else if(history[0].user_id == invoice.user_id 
            && history[0].user_id !== undefined 
            && invoice.user_id !== undefined ) {

            console.log("mantap valid")

        }

    if (loading) {
        return (<Loading/>)
        }
    
    
    return (
        <section>
            <div className={`bold z-0 grid grid-cols-1 w-screen h-screen bg-cover ${style.bgImage2}  `}>  
                <div className='bold z-1 w-[100vw] h-screen bg-[#000009] bg-opacity-5 text-left'>
                    <div class="z-2 grid grid-cols-1 gap-4 bg-cover ">
                        <div className="mt-[2vh]">
                            <p className="text-5xl text-center text-white">
                                Payment Invoice
                            </p>
                        </div>
                        {/* Desc Card */}
                        <div className='ml-[30vw] z-3 w-[40vw] h-auto bg-[#ffffff] bg-opacity-90  text-left rounded-lg p-5'>
                            
                            <div className="grid grid-cols-1 center mb-2">
                                <p className="text-black text-center bold text-3xl">
                                    Service type: {invoice.service_title}  
                                </p>
                            </div>
                    
                           
                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-black bold text-lg  ml-[4vw]">
                                    Order Number  : 
                                </h1>
                                <h1 className="text-left text-black bold text-lg ml-[4vw]">
                                    Quantity (pairs) : 
                                </h1>
                            </div>
                            <div className="grid grid-cols-2 mb-1">
                                <h1 className="text-left text-primary bold text-md ml-[4vw]">
                                    #{id}
                                </h1>
                                <h1 className="text-left text-primary bold text-md ml-[4vw]">
                                    {invoice.qty}
                                </h1>
                            </div>
                           
                          
                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-black bold text-lg mt-[1vh] ml-[4vw]">
                                    Payment Method  : 
                                </h1>
                                <h1 className="text-left text-black bold text-lg mt-[1vh] ml-[4vw]">
                                    Phone Number : 
                                </h1>
                            </div>
                            <div className="grid grid-cols-2 mb-1">
                                <h1 className="text-left text-primary bold text-md ml-[4vw]">
                                    {invoice.payment_method_name}
                                </h1>
                                <h1 className="text-left text-primary bold text-md ml-[4vw]">
                                    {invoice.phone}
                                </h1>
                            </div>
                           
                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-black bold text-lg mt-[2vh] ml-[4vw]">
                                    City  :
                                </h1>
                                <h1 className="text-left text-black bold text-lg mt-[2vh] ml-[4vw]">
                                    Pick-Up Date :
                                </h1>
                            </div>
                            <div className="grid grid-cols-2 mb-1">
                                <h1 className="text-left text-primary bold text-md ml-[4vw]">
                                    {invoice.city}
                                </h1>
                                <div className="text-left text-primary bold text-md ml-[4vw]">
                                    {moment(invoice.date).format('LL')}
                                </div>
                            </div>
                       
                            <div className="grid grid-cols-2">
                                <h1 className="text-left text-black bold text-lg mt-[2vh] ml-[4vw]">
                                    Adress  :
                                </h1>
                            </div>
                            <div className="grid grid-cols-1  mb-1">
                                <h1 className="text-justify text-primary bold text-md ml-[4vw] pr-[5vw] max-h-[15vh] overflow-hidden">
                                    {invoice.address}
                                </h1>
                            </div>
                          
                        </div>
                      
                        <div className="ml-[25vw] mt-[-1vh] text-center">
                            <div className="bold text-white text-2xl">
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

                    </div>
                </div>
            </div>
        </section>
    );
}
