import { movieActionTypes as t } from '../constants/actionTypes';
import { mergeEntities } from './entitiesActions';
import {
  popularMovies,
  movieDetail
} from '../services/movieApi'; 
import { camelCaseKey } from '../utils/helpers';

export const fetchPopularMoviesRequest = () => ({
  type: t.FETCH_POPULAR_MOVIES_REQUEST,
  payload: {}
});

export const fetchPopularMoviesSuccess = (result) => ({
  type: t.FETCH_POPULAR_MOVIES_SUCCESS,
  payload: result
});

export const fetchPopularMoviesFailure = (e) => ({
  type: t.FETCH_POPULAR_MOVIES_FAILURE,
  payload: {
    errorMessage: e.message || 'Error occured during the request of resource'
  }
});

export const fetchMovieDetailRequest = () => ({
  type: t.FETCH_MOVIE_DETAIL_REQUEST,
  payload: {}
});

export const fetchMovieDetailSuccess = (result) => ({
  type: t.FETCH_MOVIE_DETAIL_SUCCESS,
  payload: result
});

export const fetchMovieDetailFailure = (e) => ({
  type: t.FETCH_MOVIE_DETAIL_FAILURE,
  payload: {
    errorMessage: e.message || 'Error occured during the request of resource'
  }
});

/**
 * 
 * @param {object} params request parameters 
 */
export const fetchPopularMovies = (params) => async (dispatch) => {
  dispatch(fetchPopularMoviesRequest());

  // TODO: check if the api call is needed or data in the state can be used
  // TODO: check status to handle different response
  try {
    const response = await popularMovies({ ...params });
    const camelized = camelCaseKey(response.data);
    dispatch(mergeEntities(camelized.entities));
    dispatch(fetchPopularMoviesSuccess(camelized.result));
  } catch (e) {
    dispatch(fetchPopularMoviesFailure(e));
  }
};

/**
 * 
 * @param {number} id movie id 
 * @param {object} params request paramerter
 */
export const fetchMovieDetail = (id, params) => async (dispatch) => {
  dispatch(fetchMovieDetailRequest());

  try {
    const response = await movieDetail(id, { ...params });
    const camelized = camelCaseKey(response.data);
    dispatch(mergeEntities(camelized.entities));
    dispatch(fetchMovieDetailSuccess(camelized.result));
  } catch (e) {
    dispatch(fetchMovieDetailFailure(e));
  }
};
