import { useEffect } from "react";
import { useDispatch } from "react-redux";
import allStore from "../stores/actions/index"
import Navbar from "./navbar";
import Footer from "./footer";
import HeadApp from "./HeadApp";

export default function Layout({ children }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allStore.getServiceAction());
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
