import React from 'react';
import Link from 'next/link';

function notFound() {
	return (
		<div
			className='flex items-center justify-center w-screen h-screen bg-cover bg-no-repeat'
			style={{
				backgroundImage:
					'url(https://images.unsplash.com/photo-1545992491-eb61496ccaed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
			}}>
			<div className='container min-h-screen min-w-full flex items-center justify-center bg-[#f0f0f0] bg-opacity-20'>
				<div className='lg:px-40 lg:py-20 px-5 py-10 bg-white bg-opacity-70 backdrop-blur-[10px] w-[50%] h-[50%] rounded-md shadow-xl'>
					<div className='flex flex-col items-center'>
						<h1 className='font-bold text-primary text-5xl lg:text-9xl'>404</h1>

						<h6 className='mb-2 text-[18px] font-bold text-center text-black lg:text-3xl'>
							<span className='text-red-700'>Oops!</span> Page not found
						</h6>

						<p className='mb-8 text-center text-black lg:text-lg'>
							The page you’re looking for doesn’t exist.
						</p>

						<Link href='/'>
							<a className='lg:px-6 lg:py-2 px-3 py-1 text-sm text-white bg-primary border-2 border-primary rounded-md hover:bg-transparent hover:border-primary hover:border-2 hover:text-primary'>
								Go home
							</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default notFound;
