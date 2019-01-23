import { combineReducers } from 'redux';
import {
  movieActionTypes as mt,
  tvActionTypes as tt,
  peopleActionTypes as pt
} from '../constants/actionTypes';

const _handleMediaResults = (state, payload) => ({
  ...state,
  id: payload.result.id
});

const movie = (state = {}, action) => {
  const { type, payload } = action;

  return type === mt.FETCH_MOVIE_DETAIL_SUCCESS
    ? _handleMediaResults(state, payload)
    : state;
};

const tv = (state = {}, action) => {
  const { type, payload } = action;

  return type === tt.FETCH_TV_DETAIL_SUCCESS
    ? _handleMediaResults(state, payload)
    : state;
};

const people = (state = {}, action) => {
  const { type, payload } = action;

  return type === pt.FETCH_PEOPLE_DETAIL_SUCCESS
    ? _handleMediaResults(state, payload)
    : state;
};

export default combineReducers({
  movie,
  tv,
  people
});