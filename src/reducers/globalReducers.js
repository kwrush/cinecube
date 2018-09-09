import { globalActionTypes } from "../constants/actionTypes";
import { combineReducers } from "redux";

const promptError = (state = null, action) => {
  const { type, payload } = action;
  if (type === globalActionTypes.PROMPT_ERROR) {
    return payload.promptError;
  }

  return state;
};

export default combineReducers({
  promptError
});