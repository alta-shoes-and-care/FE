import getServiceReducer from "../reducers/getServiceReducer";

export const getServiceAction = () => {
  return (dispatch) => {
    dispatch(setService());
  }
}

export const setService = (payload) => {
  return {
    type: "SET_LIST_SERVICE",
    payload
  };
};