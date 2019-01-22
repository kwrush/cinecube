import { promptActionTypes as t } from "../constants/actionTypes";

export const promptMessage = (data) => ({
  type: t.PROMPT_MESSAGE,
  payload: { 
    error: data.error,
    message: data.message
  }
});