import { combineReducers } from 'redux';
import {
  movieActionTypes as mt,
  tvActionTypes as tt,
  peopleActionTypes as pt
} from '../constants/actionTypes';
import { uniqueConcat } from '../utils/helpers';

const _handleMediaResults = (state, payload) => {
  const { results, ...pageInfo } = payload.result;
  const prevResults = state && state.results ? state.results : [];
  const newResults = uniqueConcat(prevResults, results);
  return {
    ...state,
    ...pageInfo,
    results: newResults
  };
};

const movie = (state = {}, action) => {
  const { type, payload } = action;

  return type === mt.FETCH_POPULAR_MOVIES_SUCCESS
    ? _handleMediaResults(state, payload)
    : state;
};

const tv = (state = {}, action) => {
  const { type, payload } = action;

  return type === tt.FETCH_POPULAR_TVS_SUCCESS
    ? _handleMediaResults(state, payload)
    : state;
};

const people = (state = {}, action) => {
  const { type, payload } = action;

  return type === pt.FETCH_POPULAR_PEOPLE_SUCCESS
    ? _handleMediaResults(state, payload)
    : state;
};

export default combineReducers({
  movie, 
  tv,
  people
});

