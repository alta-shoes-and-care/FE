import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaArrowRight } from 'react-icons/fa';

import Loading from '../components/Loading';

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const router = useRouter();

  function validateRegister(e) {
    e.preventDefault();

    if (name === '' && email === '' && password === '') {
      Swal.fire('Invalid!', 'Data cannot be empty!', 'error')
    }
    else if (name.trim().length <= 3) {
      // nama boleh ada spasi, boleh ada huruf besar, boleh ada spesial karakter, angka, dll yang penting tidak boleh kurang dari 3
      setShow(true);
      Swal.fire('Invalid!','Name must be more than 3 characters.','error')
    }  
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setShow(true);
      Swal.fire('Invalid!','Email format is not valid.','error')
    }
    else if (!/^(?!.*\s).{5,8}$/.test(password)) {
      /* 
      password tidak boleh ada spasi
      min 5, max 8
      boleh huruf besar, huruf kecil, angka, dan spesial karakter
      */
      setShow(true);
      Swal.fire('Invalid!','Password must not contain spaces, minimum 5 characters, and maximum 8 characters.', 'error')
    } else {
      handleRegister()
    }
  }

  function handleRegister() {
    setLoading(true);
    const body = {
      name,
      email,
      password,
      is_admin : false
    }
    axios
    .post('https://ynwahid.cloud.okteto.net/users', body)
    .then(({data}) => {
      Swal.fire(
        `Success Regist! - ${data.code}`,
        'you can login now',
        'success'
      )
      console.log(data);
      setShow(true);
      setName('');
      setEmail('');
      setPassword('');
      router.push('/login')
    })
    .catch((error) => {
      if(error) {
        Swal.fire(`Error! - ${error}`, 'The data you entered is already registered', 'error');
        setShow(true);
        setName('');
        setEmail('');
        setPassword('');
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

  return (
    <div className='container min-h-screen min-w-full flex justify-center text-center bg-cover bg-no-repeat' style={{backgroundImage: "url(https://images.unsplash.com/photo-1509472290917-08d8d47c5fca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)"}}>
      <div className='container min-h-screen min-w-full flex justify-center text-center bg-[#f0f0f0] bg-opacity-30'>
        <div className='w-[600px] h-[600px] bg-white bg-opacity-50 backdrop-blur-[10px] my-auto flex justify-center items-center rounded-2xl'>
          <div>
            <h1 className='font-bold text-[40px] text-primary'>Welcome to S3</h1>
            <h4 className='font-md text-[20px] text-black'>Create new account by filling the form below.</h4>

            <form className="mt-8 w-[528px] mx-auto" action="#" method="POST">

            <div>
                <label htmlFor="name-user" className="sr-only">Name</label>
                <input 
                id="name-user" 
                name="name" 
                type="text"
                placeholder="Name"
                autoComplete="off" 
                required 
                className="h-[50px] bg-transparent appearance-none rounded-xl relative block w-full px-3 py-2 border-2 border-primary placeholder-gray-700 text-black md:text-[18px] focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                value={name}
                onChange={(e) => { setName(e.target.value)}}
                />
              </div>


              <div className='mt-8'>
                <label htmlFor="email-address" className="sr-only">Email</label>
                <input 
                id="email-address" 
                name="email" 
                type="email"
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
                onClick={validateRegister}
                >
                  Sign up
                </button>
              </div>

              <p className='text-[18px]'>Already have an account?
                <Link href="/login">
                  <a>
                    <span className='font-bold'> Login <FaArrowRight className='inline' /></span> 
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