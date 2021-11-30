import { combineReducers } from "redux";
import weatherReducer from "./weather";

const allReducers = combineReducers({
    weather: weatherReducer
})

export default allReducers