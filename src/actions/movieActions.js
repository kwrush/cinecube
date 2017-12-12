import { movieActionTypes } from '../constants/actionTypes';
import { loadMovies } from 'utils/api';

export const discoverMovieSuccess = (results) => {
  return {
    type: movieActionTypes.DISCOVER_MOVIE_SUCCESS,
    payload: results
  };
};

export const discoverMovie = () => {
  return (dispatch) => {
    loadMovies('discover')
      .then(res => {
        const { data } = res;
        dispatch(discoverMovieSuccess(data.results.slice(0, 4)));
      })
      .catch(err => console.log(err));
  }
};