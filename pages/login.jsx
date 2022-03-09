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

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const router = useRouter();

  function validateLogin(e) {
    e.preventDefault();

    if (email === '' && password === '') {
      Swal.fire('Invalid!', 'Email / Password cannot be empty.', 'error');
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      Swal.fire('Invalid!', 'Email format is not valid, email cannot contain spaces.', 'error');
    }
    else if (!/^(?!.*\s).{5,8}$/.test(password)) {
      Swal.fire('Invalid!', 'Password cannot contain spaces, minimum 5 characters, and maximum 8 characters.', 'error');
    }
    else {
      handleLogin()
    }
  }

  function handleLogin() {
    setLoading(true);
    const body = {
      email,
      password,
    }
    axios
    .post('https://ynwahid.cloud.okteto.net/login', body)
    .then(({data}) => {
      if(data) {
        setShow(true);
        setEmail('');
        setPassword('');
        Swal.fire(`Success login!`, 'You can start using the S3 service now.', 'success')
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('is_admin', data.data.is_admin)
      router.push('/')
        }
    })

    /* 
    catch( error => { return Promise.reject(error.response.data.error); });
    */
    .catch((error) => {
      if(error) {
        setShow(true);
        setEmail('');
        setPassword('');
        Swal.fire(`Ooppss!!`, 'Invalid Email / Password', 'error');
      }
    })
    .finally(() => {
      setLoading(false);
    })
  }


    if (loading) {
      return (
        <Loading />
      );
  }

  /* 
  Swal.fire({
    title: 'Please Wait !',
    html: "This may take a few seconds, please don't close this page."",
    allowOutsideClick: false,
    onBeforeOpen: () => {
        Swal.showLoading()
    },
  })
  */

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
                type="text"
                placeholder="Email"
                autoComplete="off" 
                required 
                className="h-[50px] bg-transparent appearance-none rounded-xl relative block w-full px-3 py-2 border-2 border-primary placeholder-gray-700 text-black md:text-[18px] focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                value={email}
                onChange={(e) => { setEmail(e.target.value)}}
                />
              </div>

              <div className='mt-8'>
                <label htmlFor="password" className="sr-only">Password</label>
                <input 
                id="password" 
                name="password" 
                type="password"
                maxLength="8"
                placeholder="Password"
                autoComplete="off" 
                required 
                className="h-[50px] bg-transparent appearance-none relative block w-full px-3 py-2 border-2 border-primary placeholder-gray-700 text-black md:text-[18px] rounded-xl focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                value={password}
                onChange={(e) => { setPassword(e.target.value)}}
                />
              </div>

              <div className='flex justify-center'>
                <button
                className="w-[250px] h-[50px] mt-10 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-xl text-white bg-primary hover:bg-transparent hover:border-primary hover:border-2 hover:text-primary hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={validateLogin}
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