import { combineReducers } from "redux";
import { postfoliodata } from "./Portfolioinfo";
import { userReducer } from "./Userreducer";

/* Combining the reducers. */
const rootReducer = combineReducers({
  user: userReducer,
  postfoliodata: postfoliodata,
});

export default rootReducer;
