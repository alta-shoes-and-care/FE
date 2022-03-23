import Service from '../components/Service';
import Carousel from '../components/Carousel';
import { useState, useEffect } from 'react';

import ReactStars from 'react-rating-stars-component';
import Iframe from 'react-iframe';
import Image from 'next/image';
import axios from 'axios';

import vvm from '../assets/vvm.png';
import Gallery from '../components/Gallery';
import { data } from 'autoprefixer';

export default function Home() {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		axios
			.get(`https://ynwahid.cloud.okteto.net/reviews/`)
			.then(({ data }) => {
				setReviews(data.data);
			})
			.catch((err) => {
				console.log(err.response);
				if (err.response.status === 500) {
					return <></>;
				}
			});
	}, []);

	return (
		<div>
			<div>
				<Carousel />
			</div>

			<div className="w-full bg-[#f0f0f0] lg:py-20 py-10">
				<Service />
			</div>

			<div className="p-10 lg:p-20">
				<h1 className="font-bold text-black text-[36px] lg:text-[48px] text-center mb-8 ">
					What is everyone saying?
				</h1>

				{!reviews[0] ? (
					<div>
						<h2 className="text-center italic">No reviews yet.</h2>
					</div>
				) : (
					<div className="lg:flex lg:justify-evenly lg:flex-row lg:flex-wrap flex flex-col items-center my-auto">
						{reviews
							.slice(-3)
							.reverse()
							.map((el, i) => (
								<div
									key={i}
									className="border border-primary rounded-2xl w-3/4 h-auto mb-4 lg:h-[250px] lg:m-2 lg:w-1/4 p-5 text-center flex items-center flex-col">
									<h2 className="font-bold text-[24px]">{el.name}</h2>
									<div className="flex justify-center">
										<ReactStars size={30} value={el.rating} edit={false} />
									</div>
									<blockquote className="italic font-thin text-[18px]">
										"{el.review}"
									</blockquote>
								</div>
							))}
					</div>
				)}
			</div>

			<div className="w-full bg-[#f0f0f0] lg:py-20 py-10">
				<h1 className="font-bold text-black lg:text-[48px] text-[36px] text-center mb-8">
					Our Story
				</h1>
				<div className="lg:flex lg:justify-center lg:flex-row flex flex-col items-center">
					<div className="lg:w-2/5 lg:mr-1 text-center w-3/4">
						<Image
							src="https://images.unsplash.com/photo-1532561685579-890e8f61456a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80"
							alt="about"
							width="498px"
							height="400px"
						/>
					</div>

					<div className="lg:w-2/5 lg:mr-1 mt-5 w-3/4">
						<p className="lg:text-[20px] text-[18px] text-justify">
							Shoes Service Station is a business engaged in laundry and care
							services for washing quality shoes from Indonesia. <br />
							We offer various services such as washing and re-staining your
							shoes to restore the glory of your shoes. To date, we have
							completed many pairs of shoes and will continue to grow.
							<br />
							The name Shoes Service Station means that everyone can wash their
							shoes at our place with affordable prices and quality service. We
							hope to provide the best for you.
							<br />
							In addition, we also support the #zerowaste program by not using
							plastic laundry bags like most shoe laundry in general. Laundry
							bags from Shoes Service Store can be used repeatedly without
							polluting the environment. We hope that with a small gesture from
							us and with your help, we can reduce the amount of plastic use in
							Indonesia.
						</p>
					</div>
				</div>
			</div>

			<div className="p-10 lg:p-20">
				<Gallery />
			</div>

			<div className="w-full my-20">
				<div className="w-full bg-cover bg-no-repeat bg-bg-vvm">
					<div className="w-full bg-[#f0f0f0] bg-cover bg-opacity-30 py-10 lg:px-36 flex lg:justify-between lg:flex-row flex-col items-center cursor-pointer">
						<div className="lg:w-80 lg:h-[400px] w-3/4 mb-5 bg-white bg-opacity-80 backdrop-blur-[10px] flex flex-col justify-center items-center text-center p-10 rounded-2xl hover:scale-105">
							<div className="lg:h-[100px] h-auto">
								<h1 className="lg:text-[36px] text-[30px] text-black font-bold my-auto">
									Value
								</h1>
							</div>
							<div className="lg:h-[300px] h-auto">
								<p className="lg:text-[20px] text-[18px] text-black">
									Respect <br />
									Responsibility <br />
									Caring <br />
									Excellence <br />
									Integrity <br />
									Innovation
								</p>
							</div>
						</div>

						<div className="lg:w-80 lg:h-[400px] w-3/4 mb-5 bg-white bg-opacity-80 backdrop-blur-[10px] flex flex-col justify-center items-center text-center p-10 rounded-2xl hover:scale-105 cursor-pointer">
							<div className="lg:h-[100px] h-auto">
								<h1 className="lg:text-[36px] text-[30px] text-black font-bold my-auto">
									Vision
								</h1>
							</div>
							<div className="lg:h-[300px] h-auto">
								<p className="lg:text-[20px] text-[18px] text-black">
									To make footwear hygiene and shoe care a part of every
									individual's lifestyle by making S3 services available to
									everyone everywhere & have a positive environmental impact.
								</p>
							</div>
						</div>

						<div className="lg:w-80 lg:h-[400px] w-3/4 mb-5 bg-white bg-opacity-80 backdrop-blur-[10px] flex flex-col justify-center items-center text-center p-10 rounded-2xl hover:scale-105 cursor-pointer">
							<div className="lg:h-[100px] h-auto">
								<h1 className="lg:text-[36px] text-[30px] text-black font-bold my-auto">
									Mission
								</h1>
							</div>
							<div className="lg:h-[300px] h-auto">
								<p className="lg:text-[20px] text-[18px] text-black">
									To provide a world class professional footwear laundry &
									refurbishing service, of the highest quality & highest level
									of convenience to everyone, everywhere.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full relative bg-[#f0f0f0] py-20 text-center">
				{/* <Iframe
          url="http://www.youtube.com/embed/kyGR47nDrus"
          width="80%"
          height="500px"
          allow="fullscreen"
          display="initial"
          position="relative"
        /> */}
				<iframe
					src="https://www.youtube.com/embed/kyGR47nDrus"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
          gyroscope; picture-in-picture"
					allowFullScreen
					className="inline lg:w-[70%] lg:h-[500px] w-[90%] h-[300px]"></iframe>
			</div>
		</div>
	);
}
