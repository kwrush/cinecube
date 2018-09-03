import { promptError } from "../globalActions";
import { globalActionTypes } from "../../constants/actionTypes";

describe('Tests of global actions', () => {
  it('should create action of prompt error', () => {
    expect(promptError('Prompt Error')).toEqual({
      type: globalActionTypes.PROMPT_ERROR,
      payload: { error: 'Prompt Error' }
    });
  });
});