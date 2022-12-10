import { combineReducers } from "redux";
import { portfolioReducer } from "./portfolio";
import { userReducer } from "./user";

/* Combining the reducers. */
const rootReducer = combineReducers({
  user: userReducer,
  portfolio: portfolioReducer,
});

export default rootReducer;
