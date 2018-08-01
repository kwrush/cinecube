import { searchActionTypes as actionTypes } from '../constants/actionTypes';

export const generalSearchRequest = (query) => ({
  type: actionTypes.GENERAL_SEARCH_REQUEST,
  payload: query
});

export const generalSearchRequestSucccess = (results) => ({
  type: actionTypes.GENERAL_SEARCH_REQUEST_SUCCESS,
  payload: results
});