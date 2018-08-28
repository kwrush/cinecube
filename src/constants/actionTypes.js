import { generateActions } from '../utils/helpers';

const commonActions = [
  'PROMPT_ERROR'
];

const searchActions = [
  'SEARCH_REQUEST',
  'SEARCH_SUCCESS',
  'SEARCH_FAILURE'
];

const entitiesActions = [
  'MERGE_ENTITIES'
];

const movieActions = [
  'FETCH_MOVIE_LIST_REQUEST',
  'FETCH_MOVIE_LIST_SUCCESS',
  'FETCH_MOVIE_LIST_FAILURE',
  'FETCH_MOVIE_INFO_REQUEST',
  'FETCH_MOVIE_INFO_SUCCESS',
  'FETCH_MOVIE_INFO_FAILURE'
];

const tvActions = [
  'FETCH_TV_LIST_REQUEST',
  'FETCH_TV_LIST_SUCCESS',
  'FETCH_TV_LIST_FAILURE',
  'FETCH_TV_INFO_REQUEST',
  'FETCH_TV_INFO_SUCCESS',
  'FETCH_TV_INFO_FAILURE'
];

const peopleActions = [
  'FETCH_PEOPLE_LIST_REQUEST',
  'FETCH_PEOPLE_LIST_SUCCESS',
  'FETCH_PEOPLE_LIST_FAILURE',
  'FETCH_PEOPLE_INFO_REQUEST',
  'FETCH_PEOPLE_INFO_SUCCESS',
  'FETCH_PEOPLE_INFO_FAILURE'
];

export const commonActionTypes = generateActions(commonActions);
export const entitiesActionTypes = generateActions(entitiesActions);
export const searchActionTypes = generateActions(searchActions);
export const movieActionTypes = generateActions(movieActions);
export const tvActionTypes = generateActions(tvActions);
export const peopleActionTypes = generateActions(peopleActions);