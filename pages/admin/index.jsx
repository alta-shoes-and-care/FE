import React, { useEffect, useState } from "react";
import styles from "../../styles/History.module.css";
import { VscNewFile } from "react-icons/vsc";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import axios from "axios";

function Admin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [product, setProduct] = useState([]);

  function getData() {
    axios
      .get("https://ynwahid.cloud.okteto.net/services")
      .then(({ data }) => {
        setProduct(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    axios
      .get("https://ynwahid.cloud.okteto.net/services")
      .then(({ data }) => {
        setProduct(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleDelete(el) {
    return Swal.fire({
      title: "Delete this product?",
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
          .delete(
            `https://ynwahid.cloud.okteto.net/services/jwt/${el.id}`,
            config
          )
          .then(({ data }) => {
            Swal.fire("Deleted", "", "success");
            return getData();
          })
          .catch((err) => {
            console.log(err, "error");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  }
  function handleEdit(el) {
    router.push(`/admin/${el.id}`);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`grid grid-cols-4  ${styles.adminbg}`}>
      {/* left */}
      <div className=" pl-24">
        <button className="w-[150px] h-[40px] my-4 mt-[70px] text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-lg text-white bg-primary hover:bg-transparent hover:border-primary hover:border-2 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary  transition ease-linear duration-500">
          Product
        </button>
        <button
          onClick={() => router.push("list-order")}
          className="w-[150px] h-[40px] my-4 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-lg text-primary bg-white hover:bg-transparent hover:border-primary hover:border-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary  transition ease-linear duration-500"
        >
          List Order
        </button>
      </div>

      {/* right */}
      <div className=" w-[900px] h-screen backdrop-blur-[10px] bg-[#ffffff59] my-8 rounded-xl pl-12">
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
        <div className=" h-[75vh] overflow-y-scroll w-full transition ease-linear duration-1000">
          {product.map((el, i) => (
            <div
              key={i}
              className={` w-[800px] flex py-2 px-3 my-3 bg-[#ffffffec] rounded-lg transition ease-linear duration-1000 hover:bg-[#ffffff98] `}
            >
              <div>
                <img
                  className=" w-[70px] h-[70px] mr-5 rounded-md"
                  src={el.image}
                  alt=""
                />
              </div>
              <div>
                <h1 className=" text-xl">{el.title}</h1>
                <div className=" bg-gray-600 w-[200px] my-1 h-0.5"></div>
                <div className=" flex ">
                  <div
                    onClick={() => handleEdit(el)}
                    className=" flex mr-8 hover:text-white"
                  >
                    <p className=" text-xl mt-0.5 mr-1">
                      <AiOutlineEdit />
                    </p>
                    <button>Edit</button>
                  </div>
                  <div
                    onClick={() => handleDelete(el)}
                    className=" flex hover:text-white"
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
