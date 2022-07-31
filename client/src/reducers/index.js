import { combineReducers } from "redux";
import authReducer from "./authReducer";

//export the reducers
export default combineReducers({
    auth: authReducer
});