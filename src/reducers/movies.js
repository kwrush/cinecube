import { movieActionTypes } from '../constants/actionTypes';

const initialState = {
  discover: []
};

const movies = (state = initialState, action) => {
  switch (action.type) {
    case movieActionTypes.DISCOVER_MOVIE_SUCCESS:
      return {
        ...state,
        discover: action.payload
      };
    default:
      return state;
  }
};

export default movies;