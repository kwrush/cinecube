import { searchActionTypes as actionTypes } from '../constants/actionTypes';
import { combineReducers } from 'redux';

const searchMulti = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SEARCH_MULTI_REQUEST:
    case actionTypes.SEARCH_MULTI_FAILURE:
      return {
        ...state,
        ...{ 
          [`${payload.query}`]: { 
            [`${payload.page}`]: { isFetching: payload.fetching } 
          } 
        }
      };
    case actionTypes.UPDATE_SEARCH_MULTI_RESULT:

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

const searchMovieByQuery = (state = {}, action) => {

};

const searchTvByQuery = (state = {}, action) => {

};

const searchPeopleByQuery = (state = {}, action) => {

};

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
  searchMulti,
  searchMovieByQuery,
  searchTvByQuery,
  searchPeopleByQuery,
  suggestion
});

export default search;

