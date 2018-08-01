import { generateActions } from '../utils/helpers';

const commonActions = [
  'FETCH_REQUEST',
  'FETCH_REQUEST_SUCCESS',
  'FETCH_REQUEST_FAIL'
];

const searchActions = [
  'GENERAL_SEARCH_REQUEST',
  'GENERAL_SEARCH_REQUEST_SUCCESS'
];

const movieActions = [
  'SEARCH_MOVIE_REQUEST',
  'SEARCH_MOVIE_REQUEST_SUCCESS',
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
];

const tvActions = [
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
  'FETCH_POPULAR_PEOPLE_REQUEST',
  'FETCH_POPULAR_PEOPLE_SUCCESS',
  'FETCH_PEOPLE_PROFILE_REQUEST',
  'FETCH_PEOPLE_PROFILE_SUCCESS'
];

export const commonActionTypes = generateActions(commonActions);
export const searchActionTypes = generateActions(searchActions);
export const movieActionTypes = generateActions(movieActions);
export const tvActionTypes = generateActions(tvActions);
export const peopleActionTypes = generateActions(peopleActions);