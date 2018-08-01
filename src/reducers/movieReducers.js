import { movieActionTypes as actionTypes } from '../constants/actionTypes';

const initialState = {};

const movieReducers = (state = initialState, action) => {
  switch (action) {
    case actionTypes.FETCH_POPULAR_MOVIE_REQUEST:
    case actionTypes.FETCH_TOP_RATED_MOVIE_REQUST:
    case actionTypes.FETCH_UPCOMING_MOVIE_REQUEST:
    case actionTypes.FETCH_IN_THEATRE_MOVIE_REQUEST:
    case actionTypes.SEARCH_MOVIE_REQUEST:
    default:
      return state;
  }
};

export default movieReducers;

