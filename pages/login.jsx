import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaArrowRight } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     Swal.fire({
  //       title: "You are logged in",
  //       text: "Please return to the landing page",
  //       icon: "info",
  //       showCancelButton: false,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Ok",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         router.push("/");
  //       }
  //     });
  //   }
  // });

  function validateLogin(e) {
    e.preventDefault();

    if (email === "" && password === "") {
      Swal.fire("Invalid!", "Email / Password cannot be empty.", "error");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) &&
      !/^(?!.*\s).{5,8}$/.test(password)
    ) {
      Swal.fire(
        "Invalid!",
        "Email / Password incorrect! please check and try again.",
        "error"
      );
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      Swal.fire(
        "Invalid!",
        "Email format is not valid, email cannot contain spaces.",
        "error"
      );
    } else if (!/^(?!.*\s).{5,8}$/.test(password)) {
      Swal.fire(
        "Invalid!",
        "Password cannot contain spaces, minimum 5 characters, and maximum 8 characters.",
        "error"
      );
    } else {
      handleLogin();
    }
  }

  function hanldeSession(params) {
    setTimeout(() => {
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
    }, 300000);
  }

  function handleLogin() {
    setLoading(true);
    const body = {
      email,
      password,
    };
    axios
      .post("https://ynwahid.cloud.okteto.net/login", body)
      .then(({ data }) => {
        if (data) {
          setEmail("");
          setPassword("");
          Swal.fire(
            `Login success!`,
            "You can use our service now.",
            "success"
          );
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("is_admin", data.data.is_admin);
          router.push("/");
          return hanldeSession();
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err.response.status);
          setEmail("");
          setPassword("");
          Swal.fire(`Ooppss!!`, "Invalid Email / Password.", "error");
        } else if (err.response.status === 401) {
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
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    Swal.fire({
      title: "Please Wait!",
      html: "This may take a few seconds, please don't close this page.",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
  }

  function returnLogin() {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("token")) {
        return (
          <div
            className="container min-h-screen min-w-full flex justify-center text-center bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
            }}
          >
            <div className="container min-h-screen min-w-full flex justify-center text-center bg-[#f0f0f0] bg-opacity-30">
              <div className="w-[70%] h-[50%] lg:w-[600px] lg:h-[600px] bg-white bg-opacity-50 backdrop-blur-[10px] my-auto flex justify-center items-center rounded-2xl">
                <div>
                  <h1 className="font-bold text-[30px] lg:text-[40px] text-primary">
                    Welcome back!
                  </h1>
                  <h4 className="font-md text-[14px] lg:text-[20px] text-black">
                    Login to your account.
                  </h4>

                  <form
                    className="mt-8 w-[528px] mx-auto"
                    action="#"
                    method="POST"
                  >
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="text"
                        placeholder="Email"
                        autoComplete="off"
                        required
                        className="lg:h-[50px] h-[30px] lg:w-full w-[50%] bg-transparent appearance-none lg:rounded-xl rounded-md relative px-3 py-2 border-2 border-primary placeholder-gray-700 text-black lg:text-[18px] text-[15px] focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mt-4 lg:mt-8">
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        maxLength="8"
                        placeholder="Password"
                        autoComplete="off"
                        required
                        className="lg:h-[50px] h-[30px] lg:w-full w-[50%] bg-transparent appearance-none lg:rounded-xl rounded-md relative px-3 py-2 border-2 border-primary placeholder-gray-700 text-black lg:text-[18px] text-[15px] focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>

                    <div className="flex justify-center">
                      <button
                        className="lg:h-[50px] h-[30px] lg:w-full w-[20%] mt-5 lg:mt-10 text-center lg:text-[18px] text-[15px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium lg:rounded-xl rounded-md text-white bg-primary hover:bg-transparent hover:border-primary hover:border-2 hover:text-primary hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        onClick={validateLogin}
                      >
                        Login
                      </button>
                    </div>

                    <p className="text-[15px] lg:text-[18px] mt-3">
                      Don't have an account?
                      <Link href="/signup">
                        <a>
                          <span className="font-bold">
                            {" "}
                            Sign up <FaArrowRight className="inline" />
                          </span>
                        </a>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (localStorage.getItem("token")) {
        return (
          <div
            className="container min-h-screen min-w-full flex justify-center text-center bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
            }}
          >
            <div className="container min-h-screen min-w-full flex justify-center text-center bg-[#f0f0f0] bg-opacity-30">
              <div className="w-[70%] h-[60%] lg:w-[600px] lg:h-[600px] bg-white bg-opacity-50 backdrop-blur-[10px] my-auto flex justify-center items-center rounded-2xl">
                <div className="text-center mx-auto">
                  <h1 className="font-bold text-[30px] lg:text-[40px] text-primary">
                    You are logged in!
                  </h1>
                  <h4 className="font-md text-[14px] lg:text-[20px] text-black">
                    Please return to the landing page.
                  </h4>
                  <button
                    className="lg:h-[50px] h-[30px] lg:w-full w-[30%] mt-5 lg:mt-10 text-center mx-auto lg:text-[18px] text-[14px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium lg:rounded-xl rounded-md text-white bg-primary hover:bg-transparent hover:border-primary hover:border-2 hover:text-primary hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onClick={() => router.push("/")}
                  >
                    Oke
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
  return <div>{returnLogin()}</div>;
}

export default Login;
