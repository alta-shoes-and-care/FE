import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../styles/admin.module.css";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
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

function EditItem() {
  const router = useRouter();
  const query = router.query;
  const id = query.id;
  const [product, setProduct] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [idProduct, setidProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  // Sweet Alert
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

  // Get Service
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
    const id = query.id;
    axios
      .get(`https://ynwahid.cloud.okteto.net/services/${id}`)
      .then(({ data }) => {
        setProduct(data.data);
        setTitle(data.data.title);
        setPrice(data.data.price);
        setDescription(data.data.description);
        setidProduct(data.data.id);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Validation Input
  function validateButton(e) {
    e.preventDefault();
    if (files.length === 0) {
      if (description === "" && title === "" && price === "") {
        Swal.fire(
          "Invalid!",
          "Data can't be empty,please fill out the fields.",
          "error"
        );
      } else if (
        !/^[0-9]+(.[0-9]{0})?$/.test(price) &&
        title === "" &&
        description === ""
      ) {
        Swal.fire("Invalid!", "Incorrect format on field Price", "error");
      } else if (!/^[0-9]+(.[0-9]{0})?$/.test(price)) {
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
      } else {
        handleEdit();
      }
    }
    // image.length == 1
    else if (
      (files.length === 1 && files[0].fileExtension == "png") ||
      (files.length === 1 && files[0].fileExtension == "jpg") ||
      (files.length === 1 && files[0].fileExtension == "jpeg")
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
      } else if (files.length === 0) {
        Swal.fire(
          "Invalid!",
          "Image can't be empty,please choose image file.",
          "error"
        );
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
      } else {
        handleEdit();
      }
    } else {
      Swal.fire("Invalid file image!", "", "error");
    }
  }

  function handleEdit(el) {
    const formData = new FormData();
    if (files.length == 0) {
      formData.append("id", +id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", +price);
      formData.append("file", files);
    }
    if (files.length == 1) {
      formData.append("id", +id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", +price);
      formData.append("file", files[0].file);
    }
    return Swal.fire({
      title: "Update this service?",
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
            `https://ynwahid.cloud.okteto.net/services/jwt`,
            formData,
            config
          )
          .then(({ data }) => {
            Toast.fire({
              icon: "success",
              title: "Success edit data",
            });
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
            // setTimeout(() => {
            //   router.push("/admin");
            // }, 3000);
          });
      }
    });
  }

  // Loading
  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`flex justify-center items-center ${styles.adminbg2}`}>
      <div
        className={` ${styles.glass} w-[700px] h-auto my-8 p-4 py-12 flex justify-center flex-col items-center backdrop-blur-[5px] bg-[#ffffffd3] rounded-xl`}
      >
        {/* content */}
        <h1 className=" text-5xl text-center  font-bold mb-12 ">
          Edit Service
        </h1>
        <div>
          <form className={`${styles.form} w-[528px`}>
            <h1 className=" text-3xl mb-2">Service Title</h1>
            <div>
              <input
                value={title}
                minLength="5"
                maxLength="30"
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                type="text"
                placeholder="Input title"
                autoComplete="off"
                required
                className={` h-12 mb-5 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border-2 border-solid border-black rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:border-primary focus:outline-none bg-transparent`}
              />
            </div>

            <h1 className=" text-3xl mb-2">Price</h1>
            <div>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                max="1000000000"
                name="price"
                type="number"
                placeholder="30000"
                autoComplete="off"
                required
                className={` h-12 mb-5 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border-2 border-solid border-black rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:border-primary focus:outline-none bg-transparent`}
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
              type="text"
              value={description}
              maxLength="320"
              onChange={(e) => setDescription(e.target.value)}
              required
              className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border-2 border-solid border-black rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:border-primary focus:outline-none bg-transparent`}
              id="exampleFormControlTextarea1"
              rows="3"
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
                type="button"
                className="w-[250px] h-[50px] mt-10 mx-5 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-xl text-white bg-primary hover:bg-transparent hover:border-black hover:border-2 hover:text-black hover:font-bold focus:outline-none transition ease-linear duration-500"
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

export default EditItem;
