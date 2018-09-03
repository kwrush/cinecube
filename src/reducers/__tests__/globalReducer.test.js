import { globalActionTypes } from "../../constants/actionTypes";
import globalReducers from "../globalReducers";

describe('Tests of global reducers', () => {
  it('should set promptError to the state', () => {
    const action = {
      type: globalActionTypes.PROMPT_ERROR,
      payload: { promptError: 'global error' }
    };

    expect(globalReducers({}, action)).toEqual({
      promptError: 'global error'
    });
  });
});