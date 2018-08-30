import { tvActionTypes as actionTypes } from '../constants/actionTypes';

const initialState = {
  popular: {},
  discover: {},
  onAir: {},
  topRated: {},
  info: {}
};

const tvReducers = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case actionTypes.FETCH_TV_LIST_REQUEST:
    case actionTypes.FETCH_TV_INFO_REQUEST:
    case actionTypes.FETCH_TV_LIST_FAILURE:
    case actionTypes.FETCH_TV_INFO_FAILURE:
    case actionTypes.FETCH_TV_LIST_SUCCESS:
    case actionTypes.FETCH_TV_INFO_SUCCESS:
      return { ...state, ...payload }
    default:
      return state;
  }
};

export default tvReducers;

