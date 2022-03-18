import axios from "axios";

export const getListOrders = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(`https://ynwahid.cloud.okteto.net/orders`, config)
        .then(({ data }) => {
          console.log(data.data, "data admin");
          dispatch(setOrders(data.data));
          resolve(data.data);
        })

        .catch((err) => {
          reject(console.log(err));
          console.log(err.response);
        });
    });
  };
};

export const setOrders = (payload) => {
  return {
    type: "SET_LIST_ORDERS",
    payload,
  };
};
