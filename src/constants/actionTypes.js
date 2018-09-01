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
  'SEARCH_REQUEST',
  'SEARCH_SUCCESS',
  'SEARCH_FAILURE'
];

export const globalActionTypes = generateActions(globalActions);
export const entitiesActionTypes = generateActions(entitiesActions);
export const mediaListActionTypes = generateActions(mediaListActions);
export const mediaInfoActionTypes = generateActions(mediaInfoActions);
export const searchActionTypes = generateActions(searchActions);