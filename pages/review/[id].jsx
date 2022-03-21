import React, { useState, useEffect } from 'react';
import styles from '../../styles/History.module.css';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import Loading from '../../components/Loading';

export default function Review() {
	const router = useRouter();
	const { id } = router.query;

	const [loading, setLoading] = useState(true);
	const [isValid, setIsValid] = useState(false);
	const [rating, setRating] = useState(null);
	const [name, setName] = useState('');
	const [review, setReview] = useState('');
	const [service_id, setService_id] = useState(0);
	const [order_id, setOrder_id] = useState(0);

	const starReview = {
		size: 50,
		value: 0,
		edit: true,
		color: '#ffffffb8',
	};

	const ratingChanged = (value) => {
		setRating(value);
	};

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			return router.push('/login');
		} else if (localStorage.getItem('is_admin') == 'true') {
			return router.push('/404');
		} else if (id) {
			setLoading(true);
			const token = localStorage.getItem('token');
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			axios
				.get(`https://ynwahid.cloud.okteto.net/orders/${id}`, config)
				.then(({ data }) => {
					if (data) {
						if (localStorage.getItem('user_id') == data.data.user_id) {
							setService_id(data.data.service_id);
							setOrder_id(data.data.id);
							console.log(data);
							setIsValid(true);
						} else if (localStorage.getItem('user_id') !== data.data.user_id) {
							return router.push('/404');
						}
					}
				})
				.catch((err) => {
					console.log(err.response);
					if (err.response.status === 401) {
						Swal.fire({
							title: 'Your session has ended!',
							text: 'Please login again to continue.',
							icon: 'error',
							showCancelButton: false,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: 'Ok',
						}).then((result) => {
							if (result.isConfirmed) {
								router.push('/login');
								localStorage.clear();
							}
						});
					} else {
						router.push('/404');
					}
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [id]);

	function validateReview(e) {
		e.preventDefault();
		if (rating === null && review === '') {
			Swal.fire('Invalid!', 'Rating and Comment cannot be empty!', 'error');
		} else if (rating === null) {
			Swal.fire('Invalid!', 'Rating cannot be empty!', 'error');
		} else if (review === '') {
			Swal.fire('Invalid!', 'Comment cannot be empty!', 'error');
		} else if (review.length >= 320) {
			Swal.fire('Invalid!', 'Maximum comment is 320 characters.', 'error');
		} else {
			handleReview();
		}
	}

	function handleReview() {
		setLoading(true);
		const token = localStorage.getItem('token');
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		const body = {
			service_id,
			order_id,
			rating,
			review,
		};
		axios
			.post(`https://ynwahid.cloud.okteto.net/reviews/jwt`, body, config)
			.then(({ data }) => {
				if (data) {
					Swal.fire(`Thankyou!`, 'Your review means a lot to us :)', 'success');
					router.push('/history-order');
				}
			})
			.catch((err) => {
				console.log(err.response);
				Swal.fire(
					`Failed add review!`,
					'There seems to be a problem with our server :(',
					'error'
				);
				if (err.response.status === 401) {
					Swal.fire({
						title: 'Your session has ended!',
						text: 'Please login again to continue.',
						icon: 'error',
						showCancelButton: false,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Ok',
					}).then((result) => {
						if (result.isConfirmed) {
							router.push('/login');
							localStorage.clear();
						}
					});
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}

	if (loading || !isValid) {
		return <Loading />;
	}

	return (
		<div className={`flex justify-center items-center ${styles.historybg}`}>
			<div
				className={` w-[700px] h-screen my-8 p-4 flex justify-center flex-col items-center ${styles.historyGlass}`}>
				{/* content */}
				<h1 className=" text-5xl text-center font-bold mb-12 ">
					Thank you for using our service
				</h1>
				<div>
					<form className=" w-[528px]" action="#" method="POST">
						<h1 className=" text-3xl mb-[-13px]">Rate</h1>

						<ReactStars {...starReview} onChange={ratingChanged} />

						<h1 className=" text-3xl mb-3">Comment</h1>
						<textarea
							required
							maxLength="320"
							value={review}
							onChange={(e) => {
								setReview(e.target.value);
							}}
							className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${styles.inputbg}`}
							id="exampleFormControlTextarea1"
							rows="3"
							placeholder="Your comment"></textarea>

						<div className="flex justify-center">
							<button
								type="submit"
								onClick={validateReview}
								className="w-[250px] h-[50px] mt-10 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-xl text-white bg-primary hover:bg-transparent hover:border-primary hover:border-2 hover:text-primary hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary  transition ease-linear duration-500">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
