import React, { useEffect, useState } from "react";
import styles from "../styles/History.module.css";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { RiMessage2Line } from "react-icons/ri";
import { MdOutlineRateReview } from "react-icons/md";
import {
  AiOutlineNumber,
  AiOutlineFileDone,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import moment from "moment";
import Loading from "../components/Loading";
import axios from "axios";

function History() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [history, sethistory] = useState([[]]);
  console.log(history);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("token")) {
        router.push("/");
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
        sethistory(data.data);
        console.log(data.data, "masuk");
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
  }, []);

  function handleConfirm(el) {
    return Swal.fire({
      title: "Confirm Order?",
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
            `https://ynwahid.cloud.okteto.net/orders/done/${el.id}`,
            {},
            config
          )
          .then(({ data }) => {
            Swal.fire("Thank you :)", "", "success");
            setTimeout(() => {
              router.push(`/review/${el.id}`);
            }, 2000);
          })
          .catch((err) => {
            console.log(err.response);
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

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={`flex justify-center items-center ${styles.historybg}`}>
      <div
        className={` ${styles.container} rounded-xl w-[800px] h-screen overflow-y-scroll my-8 p-4 flex flex-col items-center backdrop-blur-[10px] bg-[#ffffff88]`}
      >
        <h1 className=" text-3xl text-center  font-bold my-3 ">
          Order History
        </h1>

        {/* card */}
        {!history[0].id ? (
          <div></div>
        ) : (
          <div className=" w-[700px] overflow-y-scroll flex flex-col items-center">
            {history
              .slice()
              .sort((a, b) => {
                return b.id - a.id;
              })
              .map((el, i) => (
                <div
                  className={` ${styles.content} w-[630px] rounded-lg py-2 px-3 my-3 bg-white shadow-md`}
                >
                  <h1 className=" text-xl">{el.service_title}</h1>
                  <div className=" bg-gray-600 w-[200px] my-1 h-0.5"></div>
                  {/* status */}
                  <div className={`flex mt-1 justify-between ${styles.status}`}>
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
                      <p>{moment(el.date).format("D MMMM YYYY")}</p>
                    </div>
                    <div className=" flex">
                      <p className="text-xl mt-0.5 mr-1">
                        <RiMessage2Line />
                      </p>
                      <p>{el.status}</p>
                    </div>
                    <div
                      onClick={() => router.push(`/endpoint/${el.id}`)}
                      className=" hover:cursor-pointer hover:text-gray-500 flex"
                    >
                      <p className="text-xl mt-0.5 mr-1">
                        <AiOutlineShoppingCart />
                      </p>
                      <p>{el.is_paid ? "Paid" : "Not Paid"}</p>
                    </div>
                    <div className=" flex">
                      <p className="text-xl mt-0.5 mr-0.5">
                        <AiOutlineNumber />
                      </p>
                      <p>{el.id}</p>
                    </div>
                    {el.status === "delivering" ? (
                      <div className=" flex hover:text-gray-500">
                        <p className="text-xl mt-0.5 mr-0.5">
                          <AiOutlineFileDone />
                        </p>
                        <button onClick={() => handleConfirm(el)}>
                          Confirm
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                    {el.status === "done" ? (
                      <div className=" flex hover:text-gray-500 ">
                        <p className="text-xl mt-0.5 mr-0.5">
                          <MdOutlineRateReview />
                        </p>
                        <button onClick={() => router.push(`/review/${el.id}`)}>
                          Review
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
