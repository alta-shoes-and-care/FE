import React, { useEffect, useState } from "react";
import styles from "../styles/History.module.css";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { RiMessage2Line } from "react-icons/ri";
import { AiOutlineNumber, AiOutlineFileDone } from "react-icons/ai";
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
  const data = [
    {
      title: "Regular Cleaning",
      price: "30.000",
      date: "22 Feb 2022",
      status: "Delivering",
      id: "003",
    },
    {
      title: "Regular Express",
      price: "60.000",
      date: "25 Feb 2022",
      status: "On Process",
      id: "001",
    },
    {
      title: "Repaint Medium",
      price: "100.000",
      date: "22 Feb 2022",
      status: "Pick Up",
      id: "002",
    },
    {
      title: "Regular Cleaning",
      price: "30.000",
      date: "22 Feb 2022",
      status: "Pending",
      id: "003",
    },
    {
      title: "Regular Express",
      price: "60.000",
      date: "25 Feb 2022",
      status: "On Process",
      id: "001",
    },
    {
      title: "Repaint Medium",
      price: "100.000",
      date: "22 Feb 2022",
      status: "Pick Up",
      id: "002",
    },
    {
      title: "Regular Cleaning",
      price: "30.000",
      date: "22 Feb 2022",
      status: "Pending",
      id: "003",
    },
    {
      title: "Regular Express",
      price: "60.000",
      date: "25 Feb 2022",
      status: "On Process",
      id: "001",
    },
    {
      title: "Repaint Medium",
      price: "100.000",
      date: "22 Feb 2022",
      status: "Pick Up",
      id: "002",
    },
  ];

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`https://ynwahid.cloud.okteto.net/orders`, config)
      .then(({ data }) => {
        sethistory(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
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
    <div className={`flex justify-center items-center ${styles.historybg}`}>
      <div
        className={` rounded-xl w-[700px] h-screen overflow-y-scroll my-8 p-4 flex flex-col items-center backdrop-blur-[10px] bg-[#ffffff88]`}
      >
        <h1 className=" text-3xl text-center  font-bold my-3 ">
          History Order
        </h1>

        {/* card */}
        <div className=" w-[700px] overflow-y-scroll flex flex-col items-center">
          {history.map((el, i) => (
            <div
              className={` w-[550px] rounded-lg py-2 px-3 my-3 bg-white shadow-md`}
            >
              <h1 className=" text-xl">{el.service_title}</h1>
              <div className=" bg-gray-600 w-[200px] my-1 h-0.5"></div>
              {/* status */}
              <div className=" flex mt-1 justify-between">
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
                {el.status === "delivering" ? (
                  <div className=" flex hover:text-primary">
                    <p className="text-xl mt-0.5 mr-0.5">
                      <AiOutlineFileDone />
                    </p>
                    <button onClick={() => handleConfirm(el)}>Confirm</button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
