import { combineReducers } from "redux";
import getServiceReducer from "./getServiceReducer"

const rootReducers = combineReducers({ getServiceReducer });

export default rootReducers;