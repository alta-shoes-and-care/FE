import React from "react";
import styles from "../../styles/History.module.css";

function NewItem() {
  return (
    <div className={`flex justify-center items-center ${styles.adminbg2}`}>
      <div
        className={` w-[700px] h-screen my-8 p-4 flex justify-center flex-col items-center ${styles.historyGlass}`}
      >
        {/* content */}
        <h1 className=" text-5xl text-center  font-bold mb-12 ">
          Add New Service
        </h1>
        <div>
          <form className=" w-[528px]" action="#" method="POST">
            <h1 className=" text-3xl mb-2">Service Title</h1>
            <div>
              <input
                name="title"
                type="text"
                placeholder="Input title"
                autoComplete="off"
                required
                className={` h-12 mb-5 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 focus:bg-white focus:outline-none ${styles.inputbg}`}
              />
            </div>

            <h1 className=" text-3xl mb-2">Price</h1>
            <div>
              <input
                min="0"
                name="price"
                type="number"
                placeholder="30.000"
                autoComplete="off"
                required
                className={` h-12 mb-5 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:bg-white focus:text-gray-700 focus:border-blue-600 focus:outline-none ${styles.inputbg}`}
              />
            </div>

            <h1 className=" text-3xl mb-2">Image</h1>
            <div>
              <input
                name="image"
                type="file"
                accept="image/*"
                placeholder=""
                autoComplete="off"
                required
                className={` h-12 mb-5 px-3 py-2 text-gray-700 border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 focus:bg-white focus:outline-none ${styles.inputbg}`}
              />
            </div>
            <h1 className=" text-3xl mb-2">Description</h1>
            <textarea
              required
              className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${styles.inputbg}`}
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Input description"
            ></textarea>

            <div className="flex justify-center">
              <button className="w-[250px] h-[50px] mt-10 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent font-medium rounded-xl text-white bg-primary hover:bg-transparent hover:border-white hover:border-2 hover:text-white hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-white focus:ring-primary  transition ease-linear duration-500">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewItem;
