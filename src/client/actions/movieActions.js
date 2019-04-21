import { movieActionTypes as t } from '../constants/actionTypes';
import {
  popularMovies,
  upcomingMovies,
  topRatedMovies,
  nowPlayingMovies,
  movieDetail
} from '../services/movieApi'; 
import {
  fetchListRequest,
  fetchListSuccess,
  fetchListFail,
  fetchInfoRequest,
  fetchInfoSuccess,
  fetchInfoFail,
  fetchMediaAction,
  shouldFetchMediaList,
  shouldFetchMediaInfo
} from '../utils/actionUtils';

export const fetchPopularMoviesRequest = fetchListRequest('popular', 'movie')(t);

export const fetchPopularMoviesSuccess = fetchListSuccess('popular', 'movie')(t);

export const fetchPopularMoviesFail = fetchListFail('popular', 'movie')(t);

export const fetchNowPlayingMoviesRequest = fetchListRequest('nowplaying', 'movie')(t);

export const fetchNowPlayingMoviesSuccess = fetchListSuccess('nowplaying', 'movie')(t);

export const fetchNowPlayingMoviesFail = fetchListFail('nowplaying', 'movie')(t);

export const fetchUpcomingMoviesRequest = fetchListRequest('upcoming', 'movie')(t);

export const fetchUpcomingMoviesSuccess = fetchListSuccess('upcoming', 'movie')(t);

export const fetchUpcomingMoviesFail = fetchListFail('upcoming', 'movie')(t);

export const fetchTopRatedMoviesRequest = fetchListRequest('toprated', 'movie')(t);

export const fetchTopRatedMoviesSuccess = fetchListSuccess('toprated', 'movie')(t);

export const fetchTopRatedMoviesFail = fetchListFail('toprated', 'movie')(t);

export const fetchMovieDetailRequest = fetchInfoRequest('movie')(t);

export const fetchMovieDetailSuccess = fetchInfoSuccess('movie')(t)

export const fetchMovieDetailFail = fetchInfoFail('movie')(t);

const shouldFetchMovieList = (state = {}, fetchType = '', nextPage) => {
  const ft = fetchType.toLowerCase();

  if (['popular', 'toprated', 'nowplaying', 'upcoming'].indexOf(ft) < 0)
    return false;

  return shouldFetchMediaList(state, ft, 'movie', nextPage);
};

/**
 * 
 * @param {object} params request parameters 
 */
export const fetchPopularMovies = (params = { page: 1 }) => (dispatch, getState) => {
  const { page } = params;
  return fetchMediaAction({
    shouldDispatchAction: shouldFetchMovieList(getState(), 'popular', page),
    requestAction: fetchPopularMoviesRequest,
    succesAction: fetchPopularMoviesSuccess,
    failAction: fetchPopularMoviesFail,
    apiRequest: popularMovies,
    params,
    dispatch
  });
};
  

export const fetchUpcomingMovies = (params = { page: 1 }) => (dispatch, getState) => {
  const { page } = params;
  return fetchMediaAction({
    shouldDispatchAction: shouldFetchMovieList(getState(), 'upcoming', page),
    requestAction: fetchUpcomingMoviesRequest,
    succesAction: fetchUpcomingMoviesSuccess,
    failAction: fetchUpcomingMoviesFail,
    apiRequest: upcomingMovies,
    params,
    dispatch
  });
};

export const fetchNowPlayingMovies = (params = { page: 1 }) => (dispatch, getState) => {
  const { page } = params;
  return fetchMediaAction({
    shouldDispatchAction: shouldFetchMovieList(getState(), 'nowplaying', page),
    requestAction: fetchNowPlayingMoviesRequest,
    succesAction: fetchNowPlayingMoviesSuccess,
    failAction: fetchNowPlayingMoviesFail,
    apiRequest: nowPlayingMovies,
    params,
    dispatch
  });
};

export const fetchTopRatedMovies = (params = { page: 1 }) => (dispatch, getState) => {
  const { page } = params;

  return fetchMediaAction({
    shouldDispatchAction: shouldFetchMovieList(getState(), 'toprated', page),
    requestAction: fetchTopRatedMoviesRequest,
    succesAction: fetchTopRatedMoviesSuccess,
    failAction: fetchTopRatedMoviesFail,
    apiRequest: topRatedMovies,
    params,
    dispatch
  });
};

const shouldFetchMovieInfo = (state, id) => shouldFetchMediaInfo(state, 'movie', id);

/**
 * 
 * @param {number} id movie id 
 * @param {object} params request paramerter
 */
export const fetchMovieDetail = (id, params) => (dispatch, getState) => 
  fetchMediaAction({
    shouldDispatchAction: shouldFetchMovieInfo(getState(), id),
    requestAction: fetchMovieDetailRequest,
    succesAction: fetchMovieDetailSuccess,
    failAction: fetchMovieDetailFail,
    apiRequest: movieDetail(id),
    params,
    dispatch
  });

