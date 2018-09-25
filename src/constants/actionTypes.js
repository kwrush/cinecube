import { generateActions } from '../utils/helpers';

const globalActions = [
  'PROMPT_ERROR'
];

const entitiesActions = [
  'MERGE_ENTITIES'
];

const mediaListActions = [
  'FETCH_MEDIA_LIST_REQUEST',
  'FETCH_MEDIA_LIST_SUCCESS',
  'FETCH_MEDIA_LIST_FAILURE'
];

const mediaInfoActions = [
  'FETCH_MEDIA_INFO_REQUEST',
  'FETCH_MEDIA_INFO_SUCCESS',
  'FETCH_MEDIA_INFO_FAILURE'
];

const searchActions = [
  'UPDATE_AUTO_SUGGESTION',
  'SEARCH_MULTI_REQUEST',
  'UPDATE_SEARCH_MULTI_RESULT',
  'SEARCH_MULTI_FAILURE',
  'SEARCH_MOVIE_REQUEST',
  'UPDATE_SEARCH_MOVIE_RESULT',
  'SEARCH_MOVIE_FAILURE',
  'SEARCH_TV_REQUEST',
  'UPDATE_SEARCH_TV_RESULT',
  'SEARCH_TV_FAILURE',
  'SEARCH_PEOPLE_REQUEST',
  'UPDATE_SEARCH_PEOPLE_RESULT',
  'SEARCH_PEOPLE_FAILURE'
];

export const globalActionTypes = generateActions(globalActions);
export const entitiesActionTypes = generateActions(entitiesActions);
export const mediaListActionTypes = generateActions(mediaListActions);
export const mediaInfoActionTypes = generateActions(mediaInfoActions);
export const searchActionTypes = generateActions(searchActions);