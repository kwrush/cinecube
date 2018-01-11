import { normalize } from 'normalizr';
import { movieActionTypes as actionTypes } from 'constants/actionTypes';
import { movieResultSchema, movieInfoSchema } from 'constants/schema';
import { loadMovies, movieInfo, searchMovies } from 'utils/api';
import { getEntityResult, getEntityUpdateTime, getCurrentPage } from 'selectors/commonSelectors';
import { fetchRequest, fetchSuccess, fetchFailure } from './commonActions';
import { differenceInDays } from 'utils/helpers';

/**
 * Dispatch action for fetching the specific types of movies
 * @param {String} type type of movies to be fetched
 * @param {Object} params parameters for performing async api call
 * @param {String} fetchSuccessAction action to be dispatched after a successful fetch request
 */
const performMovieFetch = (type, params, fetchSuccessAction) => async (dispatch) => {
  try {
    const { data } = await loadMovies(type, params); 
    const normalized = normalize(data.results, movieResultSchema);
    const payload = {
      pageIndex: data.page,
      totalPages: data.totalPages,
      entities: { ...normalized.entities.movie },
      result: normalized.result
    };
    dispatch(fetchSuccess(payload, fetchSuccessAction));
  } catch (err) {
    dispatch(fetchFailure(err));
    // for debug
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
  }
};

const discoverMovie = (params) => performMovieFetch('discover', params, actionTypes.DISCOVER_MOVIE_SUCCESS, );

const fetchPopularMovie = (params) => performMovieFetch('popular', params, actionTypes.FETCH_POPULAR_MOVIE_SUCCESS);

const fetchInTheatreMovie = (params) => performMovieFetch('inTheatre', params, actionTypes.FETCH_IN_THEATRE_MOVIE_SUCCESS);

const fetchTopRatedMovie = (params) => performMovieFetch('topRated', params, actionTypes.FETCH_TOP_RATED_MOVIE_SUCCESS);

const fetchUpcomingMovie = (params) => performMovieFetch('upcoming', params, actionTypes.FETCH_UPCOMING_MOVIE_SUCCESS);

const fetchMovieInfo = (id) => async (dispatch) => {
  try {
    const { data } = await movieInfo(id);
    const normalized = normalize(data, movieInfoSchema);
    const payload = {
      entities: normalized.entities,
      result: normalized.result
    };
    dispatch(fetchSuccess(payload, actionTypes.FETCH_MOVIE_INFO_SUCCESS));
  } catch (err) {
    dispatch(fetchFailure(err));
    // for debug
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
  }
};

/**
 * Dispatch searching action for the given query
 * @param {String} query search query 
 * @param {Object} params parameters for searching 
 */
const performMovieSearch = (query, params) => async (dispatch) => {
  try {
    const { data } = await searchMovies(query, params);
    const normalized = normalize(data.results, movieResultSchema);
    const payload = {
      pageIndex: data.page,
      totalPages: data.totalPages,
      entities: { ...normalized.entities.movie },
      result: normalized.result
    };
    dispatch(fetchSuccess(payload, actionTypes.SEARCH_MOVIE_SUCCESS));
  } catch (err) {
    dispatch(fetchFailure(err));
    // for debug
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
  }
};

const shouldFetchMovie = (state, entityType, params = {}) => {
  
  const result = getEntityResult(state, 'movie', entityType);
  const updatedAt = getEntityUpdateTime(state, 'movie', entityType);
  const currentPage = getCurrentPage(state, 'movie', entityType);
  const page = params.page ? params.page : 1;

  return currentPage !== page || !result || result.size === 0 || 
    updatedAt === null || differenceInDays(Date.now() - updatedAt) > 1;
};

export const fetchMoviesIfNeeded = (requestType, params) => (dispatch, getState) => {
  
  let entityType = null;
  let action = null;

  switch (requestType) {
    case actionTypes.DISCOVER_MOVIE_REQUEST:
      entityType = 'discover';
      action = discoverMovie;
      break;
    case actionTypes.FETCH_POPULAR_MOVIE_REQUEST:
      entityType = 'popular';
      action = fetchPopularMovie;
      break;
    case actionTypes.FETCH_UPCOMING_MOVIE_REQUEST:
      entityType = 'upcoming';
      action = fetchUpcomingMovie;
      break;
    case actionTypes.FETCH_IN_THEATRE_MOVIE_REQUEST:
      entityType = 'inTheatre';
      action = fetchInTheatreMovie;
      break;
    case actionTypes.FETCH_TOP_RATED_MOVIE_REQUEST:
      entityType = 'topRated';
      action = fetchTopRatedMovie;
      break;
    case actionTypes.FETCH_MOVIE_INFO_REQUEST:
      entityType = 'info';
      action = fetchMovieInfo;
      break;
    default:
      break;
  }
  
  if (action && shouldFetchMovie(getState(), entityType, params)) {
    dispatch(fetchRequest(requestType));
    dispatch(action(params));
  }
};

export const movieSearch = (params) => (dispatch) => {
  const { query, ...options } = params;
  dispatch(fetchRequest(actionTypes.SEARCH_MOVIE_REQUEST));
  dispatch(performMovieSearch(query, options));
}; 

