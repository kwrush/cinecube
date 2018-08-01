import { peopleActionTypes as actionTypes } from '../constants/actionTypes';

const initialState = {};

const peopleReducers = (state = initialState, action) => {
  switch (action) {
    case actionTypes.FETCH_POPULAR_PEOPLE_REQUEST:
    case actionTypes.FETCH_PEOPLE_PROFILE_REQUEST:
    case actionTypes.SEARCH_PEOPLE_REQUEST:
    default:
      return state;
  }
};

export default peopleReducers;

