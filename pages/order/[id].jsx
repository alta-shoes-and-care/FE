import React, { useEffect, useState } from "react";
import style from "../../styles/formpayment.module.css";

import { useRouter } from "next/router";
import axios from "axios";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

export default function formpayment(props) {
  const router = useRouter();
  let { id } = router.query;

  const [qty, setQty] = useState(0);
  const [newId, setnewId] = useState(0);
  const [payment_method_id, setPayment_method_id] = useState(0);
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [history, setHistory] = useState([[]]);
  const [services, setServices] = useState({
    city: "",
    description: "",
    id: 0,
    name: "",
    price: 0,
    user_id: 0,
  });
  const total = qty * services.price;
  let payment_method_name = "";

  //for validation
  let validate1 = "";
  let validate2 = "";
  let validate3 = "";
  let validate4 = "";
  let validate5 = "";
  let validate6 = "";
  let validatetotal = "";

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return router.push("/login");
    } else if (localStorage.getItem("is_admin") == "true") {
      return router.push("/404");
    } else if (id) {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(`https://ynwahid.cloud.okteto.net/services/${id}`)
        .then(({ data }) => {
          setServices(data.data);
          setnewId(data.data.id);
          return axios.get(
            `https://ynwahid.cloud.okteto.net/orders/me`,
            config
          );
        })
        .then(({ data }) => {
          setHistory(data.data);
        })
        .catch((err) => {
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

  // Button Handle

  function handleButton() {
    paymentname(payment_method_id);
    return Swal.fire({
      title: "Confirm your Order?",
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
          payment_method_name: payment_method_name,
          date: date,
          address: address,
          city: city,
          phone: phone,
        };
        axios
          .post("https://ynwahid.cloud.okteto.net/orders", body, config)
          .then(({ data }) => {
            Swal.fire({
              icon: "success",
              title: "Order Success",
              confirmButtonText: "Ok",
              confirmButtonColor: "#3085d6",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                router.push(`/invoice/${data.data.id}`);
              }
            });
          })
          .catch((err) => {
            Swal.fire(
              "Order failed!",
              "Sorry, Something gone wrong. Please try again later.",
              "error"
            );
            if (err.response.status === 401) {
              Swal.fire({
                title: "Your session has ended!",
                text: "Please login again to continue.",
                icon: "error",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok",
                allowOutsideClick: false,
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

  function paymentname(payment_method_id) {
    if (payment_method_id == 2) {
      payment_method_name = "Gopay";
    } else if (payment_method_id == 3) {
      payment_method_name = "BCA Klikpay";
    } else if (payment_method_id == 4) {
      payment_method_name = "Danamon Online";
    } else if (payment_method_id == 5) {
      payment_method_name = "Cimb Clicks";
    } else {
      payment_method_name = "Gopay";
    }
  }

  function handlevalidate() {
    if (payment_method_id === 0 || payment_method_id === "") {
      validate1 = "Payment Method ";
    }
    if (city === "") {
      validate2 = " City ";
    }
    if (phone === "") {
      validate3 = " Phone Number ";
    }
    if (date === "") {
      validate4 = " Date ";
    }
    if (qty === 0 || qty === "") {
      validate5 = " Quantity ";
    }
    if (address === "") {
      validate6 = " Adress";
    }

    var string = `${validate1}${validate2}${validate3}${validate4}${validate5}${validate6}`;
    var string2 = string.split("  ").join(", ");
    validatetotal = string2;
  }

  function validateButton() {
    handlevalidate();
    var check = date;
    var today = new Date();
    var today2 = today.toISOString().substr(0, 10);
    let validatedate = true;

    var d1 = Date.parse(today2);
    var d2 = Date.parse(check);

    if (d2 < d1) {
      validatedate = false;
    }

    if (
      payment_method_id === 0 ||
      payment_method_id === "" ||
      city === "" ||
      phone === "" ||
      date === "" ||
      qty === 0 ||
      qty === "" ||
      address === ""
    ) {
      Swal.fire(
        "Please fill out the form!",
        `${validatetotal} form can't be empty. Please fill out the empty fields.`,
        "warning"
      );
    } else if (!/^[0-9]+[0-9]*$/gm.test(phone)) {
      Swal.fire("Invalid!", "Invalid Phone Number Format", "error");
    } else if (!/^[0-9]+(.[0-9]{0})?$/.test(qty)) {
      Swal.fire("Invalid!", "Quantity cannot use symbol", "error");
    } else if (validatedate == false) {
      Swal.fire(
        "Invalid!",
        "Make sure you choose a right date to order (you cannot choose past date)",
        "error"
      );
    } else {
      handleButton();
    }
  }

  function validatepayment() {
    if (history[0].user_id !== undefined) {
      if (
        history[history.length - 1].is_paid == false &&
        history[history.length - 1].status != "cancel"
      ) {
        Swal.fire({
          title: "Your last order payment haven't finished!",
          text: "Do you want to see your order history?",
          icon: "warning",
          showCancelButton: true,
          cancelmButtonColor: "#383130git",
          confirmButtonColor: "#175C8C",
          cancelButtonText: "Go to history page",
          confirmButtonText: "keep Ordering",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            validateButton();
          } else {
            router.push("/history-order");
          }
        });
      } else {
        validateButton();
      }
    } else {
      validateButton();
    }
  }

  //button handle end

  //Loading section

  if (confirmLoading) {
    Swal.fire({
      title: "Please Wait!",
      html: "This may take a few seconds, please don't close this page.",
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 3000,

      willOpen: () => {
        Swal.showLoading();
      },
    });
  }

  if (loading) {
    return <Loading />;
  }

  //loading end

  return (
    <section>
      <div
        className={`z-0 grid grid-cols-1 lg:h-[110vh] h-screen bg-cover  ${style.bgImage}  `}
      >
        <div className="z-1 w-[100vw] h-[110vh] bg-[#000009] bg-opacity-30 text-center">
          <div className="z-2 grid grid-cols-1 gap-4 bg-cover">
            <div className="mt-[2.5vh]">
              <p className="py-4 lg:text-5xl text-3xl text-white">
                Confirm your order
              </p>
            </div>

            {/* Desc Card */}

            <div className="container my-auto lg:ml-[25vw] z-3 lg:w-[50vw] w-screen h-auto bg-[#ffffff] bg-opacity-80 text-left rounded-lg pb-5">
              <div className="grid grid-cols-1 text-center mt-[0.5vh]  lg:px-10 px-4 py-5 ">
                <p className="text-black bold lg:text-3xl text-xl mb-2">
                  Service type: {services.title}
                </p>
                <p className="text-gray-800 text-justify lg:text-md text-sm mt-[1vh]">
                  {services.description}
                </p>
              </div>

              {/*form Section */}

              {/*payment - phone number - quantity */}

              <div className="grid grid-cols-3 mt-[1vh]">
                <h1 className="text-left text-[#175C8C] bold lg:text-lg text-sm ml-[3vw]">
                  Payment Method<dot className="text-red-600">*</dot>
                </h1>
                <h1 className="text-left text-[#175C8C] bold lg:text-lg text-sm ">
                  Phone Number<dot className="text-red-600">*</dot>
                </h1>
                <h1 className="text-left text-[#175C8C] bold lg:text-lg text-sm ml-[3vw]">
                  Quantity<dot className="text-red-600">*</dot>
                </h1>
              </div>

              <div className="grid grid-cols-3">
                <div className="">
                  <select
                    className="lg:ml-10 ml-[3vw] lg:h-[50px] h-[35px] lg:w-[11.5vw] w-[25vw] bg-transparent appearance-none lg:rounded-xl rounded-md relative px-2 py-2 border-2 border-primary placeholder-gray-700 text-black lg:text-[18px] text-[10px] focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                    value={payment_method_id}
                    onChange={(e) => {
                      setPayment_method_id(e.target.value);
                    }}
                  >
                    <option
                      className="bg-transparent appearance-none"
                      value={0}
                      disabled="true"
                    >
                      Choose Payment
                    </option>
                    <option value={2}>Gopay</option>
                    <option value={3}>BCA Klikpay</option>
                    <option value={4}>Danamon Online</option>
                    <option value={5}>Cimb Clicks</option>
                  </select>
                </div>

                <div className="">
                  <label htmlFor="phonenumber" className="sr-only">
                    Phone number
                  </label>
                  <input
                    id="phonenumber"
                    name="phonenumber"
                    type="tel"
                    inputMode="numeric"
                    maxLength="13"
                    placeholder="Phone Number"
                    autoComplete="off"
                    required
                    className="lg:h-[50px] h-[35px] lg:w-full w-[32vw] bg-transparent appearance-none lg:rounded-xl rounded-md relative px-3 py-2 border-2 border-primary placeholder-gray-700 text-black lg:text-[18px] text-[10px] focus:outline-none focus:ring-primary focus:border-primary focus:z-10W"
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
                    className="ml-[9vw] lg:h-[50px] h-[35px] w-0.5% bg-transparent appearance-none lg:rounded-xl rounded-md relative px-3 py-2 border-2 border-primary placeholder-gray-700 text-black lg:text-[18px] text-[10px] focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
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
                <h1 className="pt-2 text-left text-[#175C8C] bold lg:text-lg text-sm ml-[3vw]">
                  City<dot className="text-red-600">*</dot>
                </h1>
                <h1 className="pt-2 text-left text-[#175C8C] bold lg:text-lg text-sm">
                  Pick-Up Date<dot className="text-red-600">*</dot>
                </h1>
              </div>

              <div className="grid grid-cols-3 ">
                <div className="">
                  <select
                    className="lg:ml-10 ml-[3vw] lg:h-[50px] h-[35px] lg:w-[11.5vw] w-[25vw] bg-transparent appearance-none lg:rounded-xl rounded-md relative px-2 py-2 border-2 border-primary placeholder-gray-700 text-black lg:text-[18px] text-[10px] focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
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
                    min={new Date().toISOString().split("T")[0]}
                    type="date"
                    maxLength="100"
                    placeholder="Pick Up Date"
                    autoComplete="off"
                    required
                    className="lg:h-[50px] h-[35px] lg:w-full w-[32vw] bg-transparent appearance-none lg:rounded-xl rounded-md relative px-3 py-2 border-2 border-primary placeholder-gray-700 text-black lg:text-[18px] text-[10px] focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
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
                <h1 className="pt-2 text-left text-[#175C8C] bold lg:text-lg text-sm ml-[3vw]">
                  Address <dot className="text-red-600">*</dot>
                </h1>
              </div>

              <div className="grid grid-cols-2 lg:ml-[6vh] ml-[3vw]">
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
                    className="lg:h-[25vh] h-[12vh] lg:w-[30.5vw] w-[55vw] bg-transparent appearance-none lg:rounded-xl rounded-md relative lg:px-3 lg:py-2 border-2 border-primary placeholder-gray-700 text-black lg:text-[18px] text-[10px] focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>

                <div className="ml-[5vw] text-center">
                  <div className="">
                    <p className="lg:text-2xl text-lg text-center bold">
                      Subtotal
                    </p>
                    <h1 className="lg:text-2xl text-lg text-center bold">
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
                    className="lg:ml-[3.5vw] ml-[8vw] lg:h-[50px] h-[30px] lg:w-[12vw] w-[30vw] mt-5 lg:mt-10 text-center lg:text-[18px] text-[15px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium lg:rounded-xl rounded-md text-white bg-primary hover:bg-transparent hover:bg-opacity-0 hover:border-primary hover:border-2 hover:text-primary hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onClick={validatepayment}
                  >
                    <p className="lg:text-md text-sm text-center rounded-xl">
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
