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
