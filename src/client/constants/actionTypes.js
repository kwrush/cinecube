import { generateActions } from '../utils/helpers';

const promptActions = [
  'PROMPT_MESSAGE'
];

const movieActions = [
  'FETCH_POPULAR_MOVIES_REQUEST',
  'FETCH_POPULAR_MOVIES_SUCCESS',
  'FETCH_POPULAR_MOVIES_FAILURE',
  'FETCH_MOVIE_DETAIL_REQUEST',
  'FETCH_MOVIE_DETAIL_SUCCESS',
  'FETCH_MOVIE_DETAIL_FAILURE'
];

const tvActions = [
  'FETCH_POPULAR_TVS_REQUEST',
  'FETCH_POPULAR_TVS_SUCCESS',
  'FETCH_POPULAR_TVS_FAILURE',
  'FETCH_TV_DETAIL_REQUEST',
  'FETCH_TV_DETAIL_SUCCESS',
  'FETCH_TV_DETAIL_FAILURE'
];

const peopleActions = [
  'FETCH_POPULAR_PEOPLE_REQUEST',
  'FETCH_POPULAR_PEOPLE_SUCCESS',
  'FETCH_POPULAR_PEOPLE_FAILURE',
  'FETCH_PEOPLE_DETAIL_REQUEST',
  'FETCH_PEOPLE_DETAIL_SUCCESS',
  'FETCH_PEOPLE_DETAIL_FAILURE'
];

const searchActions = [
  'SEARCH_MULTI_REQUEST',
  'SEARCH_MULTI_SUCCESS',
  'SEARCH_MULTI_FAILURE',
  'SEARCH_MOVIE_REQUEST',
  'SEARCH_MOVIE_SUCCESS',
  'SEARCH_MOVIE_FAILURE',
  'SEARCH_TV_REQUEST',
  'SEARCH_TV_SUCCESS',
  'SEARCH_TV_FAILURE',
  'SEARCH_PEOPLE_REQUEST',
  'SEARCH_PEOPLE_SUCCESS',
  'SEARCH_PEOPLE_FAILURE',
];

const entitiesActions = [
  'MERGE_ENTITIES'
];

export const promptActionTypes = generateActions(promptActions);
export const movieActionTypes = generateActions(movieActions);
export const tvActionTypes = generateActions(tvActions);
export const peopleActionTypes = generateActions(peopleActions);
export const searchActionTypes = generateActions(searchActions);
export const entitiesActionTypes = generateActions(entitiesActions);