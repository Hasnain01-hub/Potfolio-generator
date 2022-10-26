import { combineReducers } from "redux";
import { userReducer } from "./Userreducer";


/* Combining the reducers. */
const rootReducer = combineReducers({
    user:userReducer,
});

export default rootReducer;