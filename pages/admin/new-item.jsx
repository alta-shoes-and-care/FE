import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import styles from "../../styles/History.module.css";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
// filepond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateSize);

function NewItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [files, setFiles] = useState([]);

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

  function validateButton() {
    if (
      title === "" ||
      price === "" ||
      description === "" ||
      files.length == 0
    ) {
      Swal.fire(
        "Invalid!",
        "Forms can't be empty,please fill out the fields.",
        "error"
      );
    } else {
      handleButton();
    }
  }

  function handleButton() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", files[0].file);

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
            setTitle("");
            setPrice("");
            setDescription("");
            setImage(null);
            Toast.fire({
              icon: "success",
              title: "Success add new service",
            });
            setTimeout(() => {
              router.push("/admin");
            }, 2000);
          })
          .catch((err) => {
            Swal.fire("Invalid!", "Forms can't be empty", "error");
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
        className={` w-[700px] h-auto my-8 p-4 py-12 flex justify-center flex-col items-center backdrop-blur-[5px] bg-[#ffffffd3] rounded-xl`}
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
                value={title}
                minLength="5"
                maxLength="30"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                name="title"
                type="text"
                placeholder="Input title"
                autoComplete="off"
                required
                className={` h-12 mb-5 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border-solid border-black border-2 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:border-primary focus:outline-none bg-transparent`}
              />
            </div>

            <h1 className=" text-3xl mb-2">Price</h1>
            <div>
              <input
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                max="1000000000"
                min="0"
                type="number"
                placeholder="30.000"
                autoComplete="off"
                required
                className={` h-12 mb-5 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border-2 border-solid border-black rounded-lg transition ease-in-out m-0  focus:text-gray-700 focus:border-primary focus:outline-none bg-transparent`}
              />
            </div>

            <h1 className=" text-3xl mb-2">Image</h1>
            <FilePond
              maxFileSize={500000}
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              accept="image/png, image/jpeg, image/jpg"
              maxFiles={1}
              name="files"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
            <h1 className=" text-3xl mb-2">Description</h1>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              type="text"
              maxLength="320"
              required
              className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border-2 border-solid border-black rounded-lg transition ease-in-out m-0 focus:text-gray-700  focus:border-primary focus:outline-none bg-transparent`}
              id="exampleFormControlTextarea1"
              rows="5"
              placeholder="Input description"
            ></textarea>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={validateButton}
                className="w-[250px] h-[50px] mt-10 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-xl text-white bg-primary hover:bg-transparent hover:border-black hover:border-2 hover:text-black hover:font-bold focus:outline-none transition ease-linear duration-500"
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
