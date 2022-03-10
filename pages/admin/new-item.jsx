import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import styles from "../../styles/History.module.css";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";

function NewItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  function handleButton() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", image);

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "multipart/form-data",
    };

    return Swal.fire({
      title: "Add new service?",
      text: "",
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .post(
            "https://ynwahid.cloud.okteto.net/services/jwt",
            formData,
            config
          )
          .then(({ data }) => {
            Toast.fire({
              icon: "success",
              title: "Success add new service",
            });
            setTimeout(() => {
              router.push("/admin");
            }, 2000);
          })
          .catch((err) => {
            console.log(err, "error");
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (result.isDenied) {
        setLoading(false);
      }
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`flex justify-center items-center ${styles.adminbg2}`}>
      <div
        className={` w-[700px] h-screen my-8 p-4 flex justify-center flex-col items-center ${styles.historyGlass}`}
      >
        {/* content */}
        <h1 className=" text-5xl text-center  font-bold mb-12 ">
          Add New Service
        </h1>
        <div>
          <form className=" w-[528px]" action="#" method="POST">
            <h1 className=" text-3xl mb-2">Service Title</h1>
            <div>
              <input
                maxLength="30"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                name="title"
                type="text"
                placeholder="Input title"
                autoComplete="off"
                required
                className={` h-12 mb-5 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 focus:bg-white focus:outline-none ${styles.inputbg}`}
              />
            </div>

            <h1 className=" text-3xl mb-2">Price</h1>
            <div>
              <input
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                min="0"
                name="price"
                type="number"
                placeholder="30.000"
                autoComplete="off"
                required
                className={` h-12 mb-5 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:bg-white focus:text-gray-700 focus:border-blue-600 focus:outline-none ${styles.inputbg}`}
              />
            </div>

            <h1 className=" text-3xl mb-2">Image</h1>
            <div>
              <input
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  if (e.target.files[0].size > 500000) {
                    Swal.fire(
                      "The size of the image should not be more than 500 Kb"
                    );
                    setImage(null);
                  }
                }}
                name="image"
                max-size="500"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                placeholder=""
                autoComplete="off"
                required
                className={` h-12 mb-5 px-3 py-2 text-gray-700 border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 focus:bg-white focus:outline-none ${styles.inputbg}`}
              />
            </div>
            <h1 className=" text-3xl mb-2">Description</h1>
            <textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              maxLength="320"
              required
              className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${styles.inputbg}`}
              id="exampleFormControlTextarea1"
              rows="5"
              placeholder="Input description"
            ></textarea>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleButton}
                className="w-[250px] h-[50px] mt-10 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-xl text-white bg-primary hover:bg-transparent hover:border-white hover:border-2 hover:text-white hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-white focus:ring-primary  transition ease-linear duration-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewItem;
