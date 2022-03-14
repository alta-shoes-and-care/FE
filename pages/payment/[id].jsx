import React, { useEffect, useState } from "react";
import style from "../../styles/formpayment.module.css";

import { useRouter } from "next/router";
import axios from "axios";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";

export default function formpayment(props) {
  const router = useRouter();
  let { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newId, setnewId] = useState(0);
  
  //for validation
  let validate1 = "";
  let validate2 = "";
  let validate3 = "";
  let validate4 = "";
  let validate5 = "";
  let validate6 = "";
  let validatetotal= "";

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return router.push("/login");
    } else if (id !== "undefined") {
      setLoading(true);

      axios
        .get(`https://ynwahid.cloud.okteto.net/services/${id}`)
        .then(({ data }) => {
          setServices(data.data);
          setnewId(data.data.id);
          console.log(data.data, "berhasil get");
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
        })
    }
  }, [id]);

  const [services, setServices] = useState({
    city: "",
    description: "",
    id: 0,
    name: "",
    price: 0,
    user_id: 0,
  });
  console.log(services);

  const [qty, setQty] = useState(0);
  const [payment_method_id, setPayment_method_id] = useState(0);
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const total = qty * services.price;
  const service_id = +id;

  function handleButton() {
    return Swal.fire({
      title: "Confirm your Order?",
      text: "",
      icon: "question",
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setConfirmLoading(true);

        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const body = {
          service_id: newId,
          qty: +qty,
          total: +total,
          payment_method_id: +payment_method_id,
          date: date,
          address: address,
          city: city,
          phone: phone,
        };

        axios
          .post("https://ynwahid.cloud.okteto.net/orders", body, config)
          .then(({ data }) => {
            console.log(data, "diisi apa gitu");

            Swal.fire({
              icon: "success",
              title: "Order Success",
            });
            setTimeout(() => {
              router.push(`/invoice/${data.data.id}`);
            }, 750);
          })
          .catch((err) => {
            Swal.fire("Order failed!", "catch error", "error");
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
            setConfirmLoading(false);
          });
      } else if (result.isDenied) {
        setConfirmLoading(false);
      }
    });
  }

  
  function handlevalidate(){
    if (
      payment_method_id === 0
    ) {
       validate1 = "Payment Method "
    }  
    if (
      city === ""
    ) {
      validate2 = " City "
    } 
    if (
      phone === ""
    ) {
      validate3 = " Phone Number "
    } 
    if (
      date === ""
    ) {
      validate4 = " Date "
    } 
    if (
      qty === 0
    ) {
       validate5 = " Quantity "
    }
    if (
      address === ""
    ) {
       validate6 = " Adress"
    } 

    var string=`${validate1}${validate2}${validate3}${validate4}${validate5}${validate6}`
    var string2=string.split('  ').join(', ');
    validatetotal=string2
  }
 
 
  function validateButton() {

    handlevalidate();
    
    if (
      payment_method_id === "0" ||
      city === "" ||
      phone === "" ||
      date === "" ||
      qty === "0" ||
      address === ""
    ) {
      Swal.fire(
        "Please fill out the form!",
        `${validatetotal} form can't be empty. Please fill out the empty fields.`,
        "warning"
      );
    } else if (
      !/^[0-9]+(.[0-9]{0})?$/.test(phone)
    ) {
      Swal.fire("Invalid!", "Invalid Phone Number Format", "error");
    } else if (
      !/^[0-9]+(.[0-9]{0})?$/.test(qty)
    ) {
      Swal.fire("Invalid!", "Quantity cannot be Negative", "error");
    }else {
      handleButton();
    }
  }

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

    if (confirmLoading) {
        Swal.fire({
          title: "Please Wait!",
          html: "This may take a few seconds, please don't close this page.",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer:3000,
            
          willOpen: () => {
            Swal.showLoading();
           },
        }); 
        }

  return (
    <section>
      <div
        className={`z-0 grid grid-cols-1 h-screen bg-cover  ${style.bgImage}  `}
      >
        <div className="z-1 w-[100vw] h-screen bg-[#000009] bg-opacity-30 text-center">
          <div className="z-2 grid grid-cols-1 gap-4 bg-cover">
            <div className="mt-[2.5vh]">
              <p className="text-5xl text-white">Confirm your order</p>
            </div>

            {/* Desc Card */}

            <div className="my-auto ml-[25vw] z-3 w-[50vw] h-auto bg-[#ffffff] bg-opacity-80 text-left rounded-lg pb-5">
              <div className="grid grid-cols-1 text-center mt-[0.5vh]  px-10 py-2">
                <p className="text-black bold text-2xl">
                  Service type: {services.title}
                </p>
                <p className="text-gray-800 text-justify text-md mt-[1vh]">
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
                <h1 className="text-left text-[#175C8C] bold text-lg ml-[3vw]">
                  Quantity<dot className="text-red-600">*</dot>
                </h1>
              </div>

              <div className="grid grid-cols-3 ml-[0.5vw]">
                <div className={style.input}>
                  <select
                    className="text-gray-500"
                    value={payment_method_id}
                    onChange={(e) => {
                      setPayment_method_id(e.target.value);
                    }}
                  >
                    <option value={0} disabled="true">
                      Choose Payment
                    </option>
                    <option value={1}>BCA Click Pay</option>
                    <option value={2} disabled="true">Payment 2</option>
                    <option value={3} disabled="true">Payment 3</option>
                  </select>
                </div>

                <div className="">
                  <label htmlFor="phonenumber" className="sr-only">
                    Phone number
                  </label>
                  <input
                    id="phonenumber"
                    name="phonenumber"
                    type="text"
                    inputMode="numeric"
                    maxLength="13"
                    placeholder="Phone Number"
                    autoComplete="off"
                    required
                    className="h-[30px] bg-transparent appearance-none relative block w-full px-3 py-2 border-2 border-primary placeholder-gray-500 text-gray-500 md:text-[18px] rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>

                <div className="ml-[-6vw]">
                  <label htmlFor="quantity" className="sr-only">
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    maxLength="1"
                    placeholder="0"
                    autoComplete="off"
                    required
                    className="mx-auto h-[30px] form-control bg-transparent appearance-none relative block w-[5vw] px-3 py-2 border-2 border-primary placeholder-gray-500 text-gray-500 md:text-[18px] rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    min="1"
                    max="9"
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
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
                  <select
                    className="text-gray-500 w-[11.5vw]"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  >
                    <option value={""} disabled="true">
                      Choose City
                    </option>
                    <option value={"Tanggerang"}>Tangerang</option>
                    <option value={"Jakarta Pusat"}>Jakarta Pusat</option>
                    <option value={"Jakarta Selatan"}>Jakarta Selatan</option>
                    <option value={"Jakarta Barat"}>Jakarta Barat</option>
                    <option value={"Depok"}>Depok</option>
                    <option value={"Bandung"}>Bandung</option>
                    <option value={"Pekalongan"}>Pekalongan</option>
                    <option value={"Klaten"}>Klaten</option>
                    <option value={"Banyuwangi"}>Banyuwangi</option>
                    <option value={"Madura"}>Madura</option>
                    <option value={"Malang"}>Malang</option>
                    <option value={"Semarang"}>Semarang</option>
                    <option value={"Surabaya"}>Surabaya</option>
                    <option value={"Yogyakarta"}>Yogyakarta</option>
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
                    maxLength="100"
                    placeholder="Pick Up Date"
                    autoComplete="off"
                    required
                    className="ml-[0.1vw] h-[30px] bg-transparent appearance-none relative block w-full px-3 py-2 border-2 border-primary placeholder-gray-500 text-gray-500 md:text-[18px] rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </div>
              </div>

              {/*city - pickup date */}

              {/*Address - Subtotal*/}

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
                    maxLength="300"
                    placeholder="Address"
                    autoComplete="off"
                    required
                    className="h-[20vh] bg-transparent appearance-none relative block w-[30.5vw] px-3 py-2 border-2 border-primary placeholder-gray-500 text-gray-500 md:text-[18px] rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>

                <div className="ml-[7vw]">
                  <div className="">
                    <p className="text-2xl text-center bold">Subtotal</p>
                    <h1 className="text-2xl text-center bold">
                      <NumberFormat
                        value={total}
                        displayType={"text"}
                        decimalSeparator={","}
                        thousandSeparator={"."}
                        prefix={"Rp"}
                      />
                      ,00
                    </h1>
                  </div>
                  <button
                    className="ml-[2.5vw] bg-primary hover:bg-white text-white hover:text-primary font-bold py-2 px-3 border-2 border-primary rounded-lg mt-[1vh]"
                    onClick={validateButton}
                  >
                    <p className="text-md text-center rounded-xl">
                      {" "}
                      Confirm Order{" "}
                    </p>
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
          background-opacity: 0;
        }
      `}</style>
    </section>
  );
}
