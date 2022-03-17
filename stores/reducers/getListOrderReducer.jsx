const initialState = [];

const getListOrderReducer = (state = initialState, action) => {
  if (action.type == "SET_LIST_ORDERS") {
    return action.payload;
  }

  return state;
};

export default getListOrderReducer;
