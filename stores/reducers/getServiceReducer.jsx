const initialState = []

const getServiceReducer = (state = initialState, action) => {
  if (action.type == "SET_LIST_SERVICE") {
    if(Array.isArray(action.payload)) return action.payload;
  }

  return state;
};

export default getServiceReducer;