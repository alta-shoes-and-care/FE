import React, {useState, useEffect} from "react";
import styles from "../../styles/History.module.css";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import Swal from "sweetalert2";
import {useRouter} from 'next/router';

export default function Review() {
  const starReview = {
    size: 50,
    value: 0,
    edit: true,
    color: "#ffffffb8",
  };

  const router = useRouter();
  const query = router.query;
  const id = query.id;

  const [name, setName] = useState('');
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState('');
  const [service_id, setService_id] = useState(0);
  const [order_id, setOrder_id] = useState(0);

  const [loading, setLoading] = useState(false);

  const ratingChanged = (value) => {
    setRating(value);
    console.log(value);
  };

  useEffect(() => {
    const id = query.id;
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
    .get(`https://ynwahid.cloud.okteto.net/orders/${id}`, config)
    .then(({data}) => {
      setService_id(data.data.service_id);
      setOrder_id(data.data.id);
    })
    .catch((err) => {
      console.log(err.response);
    })
  }, []);

  function validateReview(e){
    e.preventDefault();
    if(name === '' && rating === 0 && review === '') {
      setShow(true);
      Swal.fire('Invalid!', 'Data cannot be empty!', 'error')
    }
    else if (!/^[A-Za-z0-9](?!.*?\s$)(?![0-9]+$)[A-Za-z0-9\s]{3,30}$/gm.test(name)) {
      setShow(true);
      Swal.fire('Invalid!','Name cannot contain spaces at the beginning and end, minimum 4 characters, and maximum 30 characters.','error')
    }
    else if (review.length >= 320) {
      setShow(true);
      Swal.fire('Invalid!', 'Maximum comentar is 320 characters.', 'error')
    }
    else {
      handleReview();
    }
  }

  function handleReview() {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
      const body = {
        service_id,
        order_id,
        rating,
        review,
    }
    axios
    .post(`https://ynwahid.cloud.okteto.net/reviews`, body, config)
    .then(({data}) => {
        if(data) {
        setRating(null);
        setReview('')
        console.log(data);
        Swal.fire(`Thankyou!`, 'Your review means a lot to us :)', 'success');
        router.push('/history-order');
        }
    })
    .catch((err) => {
        console.log(err.response)
        Swal.fire(`Failed add review!`, 'There seems to be a problem with our server :(', 'error');
    })
    .finally(() => {
      setLoading(false);
    })
  }

// function handleCheck(e) {
//     e.preventDefault();
//     console.log(service_id);
//     console.log(order_id);
//     console.log(rating);
//     console.log(review);
//   }

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
    <div className={`flex justify-center items-center ${styles.historybg}`}>
      <div
        className={` w-[700px] h-screen my-8 p-4 flex justify-center flex-col items-center ${styles.historyGlass}`}
      >
        {/* content */}
        <h1 className=" text-5xl text-center  font-bold mb-12 ">
          Thank you for using our service
        </h1>
        <div>
          <h1 className=" text-3xl mb-3">Name</h1>

          <form className=" w-[528px]" action="#" method="POST">
            <div>
              <input
                name="name"
                type="text"
                placeholder="input your name"
                autoComplete="off"
                required
                value={name}
                onChange={(e) => { setName(e.target.value)}}
                className={` h-12 mb-5 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 focus:outline-none focus:bg-white ${styles.inputbg}`}
              />
            </div>
            <h1 className=" text-3xl mb-[-13px]">Rate</h1>

            <ReactStars {...starReview} 
            onChange={ratingChanged}
             />

            <h1 className=" text-3xl mb-3">Comment</h1>
            <textarea
              required
              maxLength='320'
              value={review}
              onChange={(e) => { setReview(e.target.value)}}
              className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${styles.inputbg}`}
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Your message"
            ></textarea>

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