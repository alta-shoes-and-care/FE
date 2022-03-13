import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../styles/History.module.css";
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
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateSize);

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
    if (files.length === 1) {
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
      } else if (description === "") {
        Swal.fire(
          "Invalid!",
          "Data can't be empty,please fill out the fields.",
          "error"
        );
      } else {
        handleEdit();
      }
    }
  }

  function editImage() {
    const formData = new FormData();
    formData.append("file", files[0].file);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "multipart/form-data",
    };

    axios
      .put(
        `https://ynwahid.cloud.okteto.net/services/jwt/${idProduct}`,
        formData,
        config
      )
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Invalid!", "Forms can't be empty", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleEdit(el) {
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

      const dataUpdate = {
        id: idProduct,
        title: title,
        price: price,
        description: description,
      };

      if (result.isConfirmed) {
        setLoading(true);
        axios
          .put(
            `https://ynwahid.cloud.okteto.net/services/jwt`,
            dataUpdate,
            config
          )
          .then(({ data }) => {
            Toast.fire({
              icon: "success",
              title: "Success edit data",
            });
            return editImage();
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
              Swal.fire("Invalid!", "Forms can't be empty", "error");
            }
          })
          .finally(() => {
            setLoading(false);
            setTimeout(() => {
              router.push("/admin");
            }, 3000);
          });
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
          Edit Service
        </h1>
        <div>
          <form className=" w-[528px]" action="#" method="PUT">
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
                Cancel
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
    </div>
  );
}

export default EditItem;
