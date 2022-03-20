import React, { useEffect, useState } from "react";
import styles from "../styles/ListOrder.module.css";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import {
  RiMessage2Line,
  RiAccountBoxFill,
  RiMapPinFill,
  RiExchangeDollarLine,
} from "react-icons/ri";
import { AiOutlineNumber, AiOutlineShoppingCart } from "react-icons/ai";
import { GoChecklist } from "react-icons/go";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "../components/Loading";
import NumberFormat from "react-number-format";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import allstore from "../stores/actions/index";

function ListOrder() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const listOrders = useSelector(
    ({ getListOrdersReducer }) => getListOrdersReducer
  );

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    dispatch(allstore.getListOrders());
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("token")) {
        router.push("/404");
      } else if (
        localStorage.getItem("is_admin") == "false" &&
        localStorage.getItem("token")
      ) {
        router.push("/404");
      }
    }
  }, []);

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
          title: "Success update status",
        });
        return dispatch(allstore.getListOrders());
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
        } else {
          Swal.fire("Ooppss!", "Sorry, the server is error.", "error");
        }
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
        `https://ynwahid.cloud.okteto.net/orders/process/${el.id}`,
        {},
        config
      )
      .then(({ data }) => {
        Toast.fire({
          icon: "success",
          title: "Success update status",
        });
        return dispatch(allstore.getListOrders());
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
        } else {
          Swal.fire("Ooppss!", "Sorry, the server is error.", "error");
        }
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
        `https://ynwahid.cloud.okteto.net/orders/deliver/${el.id}`,
        {},
        config
      )
      .then(({ data }) => {
        Toast.fire({
          icon: "success",
          title: "Success update status",
        });
        return dispatch(allstore.getListOrders());
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
        } else {
          Swal.fire("Ooppss!", "Sorry, the server is error.", "error");
        }
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
              title: "Success update status",
            });
            return dispatch(allstore.getListOrders());
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
            } else {
              Swal.fire("Ooppss!", "Sorry, the server is error.", "error");
            }
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
              title: "Success update status",
            });
            return dispatch(allstore.getListOrders());
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
            } else {
              Swal.fire("Ooppss!", "Sorry, the server is error.", "error");
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  }

  function handleRefund(el) {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoading(true);
    axios
      .put(
        `https://ynwahid.cloud.okteto.net/orders/refund/${el.id}`,
        {},
        config
      )
      .then(({ data }) => {
        Toast.fire({
          icon: "success",
          title: "successful refund",
        });
        return dispatch(allstore.getListOrders());
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
        } else {
          Swal.fire("Ooppss!", "Sorry, the server is error.", "error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={` ${styles.adminbg2}`}>
      <div
        className={` backdrop-blur-[7px]  lg:grid lg:grid-cols-4 min-h-full ${styles.bgblur}`}
      >
        {/* left */}
        <div className={`pl-24 ${styles.left}`}>
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
        <div className={`w-[1200px] h-auto mt-7 flex ${styles.right}`}>
          {/* Card */}
          <div
            className={`h-[75vh] w-[1200px] flex flex-wrap overflow-y-scroll content-start ${styles.bgcard}`}
          >
            {listOrders
              .slice()
              .sort((a, b) => {
                return b.id - a.id;
              })
              .map((el, i) => (
                <div
                  key={i}
                  className={`p-3 mb-5 rounded-lg pl-3 bg-[#ffffffab] backdrop-blur-[5px] h-auto w-[480px] mx-3 transition ease-linear duration-1000 ]  ${styles.bgcard1}`}
                >
                  <div
                    className={` w-[450px] flex py-2 px-5 my-2 bg-white shadow-md rounded-lg ${styles.card1} `}
                  >
                    <div>
                      <div
                        className={`${styles.titleCard} flex justify-between`}
                      >
                        <h1 className=" text-xl">{el.service_title}</h1>
                        {/* refund */}
                        <div className=" flex items-center ml-16">
                          {el.has_refunded ? (
                            <div className=" text-green-500 flex">
                              <p className="text-xl mt-0.5 mr-1">
                                <GoChecklist />
                              </p>
                              <p>Refunded</p>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        {/* Button Refund */}
                        <div
                          className=" flex items-center hover:cursor-pointer"
                          onClick={() => handleRefund(el)}
                        >
                          {(el.status == "cancel" &&
                            el.is_paid &&
                            !el.has_refunded) ||
                          (el.status == "rejected" &&
                            el.is_paid &&
                            !el.has_refunded) ? (
                            <div className=" text-red-500 flex">
                              <p className="text-xl mt-0.5 mr-1">
                                <RiExchangeDollarLine />
                              </p>
                              <p>Refund</p>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        {/* is paid */}
                        <div className=" flex items-center">
                          {el.is_paid ? (
                            <div className=" text-green-500 flex">
                              <p className="text-xl mt-0.5 mr-1">
                                <AiOutlineShoppingCart />
                              </p>
                              <p>Paid</p>
                            </div>
                          ) : (
                            <div className=" text-red-500 flex">
                              <p className="text-xl mt-0.5 mr-1">
                                <AiOutlineShoppingCart />
                              </p>
                              <p>Not Paid</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className=" bg-gray-600 w-[200px] my-1 h-0.5"></div>
                      {/* status */}
                      <div
                        className={` flex flex-col w-[400px] ${styles.iconstatus}`}
                      >
                        <div className=" flex">
                          <p className=" text-primary text-xl mt-0.5 mr-1">
                            <RiAccountBoxFill />
                          </p>
                          <p>Name : {el.user_name}</p>
                        </div>

                        <div className=" flex">
                          <p className=" text-primary text-xl mt-0.5 mr-1">
                            <RiMapPinFill />
                          </p>
                          <p>
                            Address : {el.address}, {el.city}.
                          </p>
                        </div>

                        <div className=" flex">
                          <p className="text-xl mt-0.5 mr-1">
                            <FcCalendar />
                          </p>
                          <p>
                            Pickup Date : {moment(el.date).format("D MMM YYYY")}
                          </p>
                        </div>

                        <div className=" flex">
                          <p className=" text-green-600 text-xl mt-0.5 mr-1">
                            <FaMoneyBillAlt />
                          </p>
                          <p>
                            Total : Rp.{" "}
                            <NumberFormat
                              value={el.total}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                          </p>
                        </div>

                        <div className=" flex">
                          <p className="text-xl mt-0.5 mr-0.5">
                            <AiOutlineNumber />
                          </p>
                          <p>Orders Id : {el.id}</p>
                        </div>

                        <div className=" flex">
                          <p className="text-xl mt-0.5 mr-1">
                            <RiMessage2Line />
                          </p>
                          <p>Status Order : {el.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* edit status */}
                  <div className={` w-[450px] flex py-2  rounded-lg`}>
                    <div
                      className={` flex justify-between w-[450px] ${styles.accept}`}
                    >
                      {/* accept */}
                      {el.status === "accepted" ||
                      el.status === "on process" ||
                      el.status === "delivering" ||
                      el.status === "rejected" ||
                      el.status === "cancel" ? (
                        <button
                          disabled
                          onClick={() => handleAccept(el)}
                          className=" px-2 py-1 bg-white shadow-md rounded-md text-gray-400"
                        >
                          Accept
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAccept(el)}
                          className=" px-2 py-1 bg-white shadow-md rounded-md hover:text-green-500"
                        >
                          Accept
                        </button>
                      )}

                      {/* reject */}
                      {el.status === "rejected" ||
                      el.status === "accepted" ||
                      el.status === "on process" ||
                      el.status === "delivering" ||
                      el.status === "cancel" ? (
                        <button
                          disabled
                          onClick={() => handleReject(el)}
                          className=" px-2 py-1 bg-white shadow-md rounded-md text-gray-400"
                        >
                          Reject
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReject(el)}
                          className=" px-2 py-1 bg-white shadow-md rounded-md hover:text-green-500"
                        >
                          Reject
                        </button>
                      )}

                      {/* on process */}
                      {el.status === "on process" ||
                      el.status === "pending" ||
                      el.is_paid === false ||
                      el.status === "rejected" ||
                      el.status === "delivering" ||
                      el.status === "cancel" ? (
                        <button
                          disabled
                          onClick={() => handleOnprocess(el)}
                          className=" px-2 py-1 bg-white shadow-md rounded-md text-gray-400"
                        >
                          On Process
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOnprocess(el)}
                          className=" px-2 py-1 bg-white shadow-md rounded-md hover:text-green-500"
                        >
                          On Process
                        </button>
                      )}

                      {/* deliver */}
                      {el.status === "delivering" ||
                      el.status === "pending" ||
                      el.is_paid === false ||
                      el.status === "rejected" ||
                      el.status === "accepted" ||
                      el.status === "cancel" ? (
                        <button
                          disabled
                          onClick={() => handleDelivery(el)}
                          className=" px-2 py-1 bg-white shadow-md rounded-md text-gray-400"
                        >
                          Delivery
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelivery(el)}
                          className=" px-2 py-1 bg-white shadow-md rounded-md hover:text-green-500"
                        >
                          Delivery
                        </button>
                      )}

                      {/* cancel */}
                      {el.status === "cancel" ||
                      el.status === "rejected" ||
                      el.status === "delivering" ? (
                        <button
                          disabled
                          onClick={() => handleCancel(el)}
                          className=" px-2 py-1 bg-white shadow-md rounded-md text-gray-400"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCancel(el)}
                          className={`${styles.icon2} px-2 py-1 bg-white shadow-md rounded-md hover:text-green-500`}
                        >
                          Cancel
                        </button>
                      )}
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
