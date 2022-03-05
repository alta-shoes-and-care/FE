import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <>
      <div className='bg-[#f0f0f0] h-screen relative'>
        <ReactLoading
        className='mx-auto absolute inset-0 top-36'
        type="SpinningBubbles"
        color="#175C8C"
        height={250}
        width={250}
        />
        <p className='mx-auto mt-5 text-[18px] font-bold text-slate-700'>This may take a few seconds, please don't close this page.</p>
      </div>
    </>
  )
}