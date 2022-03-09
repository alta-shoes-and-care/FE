import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaArrowRight } from 'react-icons/fa';

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
    else if (!/^[A-Za-z0-9](?!.*?\s$)(?![0-9]+$)[A-Za-z0-9\s]{3,30}$/gm.test(name)) {
      /* 
      nama boleh ada spasi, tetapi tidak boleh didepan dan belakang
      nama boleh ada angka, tetapi tidak boleh jika angka semua
      nama tidak boleh ada spesial karakter
      minimal 4, maksimal 30
      */
      setShow(true);
      Swal.fire('Invalid!','Name cannot contain spaces at the beginning and end, minimum 4 characters, and maximum 30 characters.','error')
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      /* 
      email tidak boleh ada spasi (depan, tengah, belakang)
      email harus ada @ dan domain
      */
      setShow(true);
      Swal.fire('Invalid!','Email format is not valid, email cannot contain spaces.','error')
    }
    else if (!/^(?!.*\s).{5,8}$/.test(password)) {
      /* 
      password tidak boleh ada spasi
      min 5, max 8
      boleh huruf besar, huruf kecil, angka, dan spesial karakter
      */
      setShow(true);
      Swal.fire('Invalid!','Password cannot contain spaces, minimum 5 characters, and maximum 8 characters.', 'error')
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
      if(data) {
        setShow(true);
        setName('');
        setEmail('');
        setPassword('');
        Swal.fire(`Success create account!`, 'You can login now.', 'success');
        router.push('/login');
      }
    })
    .catch((error) => {
      if(error) {
        setShow(true);
        setName('');
        setEmail('');
        setPassword('');
        Swal.fire(`Failed create account!`, 'The data you entered may already be registered', 'error');
      }
    })
    .finally(() => {
      setLoading(false);
    })
  }

  if (loading) {
    Swal.fire({
      title: 'Please Wait!',
      html: "This may take a few seconds, please don't close this page.",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
          Swal.showLoading()
      },
    })
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
                maxLength="30"
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
                maxLength="8"
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