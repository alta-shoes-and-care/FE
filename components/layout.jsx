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
    dispatch(allStore.getAllService());

    // dispatch(allStore.getListOrders());
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
