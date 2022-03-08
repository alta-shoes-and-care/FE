import React from "react";
import styles from "../../styles/History.module.css";
import { VscNewFile } from "react-icons/vsc";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function Admin() {
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

  function handleDelete() {
    return Swal.fire({
      title: "Delete this product?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted", "", "success");
      }
    });
  }
  function handleEdit(el) {
    return Swal.fire({
      title: "Edit this product?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          router.push(`/admin/${el.id}`);
        }, 2000);
      }
    });
  }
  return (
    <div className={`grid grid-cols-4 bg-blue-200 ${styles.adminbg}`}>
      {/* left */}
      <div className=" pl-24">
        <button className="w-[150px] h-[40px] my-4 mt-10 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-lg text-white bg-primary hover:bg-transparent hover:border-primary hover:border-2 hover:text-primary hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary  transition ease-linear duration-500">
          Product
        </button>
        <button
          onClick={() => router.push("list-order")}
          className="w-[150px] h-[40px] my-4 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-lg text-primary bg-white hover:bg-transparent hover:border-primary hover:border-2 hover:text-white hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary  transition ease-linear duration-500"
        >
          List Order
        </button>
      </div>

      {/* right */}
      <div className=" w-[900px] h-screen">
        <button
          onClick={() => {
            router.push("admin/new-item");
          }}
          className="w-[150px] h-[40px] my-4 mt-10 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-lg text-white bg-primary hover:bg-transparent hover:border-primary hover:border-2 hover:text-primary hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary  transition ease-linear duration-500"
        >
          <VscNewFile className=" text-xl mr-2" />
          New Item
        </button>
        {/* Card */}
        <div className=" h-[75vh] overflow-y-scroll w-full">
          {data.map((el, i) => (
            <div
              className={` w-[800px] flex py-2 px-3 my-3 ${styles.historyCard}`}
            >
              <div className=" w-[70px] h-[70px] bg-gray-500 mr-5"></div>
              <div>
                <h1 className=" text-xl">{el.title}</h1>
                <div className=" bg-gray-600 w-[200px] my-1 h-0.5"></div>
                <div className=" flex ">
                  <div
                    onClick={() => handleEdit(el)}
                    className=" flex mr-8 hover:text-primary hover:animate-pulse"
                  >
                    <p className=" text-xl mt-0.5 mr-1">
                      <AiOutlineEdit />
                    </p>
                    <button>Edit</button>
                  </div>
                  <div
                    onClick={handleDelete}
                    className=" flex hover:text-primary hover:animate-pulse"
                  >
                    <p className="  text-xl mt-0.5 mr-1">
                      <AiOutlineDelete />
                    </p>
                    <button>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
