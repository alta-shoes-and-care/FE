import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "../../styles/admin.module.css";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import allstore from "../../stores/actions/index";

// filepond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateSize);
registerPlugin(FilePondPluginFileValidateType);

function NewItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();

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

  //  Validation Input User
  function validateButton(e) {
    e.preventDefault();
    if (files.length == 0) {
      if (
        description === "" &&
        title === "" &&
        files.length === 0 &&
        price === ""
      ) {
        Swal.fire(
          "Invalid!",
          "Data can't be empty,please fill out the fields.",
          "error"
        );
      } else if (
        !/^[0-9]+(.[0-9]{0})?$/.test(price) &&
        title === "" &&
        description === "" &&
        files.length === 0
      ) {
        Swal.fire("Invalid!", "Incorrect format on field Price", "error");
      } else if (title === "") {
        Swal.fire(
          "Invalid!",
          "Data can't be empty,please fill out the fields.",
          "error"
        );
      } else if (description === "") {
        Swal.fire(
          "Invalid!",
          "Data can't be empty,please fill out the fields.",
          "error"
        );
      } else if (price === "") {
        Swal.fire(
          "Invalid!",
          "Data can't be empty,please fill out the fields.",
          "error"
        );
      } else if (files.length === 0) {
        Swal.fire(
          "Invalid!",
          "Data can't be empty,please fill out the fields.",
          "error"
        );
      }
    }
    // image.length === 1
    else if (
      (files.length === 1 && files[0].fileExtension == "png") ||
      (files.length === 1 && files[0].fileExtension == "jpg") ||
      (files.length === 1 && files[0].fileExtension == "jpeg") ||
      (files.length === 1 && files[0].fileExtension == "PNG")
    ) {
      if (
        description === "" &&
        title === "" &&
        files.length === 0 &&
        price === ""
      ) {
        Swal.fire(
          "Invalid!",
          "Data can't be empty,please fill out the fields.",
          "error"
        );
      } else if (files[0].file.size > 500000 && price === "") {
        Swal.fire(
          "Invalid!",
          "File is too large, maximum size is 500 Kb.",
          "error"
        );
      } else if (
        !/^[0-9]+(.[0-9]{0})?$/.test(price) &&
        files[0].file.size > 500000
      ) {
        Swal.fire(
          "Invalid!",
          " File is too large and incorrect format on field Price",
          "error"
        );
      } else if (!/^[0-9]+(.[0-9]{0})?$/.test(price)) {
        Swal.fire("Invalid!", "Incorrect format on field Price", "error");
      } else if (files.length === 0) {
        Swal.fire(
          "Invalid!",
          "Data can't be empty,please fill out the fields.",
          "error"
        );
      } else if (files[0].file.size > 500000) {
        Swal.fire(
          "Invalid!",
          "File is too large, maximum size is 500 Kb.",
          "error"
        );
      } else if (price == "") {
        Swal.fire(
          "Invalid!",
          "Data can't be empty,please fill out the fields.",
          "error"
        );
      } else if (title === "") {
        Swal.fire(
          "Invalid!",
          "Data can't be empty,please fill out the fields.",
          "error"
        );
      } else if (files.length === 0) {
        Swal.fire(
          "Invalid!",
          "Image can't be empty,please choose image file.",
          "error"
        );
      } else if (description === "") {
        Swal.fire(
          "Invalid!",
          "Data can't be empty,please fill out the fields.",
          "error"
        );
      } else {
        handleButton();
      }
    } else {
      Swal.fire("Invalid file image!", "", "error");
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
            setFiles([]);
            Toast.fire({
              icon: "success",
              title: "Success add new service",
            });

            setTimeout(() => {
              router.push("/admin");
            }, 2000);
            return dispatch(allstore.getAllService());
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
              Swal.fire(
                "Invalid!",
                "The title you entered may already be registered",
                "error"
              );
            }
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
    <div className={`flex justify-center items-center ${styles.adminbg}`}>
      <div
        className={`${styles.glass} w-[700px] h-auto my-8 p-4 py-12 flex justify-center flex-col items-center backdrop-blur-[5px] bg-[#ffffffd3] rounded-xl`}
      >
        {/* content */}
        <h1 className=" text-5xl text-center  font-bold mb-12 ">
          Add New Service
        </h1>
        <div>
          <form className={`w-[528px]" action="#" method="POST ${styles.form}`}>
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
                placeholder="30000"
                autoComplete="off"
                required
                className={` h-12 mb-5 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border-2 border-solid border-black rounded-lg transition ease-in-out m-0  focus:text-gray-700 focus:border-primary focus:outline-none bg-transparent`}
              />
            </div>

            <h1 className=" text-3xl mb-2">Image</h1>
            <FilePond
              dropOnPage={true}
              dropValidation={true}
              acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
              maxFileSize={500000}
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              accept="image/png, image/jpeg, image/jpg"
              maxFiles={1}
              name="files"
              labelIdle='Please select a picture with extension /.png /.jpg /.jpeg <br/> <span class="filepond--label-action">Browse File</span>'
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
                onClick={() => router.push("/admin")}
                className="w-[240px] h-[50px] mt-10 mx-5 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-xl text-white bg-red-700 hover:bg-transparent hover:border-black hover:border-2 hover:text-black hover:font-bold focus:outline-none transition ease-linear duration-500"
              >
                Back
              </button>
              <button
                onClick={validateButton}
                className="w-[240px] h-[50px] mt-10 mx-5 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-xl text-white bg-primary hover:bg-transparent hover:border-black hover:border-2 hover:text-black hover:font-bold focus:outline-none transition ease-linear duration-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <style jsx global>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

export default NewItem;
