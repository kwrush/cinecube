import { searchActionTypes as actionTypes } from '../constants/actionTypes';

const initialState = {};

const searchReducers = (state = initialState, action) => {
  switch (action) {
    case actionTypes.GENERAL_SEARCH_REQUEST:
    default:
      return state;
  }
};

export default searchReducers;

