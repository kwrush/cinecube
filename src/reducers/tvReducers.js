import { tvActionTypes as actionTypes } from '../constants/actionTypes';

const initialState = {};

const tvReducers = (state = initialState, action) => {
  switch (action) {
    case actionTypes.FETCH_POPULAR_TV_REQUEST:
    case actionTypes.FETCH_TOP_RATED_TV_REQUST:
    case actionTypes.FETCH_ON_AIR_TV_REQUEST:
    case actionTypes.FETCH_TV_INFO_REQUEST:
    case actionTypes.SEARCH_TV_REQUEST:
    default:
      return state;
  }
};

export default tvReducers;

