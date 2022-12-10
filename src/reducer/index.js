import { combineReducers } from "redux";
import { userReducer } from "./user";

/* Combining the reducers. */
const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
