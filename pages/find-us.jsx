import React from 'react'
import {FaMapMarkerAlt, FaEnvelope} from 'react-icons/fa';

const data = [
  {
    branch: "Shoes Service Station Tangerang",
    address: "Jl. Tentara Pelajar No. 40",
    email: "s3tangerang@mail.com"
  },
  {
    branch: "Shoes Service Station Jakarta Pusat",
    address: "Jl. MH Thamrin No. 7",
    email: "s3jakpus@mail.com"
  },
  {
    branch: "Shoes Service Station Jakarta Selatan",
    address: "Jl. Mampang Prapatan No. 34",
    email: "s3jaksel@mail.com"
  },
  {
    branch: "Shoes Service Station Jakarta Barat",
    address: "Jl. Majapahit No. 1",
    email: "s3jakbar@mail.com"
  },
  {
    branch: "Shoes Service Station Depok",
    address: "Jl. Kartini No. 90",
    email: "s3depok@mail.com"
  },
  {
    branch: "Shoes Service Station Bandung",
    address: "Jl. Asia Afrika No. 112",
    email: "s3bandung@mail.com"
  },
  {
    branch: "Shoes Service Station Pekalongan",
    address: "Jl. Jendral Sudirman No. 14",
    email: "s3pekalongan@mail.com"
  },
  {
    branch: "Shoes Service Station Klaten",
    address: "Jl. Hos Cokro Aminoto No. 5",
    email: "s3klaten@mail.com"
  },
  {
    branch: "Shoes Service Station Banyuwangi",
    address: "Jl. Urip Sumoharjo No. 75",
    email: "s3banyuwangi@mail.com"
  },
  {
    branch: "Shoes Service Station Madura",
    address: "Jl. KH Mas Mansyur No. 31",
    email: "s3madura@mail.com"
  },
  {
    branch: "Shoes Service Station Malang",
    address: "Jl. Swiwijaya No 44",
    email: "s3malang@mail.com"
  },
  {
    branch: "Shoes Service Station Semarang",
    address: "Jl. MT Haryono No. 9",
    email: "s3semarang@mail.com"
  },
  {
    branch: "Shoes Service Station Surabaya",
    address: "Jl. WR Supratman No. 59",
    email: "s3surabaya@mail.com"
  },
  {
    branch: "Shoes Service Station Yogyakarta",
    address: "Jl. Pahlawan No. 67",
    email: "s3yogyakarta@mail.com"
  }
]

export default function FindUs() {
  return (
    <div className='bg-no-repeat bg-cover' style={{
      backgroundImage:
        "url(https://images.unsplash.com/photo-1581007036738-f2fabcd681c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
    }}>
    <div className='container mx-auto py-8 divide-y-[1px] divide-gray-500'>
      <div>
        <h1 className='text-[48px] text-white font-bold text-center'>Find Us</h1>
        <h2 className='font-medium text-white text-[24px] text-center mb-10'>Our branches throughout Indonesia :</h2>
      </div>

      <div className='flex flex-row flex-wrap mx-auto w-3/4'>
      {data.map((el, i) => (
        <div className='mt-10 mx-auto flex justify-between w-[45%] bg-white bg-opacity-70 backdrop-blur-[5px]'>
          <div className='w-1/5 pl-5 pt-1'>
            <FaMapMarkerAlt className='w-[45px] h-[60px] text-primary' />
          </div>

          <div className='w-4/5 py-5'>
            <p className='text-[18px] font-semibold'>{el.branch}</p>
            <p className='text-[18px]'>{el.address}</p>
            <p className='text[18px]'><FaEnvelope className='text-primary inline' /> {el.email}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
    </div>
  )
}