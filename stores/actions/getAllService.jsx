import axios from 'axios';

export const getAllService = () => {
  return (dispatch) => {
    axios
    .get('https://ynwahid.cloud.okteto.net/services')
    .then(({data}) => {
      console.log(data.data)
      dispatch(setService(data.data))
    })
    .catch(err => {
      console.log(err.response);
    })
  }
}

export const setService = (payload) => {
  return {
    type: "SET_LIST_SERVICE",
    payload
  };
};