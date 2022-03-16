import React, { useEffect, useState } from "react";
import style from "../../styles/formpayment.module.css";

import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import Service from "../../components/Service";
import Loading from "../../components/Loading";

export default function endpoint() {
    const router = useRouter();
    let { id } = router.query;
    const [loading, setLoading] = useState(false);

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

    //put payment
    function refreshPage() {
      const token = localStorage.getItem("token");
      const config = {
          headers: { Authorization: `Bearer ${token}` },
      };
      if(invoice.is_paid === true ){
        Swal.fire({
          title: "Your Payment already Completed",
          text: "Thankyou for using our services :)",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        })
      }
      else {
      setLoading(true);
      axios
        .put(
        `https://ynwahid.cloud.okteto.net/orders/check-payment/${id}`,
        {},
        config
        )
        .then(({ data }) => {
        console.log(data, "berhasil put");
        location.reload();
        })
        .catch((err) => {
        console.log(err, "error bang");
        })
        .finally(() => {
        setLoading(false);
        });
      }
    }

    function handlehistory() {
        setLoading(true);
        router.push(`/history-order`);
    }

    function handlePayment() {
      window.open(`${invoice.url}`,"_blank")
    }

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
      ,'is_paid': false
      ,'user_id'  : undefined
    });
    console.log(invoice)  

    //get invoice
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
      <div
        className={`z-0 grid grid-cols-1 h-screen bg-cover ${style.bgImage3}  `}
      >
        <div className="z-1 w-[100vw] h-screen bg-[#000009] bg-opacity-0 text-left">
          <div className="z-2 grid grid-cols-1 gap-4 bg-cover">
            {/* Desc Card */}
            <div className="container ml-[20vw] mt-[10vh] z-3 w-[40vw] h-auto bg-[#ffffff] bg-opacity-80 hover:shadow-xl text-left rounded-lg pb-5">
              <div className="grid grid-cols-1 text-center px-10 py-3">
                <p className="text-black text-center bold text-4xl">
                  Thankyou for using our services
                </p>
                <p className="text-gray-900 bold text-md text-center mt-[3vh]">
                  If you already finished the payment, click refresh to check your payment status
                </p>
              </div>
              <div className="grid grid-cols-1 text-center w-[20vw] mt-[1vh] ml-[10vw]">
                <button
                  className="bg-[#175C8C] hover:bg-white text-white hover:text-black font-bold py-2 px-2 border border-black rounded-lg"
                  onClick={refreshPage}
                >
                  <p className="text-md text-center rounded-xl">
                    {" "}
                    Refresh Payment Status
                  </p>
                </button>
              </div>
              <div className="grid grid-cols-1 text-center px-10 py-3">
                <p className="text-black text-center bold text-2xl">
                  Order #{id} Payment Status :
                </p>
                {invoice.is_paid === true ? (
                  <div className="text-green-600 text-center bold text-xl mt-[2vh]">
                    Payment is Completed
                  </div>
                ) : (
                  <div className="text-red-600 text-center bold text-xl mt-[2vh]">
                    Payment is Not Completed
                  </div>
                )}
              </div>
              <p className="text-gray-900 text-md text-center mt-[5vh]">
                Forgot to pay? see you payment receipt
                <beb  className=" px-1 italic underline text-primary cursor-pointer" onClick={handlePayment} >
                  here
                </beb>
              </p>
              <p className="text-gray-900 bold text-sm text-center mt-[1vh]">Or</p>
              <p className="text-gray-900 bold text-md text-center mt-[1vh]">
                Click
                <beb  className=" px-1 italic underline text-primary cursor-pointer" onClick={handlehistory}>
                    here
                </beb>
                to check your order history
              </p>
            </div>
            {/* Desc Card End*/}
          </div>
        </div>
      </div>
      <div id="services" className="grid grid-cols-1 pt-2">
        <Service />
      </div>
    </section>
    );
  }
