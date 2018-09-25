import { searchActionTypes as actionTypes } from '../constants/actionTypes';
import { combineReducers } from 'redux';

const searchMediaByQuery = (mediaType, state = {}, action) => {
  const { type, payload } = action;
  const mType = mediaType.toUpperCase();
  switch (type) {
    case actionTypes[`SEARCH_${mType}_REQUEST`]:
    case actionTypes[`SEARCH_${mType}_FAILURE`]:
      return {
        ...state,
        ...{ 
          [`${payload.query}`]: { 
            [`${payload.page}`]: { isFetching: payload.fetching } 
          } 
        }
      };
    case actionTypes[`UPDATE_SEARCH_${mType}_RESULT`]:

      const { page, query, fetching, ...others } = payload;

      return {
        ...state,
        ...{
          [`${query}`]: { 
            [`${page}`]: { 
              page, 
              isFetching: fetching, 
              ...others 
            } 
          } 
        }
      }
    default:
      return state;
  }
};

const searchMovieByQuery = (state = {}, action) => searchMediaByQuery('movie', state, action);

const searchTvByQuery = (state = {}, action) => searchMediaByQuery('tv', state, action);

const searchPeopleByQuery = (state = {}, action) => searchMediaByQuery('people', state, action);

const suggestion = (state = {}, action) => {
  const { type, payload } = action;

  if (type === actionTypes.UPDATE_AUTO_SUGGESTION) {
    return {
      ...state,
      ...payload.suggestions
    };
  }

  return state;
};

const search = combineReducers({
  searchMovieByQuery,
  searchTvByQuery,
  searchPeopleByQuery,
  suggestion
});

export default search;

