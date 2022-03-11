import React, { useEffect, useState } from "react";
import styles from "../styles/History.module.css";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { RiMessage2Line } from "react-icons/ri";
import { AiOutlineNumber, AiOutlineFileDone } from "react-icons/ai";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "../components/Loading";
import NumberFormat from "react-number-format";
import moment from "moment";

function ListOrder() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [listOrder, setlistOrder] = useState([[]]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`https://ynwahid.cloud.okteto.net/orders`, config)
      .then(({ data }) => {
        setlistOrder(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function getOrder(params) {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`https://ynwahid.cloud.okteto.net/orders`, config)
      .then(({ data }) => {
        setlistOrder(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleAccept(el) {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoading(true);
    axios
      .put(
        `https://ynwahid.cloud.okteto.net/orders/accept/${el.id}`,
        {},
        config
      )
      .then(({ data }) => {
        Toast.fire({
          icon: "success",
          title: "Success changed status",
        });
        return getOrder();
      })
      .catch((err) => {
        console.log(err.response, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleOnprocess(el) {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoading(true);
    axios
      .put(
        `https://ynwahid.cloud.okteto.net/orders/deliver/${el.id}`,
        {},
        config
      )
      .then(({ data }) => {
        Toast.fire({
          icon: "success",
          title: "Success changed status",
        });
        return getOrder();
      })
      .catch((err) => {
        console.log(err.response, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleDelivery(el) {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoading(true);
    axios
      .put(
        `https://ynwahid.cloud.okteto.net/orders/process/${el.id}`,
        {},
        config
      )
      .then(({ data }) => {
        Toast.fire({
          icon: "success",
          title: "Success changed status",
        });
        return getOrder();
      })
      .catch((err) => {
        console.log(err.response, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleCancel(el) {
    return Swal.fire({
      title: "Cancel this order?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .put(
            `https://ynwahid.cloud.okteto.net/orders/cancel/${el.id}`,
            {},
            config
          )
          .then(({ data }) => {
            Toast.fire({
              icon: "success",
              title: "Success changed status",
            });
            return getOrder();
          })
          .catch((err) => {
            console.log(err.response, "error");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  }
  function handleReject(el) {
    return Swal.fire({
      title: "Reject this order?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .put(
            `https://ynwahid.cloud.okteto.net/orders/reject/${el.id}`,
            {},
            config
          )
          .then(({ data }) => {
            Toast.fire({
              icon: "success",
              title: "Success changed status",
            });
            return getOrder();
          })
          .catch((err) => {
            console.log(err.response, "error");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={` ${styles.adminbg2}`}>
      <div className=" backdrop-blur-[7px]  grid grid-cols-4 min-h-full">
        {/* left */}
        <div className=" pl-24">
          <button
            onClick={() => router.push("/admin")}
            className="w-[150px] h-[40px] mt-10 my-4 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-lg text-primary bg-white hover:bg-transparent hover:border-primary hover:border-2 hover:text-white hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary  transition ease-linear duration-500"
          >
            Product
          </button>
          <button className="w-[150px] h-[40px] my-4 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-lg text-white bg-primary hover:bg-transparent hover:border-primary hover:border-2 hover:text-primary hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary  transition ease-linear duration-500">
            List Order
          </button>
        </div>

        {/* right */}
        <div className=" w-[1200px] h-auto mt-7 flex ">
          {/* Card */}
          <div className="  h-[75vh] w-[1200px] flex flex-wrap overflow-y-scroll content-start">
            {listOrder.map((el, i) => (
              <div
                key={i}
                className=" p-3 mb-5 rounded-lg pl-3 bg-[#ffffffab] backdrop-blur-[5px] h-auto w-[480px] mx-3 transition ease-linear duration-1000 ] "
              >
                <div
                  className={` w-[450px] flex py-2 px-5 my-2 bg-white shadow-md rounded-lg `}
                >
                  <div>
                    <h1 className=" text-xl">{el.service_title}</h1>
                    <div className=" bg-gray-600 w-[200px] my-1 h-0.5"></div>
                    {/* status */}
                    <div className=" flex justify-between w-[400px]">
                      <div className=" flex">
                        <p className=" text-green-600 text-xl mt-0.5 mr-1">
                          <FaMoneyBillAlt />
                        </p>
                        <p>
                          Rp.{" "}
                          <NumberFormat
                            value={el.total}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                        </p>
                      </div>
                      <div className=" flex">
                        <p className="text-xl mt-0.5 mr-1">
                          <FcCalendar />
                        </p>
                        <p>{moment(el.date).format("Do MMMM YYYY")}</p>
                      </div>
                      <div className=" flex">
                        <p className="text-xl mt-0.5 mr-1">
                          <RiMessage2Line />
                        </p>
                        <p>{el.status}</p>
                      </div>
                      <div className=" flex">
                        <p className="text-xl mt-0.5 mr-0.5">
                          <AiOutlineNumber />
                        </p>
                        <p>{el.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* edit status */}
                <div className={` w-[450px] flex py-2  rounded-lg`}>
                  <div className=" flex justify-between w-[450px]">
                    <button
                      onClick={() => handleAccept(el)}
                      className=" px-2 py-1 bg-white shadow-md rounded-md hover:text-green-500"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(el)}
                      className=" px-2 py-1 bg-white shadow-md rounded-md hover:text-green-500"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleOnprocess(el)}
                      className=" px-2 bg-white shadow-md rounded-md hover:text-green-500"
                    >
                      On Process
                    </button>
                    <button
                      onClick={() => handleDelivery(el)}
                      className=" px-2 bg-white shadow-md rounded-md hover:text-green-500"
                    >
                      Delivery
                    </button>
                    <button
                      onClick={() => handleCancel(el)}
                      className=" px-2 bg-white shadow-md rounded-md hover:text-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListOrder;
