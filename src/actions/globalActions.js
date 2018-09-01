import { globalActionTypes } from "../constants/actionTypes";

export const promptError = (errorMessage) => ({
  type: globalActionTypes.PROMPT_ERROR,
  payload: {
    error: errorMessage
  }
});