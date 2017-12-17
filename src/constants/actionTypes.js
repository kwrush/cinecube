import { generateActions } from '../utils/helpers';

const commonActions = [
  'CHANGE_ROUTE',
  'SEARCH_MULTI_REQUEST',
  'SEARCH_MULTI_SUCCESS',
  'FETCH_FAIL'
];

const movieActions = [
  'DISCOVER_MOVIE_REQUEST',
  'DISCOVER_MOVIE_SUCCESS',
  'FETCH_POPULAR_MOVIE_REQUEST',
  'FETCH_POPULAR_MOVIE_SUCCESS',
  'FETCH_TOP_RATED_MOVIE_REQUEST',
  'FETCH_TOP_RATED_MOVIE_SUCCESS',
  'FETCH_IN_THEATRE_MOVIE_REQUEST',
  'FETCH_IN_THEATRE_MOVIE_SUCCESS',
  'FETCH_UPCOMING_MOVIE_REQUEST',
  'FETCH_UPCOMING_MOVIE_SUCCESS',
  'FETCH_MOVIE_INFO_REQUEST',
  'FETCH_MOVIE_INFO_SUCCESS',
  'SEARCH_MOVIE_REQUEST',
  'SEARCH_MOVIE_SUCCESS'
];

const tvActions = [
  'DISCOVER_TV_REQUEST',
  'DISCOVER_TV_SUCCESS',
  'FETCH_POPULAR_TV_REQUEST',
  'FETCH_POPULAR_TV_SUCCESS',
  'FETCH_TOP_RATED_TV_REQUEST',
  'FETCH_TOP_RATED_TV_SUCCESS',
  'FETCH_ON_AIR_TV_REQUEST',
  'FETCH_ON_AIR_TV_SUCCESS',
  'FETCH_TV_INFO_REQUEST',
  'FETCH_TV_INFO_SUCCESS',
  'SEARCH_TV_REQUEST',
  'SEARCH_TV_SUCCESS'
];

const peopleActions = [
  'SEARCH_PEOPLE_REQUEST',
  'SEARCH_PEOPLE_SUCCESS',
  'FETCH_PEOPLE_INFO_REQUEST',
  'FETCH_PEOPLE_INFO_SUCCESS'
];

export const glboalActionTypes = generateActions(globalActions);
export const movieActionTypes  = generateActions(movieActions);
export const tvActionTypes     = generateActions(tvActions);
export const peopleActionTYpes = generateActions(peopleActions);
