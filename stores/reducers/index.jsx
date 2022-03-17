import { combineReducers } from "redux";
import getServiceReducer from "./getServiceReducer";
import getListOrderReducer from "./getListOrderReducer";

const rootReducers = combineReducers({
  getServiceReducer,
  getListOrderReducer,
});

export default rootReducers;
