import { useEffect } from "react";
import { useDispatch } from "react-redux";
import allStore from "../stores/actions/index"
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allStore.getServiceAction());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
