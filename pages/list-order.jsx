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
  const [loading, setLoading] = useState(false);
  const [listOrder, setlistOrder] = useState([[]]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`https://ynwahid.cloud.okteto.net/orders/jwt`, config)
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

  const router = useRouter();
  const data = [
    {
      title: "Regular Cleaning",
      price: "30.000",
      date: "22 Feb 2022",
      status: "Pending",
      id: "003",
    },
  ];

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={`grid grid-cols-4 min-h-full ${styles.adminbg2}`}>
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
      <div className=" w-[1200px] h-auto mt-7 flex">
        {/* Card */}
        <div className=" h-[73vh] w-[1200px] flex flex-wrap overflow-y-scroll content-start">
          {listOrder.map((el, i) => (
            <div
              key={i}
              className=" p-2 mb-5 rounded-lg pl-3 bg-[#ffffff93] backdrop-blur-[5px] h-[180px] w-[480px] mx-3 transition ease-linear duration-1000 hover:bg-[#b2b9be81] "
            >
              <div
                className={` w-[450px] flex py-2 px-5 my-3 bg-[#ffffffaf] backdrop-blur-[10px] rounded-lg `}
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
              <div
                className={` w-[370px] flex py-2 px-3 my-3 bg-[#ffffffaf] backdrop-blur-[10px] rounded-lg`}
              >
                <div className=" flex justify-between w-[350px]">
                  <button className=" border-2 px-2 border-black rounded-md hover:text-primary hover:animate-pulse hover:border-primary">
                    Accept
                  </button>
                  <button className=" border-2 px-2 border-black rounded-md hover:text-primary hover:animate-pulse hover:border-primary">
                    On Process
                  </button>
                  <button className=" border-2 px-2 border-black rounded-md hover:text-primary hover:animate-pulse hover:border-primary">
                    Delivery
                  </button>
                  <button className=" border-2 px-2 border-black rounded-md hover:text-primary hover:animate-pulse hover:border-primary">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListOrder;
