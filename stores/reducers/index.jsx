import { combineReducers } from "redux";
import getServiceReducer from "./getServiceReducer";
import getListOrdersReducer from "./getListOrdersReducer";

const rootReducers = combineReducers({
  getServiceReducer,
  getListOrdersReducer,
});

export default rootReducers;
