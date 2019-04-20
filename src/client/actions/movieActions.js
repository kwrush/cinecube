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
  fetchMediaAction
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

//TODO: implement this
const shouldFetchMovie = state => true;

/**
 * 
 * @param {object} params request parameters 
 */
export const fetchPopularMovies = params => (dispatch, getState) => 
  fetchMediaAction({
    shouldDispatchAction: shouldFetchMovie(getState()),
    requestAction: fetchPopularMoviesRequest,
    succesAction: fetchPopularMoviesSuccess,
    failAction: fetchPopularMoviesFail,
    apiRequest: popularMovies,
    params,
    dispatch
  });

export const fetchUpcomingMovies = params => (dispatch, getState) =>
  fetchMediaAction({
    shouldDispatchAction: shouldFetchMovie(getState()),
    requestAction: fetchUpcomingMoviesRequest,
    succesAction: fetchUpcomingMoviesSuccess,
    failAction: fetchUpcomingMoviesFail,
    apiRequest: upcomingMovies,
    params,
    dispatch
  });

export const fetchNowPlayingMovies = params => (dispatch, getState) =>
  fetchMediaAction({
    shouldDispatchAction: shouldFetchMovie(getState()),
    requestAction: fetchNowPlayingMoviesRequest,
    succesAction: fetchNowPlayingMoviesSuccess,
    failAction: fetchNowPlayingMoviesFail,
    apiRequest: nowPlayingMovies,
    params,
    dispatch
  });

export const fetchTopRatedMovies = params => (dispatch, getState) =>
  fetchMediaAction({
    shouldDispatchAction: shouldFetchMovie(getState()),
    requestAction: fetchTopRatedMoviesRequest,
    succesAction: fetchTopRatedMoviesSuccess,
    failAction: fetchTopRatedMoviesFail,
    apiRequest: topRatedMovies,
    params,
    dispatch
  });

/**
 * 
 * @param {number} id movie id 
 * @param {object} params request paramerter
 */
export const fetchMovieDetail = (id, params) => (dispatch, getState) => 
  fetchMediaAction({
    shouldDispatchAction: shouldFetchMovie(getState()),
    requestAction: fetchMovieDetailRequest,
    succesAction: fetchMovieDetailSuccess,
    failAction: fetchMovieDetailFail,
    apiRequest: movieDetail(id),
    params,
    dispatch
  });

