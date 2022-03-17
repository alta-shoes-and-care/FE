import ReactLoading from 'react-loading';

export default function Loading() {
	return (
		<>
			<div className='bg-[#f0f0f0] flex h-screen'>
				<div className='m-auto'>
					<ReactLoading
						type='bars'
						color='#175C8C'
						className='lg:w-[75px] lg:h-[75px] mx-auto w-[50px] h-[50px]'
					/>
					<p className='lg:text-[18px] text-[15px] mx-10 font-bold text-slate-700 text-center'>
						This may take a few seconds please don't close this page.
					</p>
				</div>
			</div>
		</>
	);
}
