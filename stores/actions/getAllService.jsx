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
      if(err.response.status === 401) {
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
            router.push("/login");
            localStorage.clear();
          }
        });
      }
    })
  }
}

export const setService = (payload) => {
  return {
    type: "SET_LIST_SERVICE",
    payload
  };
};