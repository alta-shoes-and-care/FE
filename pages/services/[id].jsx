import React, {useEffect, useState} from "react";
import Service from "../../components/Service";

import { useRouter } from 'next/router';
import axios from "axios";
import NumberFormat from 'react-number-format';
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

export default function services() {

    const router = useRouter();
    let {id}=router.query
    const [loading, setLoading] = useState(false);

   
    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://ynwahid.cloud.okteto.net/services/${id}`)
            .then(({ data }) => {
                setLoading(true);
                setServices(data.data)
                console.log(data.data,'berhasil get')
            })
            .catch((err) => {
                console.log(err, "error bang");
            })
            .finally(() => {
                setLoading(false);
            });  
    
        window.scrollTo(0,0)
        }, [id]);


    const [services, setServices] = useState({
        'city': ""
        ,'description': ""
        ,'id': 0
        ,'name': ""
        ,'price': 0
        ,'user_id': 0
    });
    console.log(services)

    function handleOrder() {
        Swal.fire({
            title: `Are you sure wanna book this services? (${services.title}) `,
            text: "Please confirm your order",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#eeeee",
            confirmButtonText: "Book This Services",
            cancelButtonText: "Keep Looking",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push(`/payment/${services.id}`);
            }
          });
        }

    function handleOrder2() {
            router.push("/login");
        }
  

    function orderbutton(){
        if (typeof window !== "undefined") {
            // token = false
            if (!localStorage.getItem("token")) {
              return (
                <button class="bg-[#175C8C] hover:bg-white text-white hover:text-black font-bold py-4 px-6 border border-black rounded-lg"
                onClick={handleOrder2}>
                    <p className="text-xl rounded-xl"> Book this service </p>
                </button>
              );
              // token = true & admin = false
            } 
            else if (localStorage.getItem("is_admin") == "false" && localStorage.getItem("token")) {
              return (
                <button class="bg-[#175C8C] hover:bg-white hover:bg-opacity-60 text-white hover:text-black font-bold py-4 px-6 border border-black rounded-lg"
                onClick={handleOrder} >
                    <p className="text-xl rounded-xl"> Book this service </p>
                </button>
              );
            }    
        }
    }

    if (loading) {
        return (<Loading/>)
    }

    

    return (
        <section>
            <div class="z-0 grid grid-cols-1 h-screen bg-cover mt-[-100px]" style={{backgroundImage: `url('${services.image}')`}}> 
                <div className='z-1 w-[100vw] h-screen bg-[#000009] bg-opacity-30 text-center'>
                    <div class="z-2 grid grid-cols-2 gap-4 bg-cover mt-[100px]">
                        {/* Desc Card */} 
                        <div className='ml-[15vh] mt-[5vh] z-3 w-[75vh] h-auto bg-[#ffffff] bg-opacity-80  text-left rounded-lg pb-5'>
                            <p className="text-black bold text-4xl mt-[3.5vh] ml-[5vh]">
                                {services.title}  
                            </p>
                            <p className="text-black object-bottom text-left text-lg mt-[5vh] ml-[5vh] w-[65vh]"> 
                                {services.description}
                            </p>
                                <p className="text-primary text-md italic pt-5 text-left ml-[5vh]"> Services may varry depend on shoes material<bintang className="text-red-600">*</bintang></p>
                        </div>
                        {/* Desc Card End*/}
                        {/* Price and Button*/}
                        <div class="z-4 object-bottom ml-[5vh]">
                            <p className="z-5 text-white text-6xl mt-[55vh] mb-[3vh]"> 
                                <NumberFormat value={services.price} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} />,00
                            </p>
                            {orderbutton()}
                        </div>
                        {/* Price and Button end*/}
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 pt-2">
                <Service />
            </div>
        </section>
    );
}
