import { combineReducers } from "redux";
import userReducers from "./user/user.slices";
import submitFormReducers from "./submitForm/submitForm.slices";
import articleReducers from "./article/article.slices";


const reducers = combineReducers({
  userReducers,
  articleReducers,
  submitFormReducers
});

export default reducers;
