import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "../../styles/formpayment.module.css";

import { useRouter } from "next/router";
import axios from "axios";
import NumberFormat from "react-number-format";
import moment from "moment";
import Swal from "sweetalert2";
import Service from "../../components/Service";

export default function endpoint() {
    const router = useRouter();
    let { id } = router.query;
    const [loading, setLoading] = useState(false);

    if (loading) {
        Swal.fire({
        title: "Please Wait!",
        html: "This may take a few seconds, please don't close this page.",
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500,

        willOpen: () => {
            Swal.showLoading();
        },
        });
    }

    //put payment
    function refreshPage() {
        setLoading(true);
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
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

    function handlehistory() {
        setLoading(true);
        router.push(`/history-order`);
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
      ,'is_paid': ""
    });
    console.log(invoice)  

    //get invoice
    useEffect(() => {
      setLoading(true);
      if (!localStorage.getItem("token")) {
          router.push("/login");
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
      

  return (
    <section>
      <div
        className={`z-0 grid grid-cols-1 h-screen bg-cover ${style.bgImage3}  `}
      >
        <div className="z-1 w-[100vw] h-screen bg-[#000009] bg-opacity-0 text-left">
          <div className="z-2 grid grid-cols-1 gap-4 bg-cover">
            {/* Desc Card */}
            <div className="ml-[20vw] mt-[10vh] z-3 w-[40vw] h-auto bg-[#ffffff] bg-opacity-80 hover:shadow-xl text-left rounded-lg pb-5">
              <div className="grid grid-cols-1 text-center px-10 py-3">
                <p className="text-black text-center bold text-4xl">
                  Thankyou for using our services
                </p>
                <p className="text-gray-600 text-md text-center mt-[3vh]">
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
                  Payment Status :
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
              <p className="text-gray-600 text-md text-center mt-[5vh]">
                Click
                <beb  className=" px-1 italic underline text-primary cursor-pointer" onClick={handlehistory}>
                    here
                </beb>
                to check your order history
              </p>
              <p className="text-gray-900 text-sm text-center mt-[1vh]">Or</p>
              <p className="text-gray-600 text-md text-center mt-[1vh]">
                See our 
                <beb  className=" px-1 italic underline text-primary cursor-pointer" >
                  other services 
                </beb>
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
