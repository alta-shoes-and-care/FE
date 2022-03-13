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
      icon: "warning",
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

  function validateButton() {
    // validation for blank

    if (
      payment_method_id === "" ||
      city === "" ||
      phone === "" ||
      date === "" ||
      qty === "" ||
      address === ""
    ) {
      Swal.fire(
        "Invalid!",
        "Forms can't be empty, please fill out the blank fields.",
        "error"
      );

      // validation kedua belum diganti
    } else if (
      payment_method_id === "" ||
      city === "" ||
      phone === "" ||
      date === "" ||
      qty === "" ||
      address === ""
    ) {
      Swal.fire(
        "Invalid!",
        "Forms can't be empty, please fill out the blank fields.",
        "error"
      );
    } else {
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
        className={`z-0 grid grid-cols-1 h-[675px] bg-cover mt-[-100px] ${style.bgImage}  `}
      >
        <div className="z-1 w-[100vw] h-[650px] bg-[#000009] bg-opacity-30 text-center">
          <div className="z-2 grid grid-cols-1 gap-4 bg-cover mt-[100px]">
            <div className="mt-[2.5vh]">
              <p className="text-5xl text-white">Confirm your order</p>
            </div>

            {/* Desc Card */}

            <div className="my-auto ml-[25vw] z-3 w-[50vw] h-[71vh] bg-[#ffffff] bg-opacity-90 text-left rounded-lg">
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
                    <option value={1}>Payment 1</option>
                    <option value={2}>Payment 2</option>
                    <option value={3}>Payment 3</option>
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
                    className="mx-auto h-[30px] bg-transparent appearance-none relative block w-[5vw] px-3 py-2 border-2 border-primary placeholder-gray-500 text-gray-500 md:text-[18px] rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    min="1"
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
