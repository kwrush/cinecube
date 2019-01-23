import { promptActionTypes as t } from "../constants/actionTypes";

export default (state = {}, action) => {
  const { type, payload } = action;
  if (type === t.PROMPT_MESSAGE) {
    return {
      ...state,
      error: payload.error,
      promptMessage: payload.message
    };
  }

  return state;
};