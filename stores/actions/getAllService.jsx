import axios from "axios";
import Swal from "sweetalert2";

export const getAllService = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get("https://ynwahid.cloud.okteto.net/services")
        .then(({ data }) => {
          console.log(data.data);
          dispatch(setService(data.data));
          resolve(data.data);
        })

        .catch((err) => {
          reject(console.log(err));
          console.log(err.response);
          if (err.response.status === 401) {
            Swal.fire({
              title: "Your session has ended!",
              text: "Please login again to continue.",
              icon: "error",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                // router.push("/login");
                localStorage.clear();
              }
            });
          } else {
            Swal.fire("Ooppss!", "Sorry, the server is error.", "error");
          }
        });
    });
  };
};

export const setService = (payload) => {
  return {
    type: "SET_LIST_SERVICE",
    payload,
  };
};
