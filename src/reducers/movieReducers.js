import { movieActionTypes as actionTypes } from '../constants/actionTypes';

const initialState = {
  popular: {},
  dicover: {},
  topRated: {},
  upcoming: {},
  inTheatre: {},
  info: {}
};

const movieReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.FETCH_MOVIE_LIST_REQUEST:
    case actionTypes.FETCH_MOVIE_INFO_REQUEST:
    case actionTypes.FETCH_MOVIE_LIST_FAILURE:
    case actionTypes.FETCH_MOVIE_INFO_FAILURE:
    case actionTypes.FETCH_MOVIE_LIST_SUCCESS:
    case actionTypes.FETCH_MOVIE_INFO_SUCCESS:
      return { ...state, ...payload }
    default:
      return state;
  }
};

export default movieReducers;
