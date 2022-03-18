import { useEffect } from "react";
import { useDispatch } from "react-redux";
import allStore from "../stores/actions/index";
import Navbar from "./navbar";
import Footer from "./footer";
import HeadApp from "./HeadApp";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allStore.getAllService())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
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
      });

    dispatch(allStore.getListOrders())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
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
      });
  }, [dispatch]);

  return (
    <>
      <HeadApp />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
