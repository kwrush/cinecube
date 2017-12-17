import { movieActionTypes as actionTypes } from 'constants/actionTypes';
import { loadMovies } from 'utils/api';

export const discoverMovieSuccess = (results) => ({
  type: actionTypes.DISCOVER_MOVIE_SUCCESS,
  payload: results
});

export const discoverMovie = async (dispatch) => {
  const { data } = await loadMovies('discover'); 
  dipatch(discoverMovieSuccess(data.results));
};