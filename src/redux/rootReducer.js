import { combineReducers } from "redux";
import userReducer from "./account/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
