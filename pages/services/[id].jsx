import React, { useEffect, useState } from "react";
import Service from "../../components/Service";

import { useRouter } from "next/router";
import axios from "axios";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

export default function services() {
  const router = useRouter();
  let { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState({
    city: "",
    description: "",
    id: 0,
    name: "",
    price: 0,
    user_id: 0,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://ynwahid.cloud.okteto.net/services/${id}`)
      .then(({ data }) => {
        setLoading(true);
        setServices(data.data);
      })
      .catch((err) => {
        console.log(err, "error bang");
      })
      .finally(() => {
        setLoading(false);
      });

    window.scrollTo(0, 0);
  }, [id]);

  //button handle
  function handleOrder() {
    Swal.fire({
      title: `Are you sure wanna book this services? (${services.title}) `,
      text: "Please confirm your order",
      showCancelButton: true,
      confirmButtonColor: "#175C8C",
      cancelButtonColor: "#eeeee",
      confirmButtonText: "Book This Services",
      cancelButtonText: "Keep Looking",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/order/${services.id}`);
      }
    });
  }

  function handleOrder2() {
    router.push("/login");
  }

  function orderbutton() {
    if (typeof window !== "undefined") {
      // token = false
      if (!localStorage.getItem("token")) {
        return (
          <button
            class="bg-[#175C8C] hover:bg-white text-white hover:text-black font-bold py-4 px-6 border border-black rounded-lg"
            onClick={handleOrder2}
          >
            <p className="text-xl rounded-xl"> Book this service </p>
          </button>
        );
        // token = true & admin = false
      } else if (
        localStorage.getItem("is_admin") == "false" &&
        localStorage.getItem("token")
      ) {
        return (
          <button
            class="bg-[#175C8C] hover:bg-white hover:bg-opacity-60 text-white hover:text-black font-bold py-4 px-6 border border-black rounded-lg"
            onClick={handleOrder}
          >
            <p className="text-xl rounded-xl"> Book this service </p>
          </button>
        );
      }
    }
  }
  //button handle end

  //loading section

  if (loading) {
    return <Loading />;
  }

  //loading section end

  return (
    <section>
      <div
        class="z-0 grid grid-cols-1 h-screen bg-cover mt-[-100px]"
        style={{ backgroundImage: `url('${services.image}')` }}
      >
        <div className="z-1 w-[100vw] h-screen bg-[#000009] bg-opacity-30 text-center">
          <div class="z-2 grid grid-cols-2 gap-4 bg-cover mt-[100px]">
            {/* Desc Card */}
            <div className="ml-[15vh] mt-[5vh] z-3 w-[75vh] h-auto bg-[#ffffff] bg-opacity-80  text-left rounded-lg pb-5">
              <p className="text-black bold text-4xl mt-[3.5vh] px-10">
                {services.title}
              </p>
              <p className="text-black text-left text-lg mt-[5vh] px-10 ">
                {services.description}
              </p>
              <p className="text-black text-md pt-5 text-left px-10">
                Maximum pick-up service for same-day order at 18.00. Any order
                after that will be picked up the next day
                <bintang className="text-red-600">*</bintang>
              </p>
              <p className="text-primary text-md bold italic pt-5 text-left px-10">
                Services may varry depend on shoes material
                <bintang className="text-red-600">*</bintang>
              </p>
              <p className="text-black text-sm bold pt-10 text-right px-10">
                <bintang className="text-red-600">*</bintang>
                Term and condition applied
              </p>
            </div>
            {/* Desc Card End*/}

            {/* Price and Button*/}
            <div class="z-4 object-bottom ml-[5vh]">
              <p className="z-5 text-white text-6xl mt-[55vh] mb-[3vh]">
                <NumberFormat
                  value={services.price}
                  displayType={"text"}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  prefix={"Rp"}
                />
                ,00
              </p>
              {orderbutton()}
            </div>
            {/* Price and Button end*/}
          </div>
        </div>
      </div>
      <div class="mt-7 grid grid-cols-1 pt-2">
        <Service />
      </div>
    </section>
  );
}
