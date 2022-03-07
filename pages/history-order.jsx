import React from "react";
import styles from "../styles/History.module.css";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { RiMessage2Line } from "react-icons/ri";
import { AiOutlineNumber, AiOutlineFileDone } from "react-icons/ai";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function History() {
  const router = useRouter();

  const data = [
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

  function handleConfirm() {
    return Swal.fire({
      title: "Confirm Order?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Thank you :)", "", "success");
        setTimeout(() => {
          router.push("/review");
        }, 2000);
      }
    });
  }

  return (
    <div className={`flex justify-center items-center ${styles.historybg}`}>
      <div
        className={` w-[700px] h-screen my-8 p-4 flex justify-cente flex-col items-center ${styles.historyGlass}`}
      >
        <h1 className=" text-3xl text-center  font-bold my-3 ">
          History Order
        </h1>

        {/* card */}
        {data.map((el, i) => (
          <div className={` w-[550px]   py-2 px-3 my-3 ${styles.historyCard}`}>
            <h1 className=" text-xl">{el.title}</h1>
            <div className=" bg-gray-600 w-[200px] my-1 h-0.5"></div>
            {/* status */}
            <div className=" flex mt-1 justify-between">
              <div className=" flex">
                <p className=" text-green-600 text-xl mt-0.5 mr-1">
                  <FaMoneyBillAlt />
                </p>
                <p>Rp. {el.price}</p>
              </div>
              <div className=" flex">
                <p className="text-xl mt-0.5 mr-1">
                  <FcCalendar />
                </p>
                <p>{el.date}</p>
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
              <div
                onClick={handleConfirm}
                className=" flex hover:animate-pulse hover:text-primary"
              >
                <p className="text-xl mt-0.5 mr-0.5">
                  <AiOutlineFileDone />
                </p>
                <button>Confirm</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
