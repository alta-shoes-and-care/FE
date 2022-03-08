import React from "react";
import styles from "../../styles/History.module.css";
import ReactStars from "react-rating-stars-component";

function Review() {
  const starReview = {
    size: 50,
    value: 0,
    edit: true,
    color: "#ffffffb8",
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
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
          <h1 className=" text-3xl mb-3">User Name</h1>

          <form className=" w-[528px]" action="#" method="POST">
            <div>
              <input
                name="name"
                type="text"
                placeholder="input your name"
                autoComplete="off"
                required
                className={` h-12 mb-5 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 focus:outline-none focus:bg-white ${styles.inputbg}`}
              />
            </div>
            <h1 className=" text-3xl mb-[-13px]">Rate</h1>

            <ReactStars {...starReview} onChange={ratingChanged} />

            <h1 className=" text-3xl mb-3">Comentar</h1>
            <textarea
              required
              className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${styles.inputbg}`}
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Your message"
            ></textarea>

            <div className="flex justify-center">
              <button className="w-[250px] h-[50px] mt-10 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-xl text-white bg-primary hover:bg-transparent hover:border-primary hover:border-2 hover:text-primary hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary  transition ease-linear duration-500">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Review;
