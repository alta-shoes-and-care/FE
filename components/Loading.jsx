import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <>
      <div className='bg-[#f0f0f0] h-screen relative flex justify-center items-center'>
        <ReactLoading
        className='mx-auto absolute top-[200px]'
        type="cylon"
        color="#175C8C"
        height={250}
        width={250}
        />
        <p className='text-[18px] font-bold text-slate-700'>This may take a few seconds, please don't close this page.</p>
      </div>
    </>
  )
}

/* 
  Swal.fire({
    title: 'Please Wait !',
    html: "This may take a few seconds, please don't close this page.",
    allowOutsideClick: false,
    onBeforeOpen: () => {
        Swal.showLoading()
    },
  })
*/