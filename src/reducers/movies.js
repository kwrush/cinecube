import { movieActionTypes } from '../actions/actionTypes';

export default movies = (state = [], action) => {
  switch (action.type) {
    case FETCH_MOVIE:
      return state;
    default:
      return state;
  }
}