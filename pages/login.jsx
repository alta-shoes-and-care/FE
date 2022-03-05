import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaArrowRight } from 'react-icons/fa';

import Loading from '../components/Loading';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function handleLogin(e) {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      const data = {email, password};
      setLoading(true)
      axios
      .post("", data)
      .then(({data}) => {
        if (data) {
          setEmail('');
          setPassword('');
          Toast.fire({
            icon: 'success',
            title: 'Welcome to S3'
          })
          localStorage.setItem('token', data.data.token)
          router.push("/")
        }
      })
      .catch((err) => {
        setEmail('');
        setPassword('');
        if (err) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Invalid Email / Password'
          })
        }
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }

  // Function Validation
  function formValidation() {
    const emailErr = {};
    const passwordErr = {};
    let isValid = true;

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      emailErr.mailtag = "Invalid Email";
      isValid = false;
    }
    if (password.length <= 8) {
        passwordErr.passleng = "Password must be at least 8 chars long";
        isValid = false;
    }

    setEmailErr(emailErr);
    setPasswordErr(passwordErr);
    setTimeout(() => {
        setEmailErr('');
        setPasswordErr('');
    }, 2000);
    return isValid;
    };

    // Notif success
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    if (loading) {
      return (
          <Loading />
      );
  }

  return (
    <div className='container min-h-screen min-w-full flex justify-center text-center bg-cover bg-no-repeat' style={{backgroundImage: "url(https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)"}}>
      <div className='container min-h-screen min-w-full flex justify-center text-center bg-[#f0f0f0] bg-opacity-30'>
        <div className='w-[600px] h-[600px] bg-white bg-opacity-50 backdrop-blur-[10px] my-auto flex justify-center items-center rounded-2xl'>
          <div>
            <h1 className='font-bold text-[40px] text-primary'>Welcome back!</h1>
            <h4 className='font-md text-[20px] text-black'>Login to your account.</h4>

            <form className="mt-8 w-[528px] mx-auto" action="#" method="POST">
              <div>
                <label htmlFor="email-address" className="sr-only">Email</label>
                <input 
                id="email-address" 
                name="email" 
                type="email"
                placeholder="Email"
                autoComplete="off" 
                required 
                className="h-[50px] bg-transparent appearance-none rounded-xl relative block w-full px-3 py-2 border-2 border-primary placeholder-gray-700 text-black md:text-[18px] focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                onChange={e => { setEmail(e.target.value)}}
                value={email}
                {...Object.keys(emailErr).map((key) => {
                  return
                    <div className='text-red-500 text-md text-left italic p-2'>
                      {emailErr[key]}
                    </div>
                })}
                />
              </div>

              <div className='mt-8'>
                <label htmlFor="password" className="sr-only">Password</label>
                <input 
                id="password" 
                name="password" 
                type="password"
                placeholder="Password"
                autoComplete="off" 
                required 
                className="h-[50px] bg-transparent appearance-none relative block w-full px-3 py-2 border-2 border-primary placeholder-gray-700 text-black md:text-[18px] rounded-xl focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                onChange={e => { setPassword(e.target.value)}}
                value={password}
                {...Object.keys(passwordErr).map((key) => {
                  return
                    <div className='text-red-500 text-md text-left italic p-2'>
                      {passwordErr[key]}
                    </div>
                })}
                />
              </div>

              <div className='flex justify-center'>
                <button
                className="w-[250px] h-[50px] mt-10 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-xl text-white bg-primary hover:bg-transparent hover:border-primary hover:border-2 hover:text-primary hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={handleLogin}
                >
                  Sign in
                </button>
              </div>

              <p className='text-[18px]'>Don't have an account?
                <Link href="/register">
                  <a>
                    <span className='font-bold'> Register <FaArrowRight className='inline' /></span> 
                  </a>
                </Link>
              </p>

              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login