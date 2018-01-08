import { normalize } from 'normalizr';
import { movieActionTypes as actionTypes } from 'constants/actionTypes';
import { movieResultSchema, movieInfoSchema } from 'constants/schema';
import { loadMovies, movieInfo, searchMovies } from 'utils/api';
import { fetchRequest, fetchSuccess, fetchFailure } from './commonActions';
import { differenceInDays } from 'utils/helpers';

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

const fetchMovies = (requestType, params) => (dispatch) => {
  let action = null;
  
  switch (requestType) {
    case actionTypes.DISCOVER_MOVIE_REQUEST:
      action = discoverMovie;
      break;
    case actionTypes.FETCH_POPULAR_MOVIE_REQUEST:
      action = fetchPopularMovie;
      break;
    case actionTypes.FETCH_UPCOMING_MOVIE_REQUEST:
      action = fetchUpcomingMovie;
      break;
    case actionTypes.FETCH_IN_THEATRE_MOVIE_REQUEST:
      action = fetchInTheatreMovie;
      break;
    case actionTypes.FETCH_TOP_RATED_MOVIE_REQUEST:
      action = fetchTopRatedMovie;
      break;
    case actionTypes.FETCH_MOVIE_INFO_REQUEST:
      action = fetchMovieInfo;
      break;
    default:
      break;
  }
  
  if (action) {
    dispatch(fetchRequest(requestType));
    dispatch(action(params));
  }
}

const shouldFetchMovie = (state, entityType) => {

  if (state.getIn(['movie', entityType])) {
    const result = state.getIn(['movie', entityType, 'result']);
    const updatedAt = state.getIn(['movie', entityType, 'updatedAt']);
    return !result || result.size === 0 || 
           updatedAt === null || differenceInDays(Date.now() - updatedAt) > 1;
  }

  return false;
};

export const fetchMoviesIfNeeded = (requestType, params) => (dispatch, getState) => {
  let entityType = null;
  switch (requestType) {
    case actionTypes.DISCOVER_MOVIE_REQUEST:
      entityType = 'discover';
      break;
    case actionTypes.FETCH_POPULAR_MOVIE_REQUEST:
      entityType = 'popular';
      break;
    case actionTypes.FETCH_UPCOMING_MOVIE_REQUEST:
      entityType = 'upcoming';
      break;
    case actionTypes.FETCH_IN_THEATRE_MOVIE_REQUEST:
      entityType = 'inTheatre'
      break;
    case actionTypes.FETCH_TOP_RATED_MOVIE_REQUEST:
      entityType = 'topRated';
      break;
    case actionTypes.FETCH_MOVIE_INFO_REQUEST:
      entityType = 'info';
      break;
    default:
      break;
  }
  
  if (shouldFetchMovie(getState(), entityType)) {
    dispatch(fetchMovies(requestType, params));
  }
};

export const movieSearch = (params) => (dispatch) => {
  const { query, ...options } = params;
  dispatch(fetchRequest(actionTypes.SEARCH_MOVIE_REQUEST));
  dispatch(performMovieSearch(query, options));
}; 
