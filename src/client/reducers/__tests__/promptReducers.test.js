import prompt from '../promptReducer';
import { promptActionTypes as t } from '../../constants/actionTypes';

describe('Prompt reducer tests', () => {
  it('should return the inital state', () => {
    expect(prompt(undefined, {})).toEqual({});
  });

  it('should handle prompt action correctly', () => {
    const expected = {
      error: false,
      promptMessage: 'Something happens'
    };

    const action = {
      type: t.PROMPT_MESSAGE,
      payload: {
        error: false,
        message: 'Something happens'
      }
    };

    expect(prompt({}, action)).toEqual(expected);
  });
});