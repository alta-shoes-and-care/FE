const initialState = [];

const getListOrdersReducer = (state = initialState, action) => {
  if (action.type == "SET_LIST_ORDERS") {
    if (Array.isArray(action.payload)) return action.payload;
  }

  return state;
};

export default getListOrdersReducer;
