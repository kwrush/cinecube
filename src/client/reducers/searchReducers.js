import { combineReducers } from 'redux';
import { searchActionTypes as t } from '../constants/actionTypes';
import { uniqueConcat } from '../utils/helpers';

const _handleSearchRequest = (state, payload) => ({
  ...state,
  query: payload.query
});

const _handleSearchResults = (state, payload) => {
  const { results, ...pageInfo } = payload.result;
  const prevResults = state && state.results ? state.results : [];
  const newResults = uniqueConcat(prevResults, results);
  return {
    ...state,
    ...pageInfo,
    results: newResults
  };
};

const forMulti = (state = {}, action) => {
  const { type, payload } = action;
  if (type === t.SEARCH_MULTI_REQUEST) {
    return _handleSearchRequest(state, payload);
  } else if (type === t.SEARCH_MULTI_SUCCESS) {
    return _handleSearchResults(state, payload);
  }

  return state;
};

const forMovie = (state = {}, action) => {
  const { type, payload } = action;
  if (type === t.SEARCH_MOVIE_REQUEST) {
    return _handleSearchRequest(state, payload);
  } else if (type === t.SEARCH_MOVIE_SUCCESS) {
    return _handleSearchResults(state, payload);
  }

  return state;
};

const forTv = (state = {}, action) => {
  const { type, payload } = action;
  if (type === t.SEARCH_TV_REQUEST) {
    return _handleSearchRequest(state, payload);
  } else if (type === t.SEARCH_TV_SUCCESS) {
    return _handleSearchResults(state, payload);
  }

  return state;
};

const forPeople = (state = {}, action) => {
  const { type, payload } = action;
  if (type === t.SEARCH_PEOPLE_REQUEST) {
    return _handleSearchRequest(state, payload);
  } else if (type === t.SEARCH_PEOPLE_SUCCESS) {
    return _handleSearchResults(state, payload);
  }

  return state;
};

export default combineReducers({
  forMulti,
  forMovie,
  forTv,
  forPeople
});

