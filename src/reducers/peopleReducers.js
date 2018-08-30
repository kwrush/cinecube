import { peopleActionTypes as actionTypes } from '../constants/actionTypes';

const initialState = {
  popular: {},
  info: {}
};

const peopleReducers = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case actionTypes.FETCH_PEOPLE_LIST_REQUEST:
    case actionTypes.FETCH_PEOPLE_INFO_REQUEST:
    case actionTypes.FETCH_PEOPLE_LIST_FAILURE:
    case actionTypes.FETCH_PEOPLE_INFO_FAILURE:
    case actionTypes.FETCH_PEOPLE_LIST_SUCCESS:
    case actionTypes.FETCH_PEOPLE_INFO_SUCCESS:
      return { ...state, ...payload }
    default:
      return state;
  }
};

export default peopleReducers;

