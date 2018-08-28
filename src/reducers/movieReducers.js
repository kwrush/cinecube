import { combineReducers } from 'redux';
import { snakeCase } from 'lodash'
import { movieActionTypes as actionTypes } from '../constants/actionTypes';
import { ListResult, InfoResult, MovieEntity } from '../constants/stateModels';

// Helper reducer handles common operations

const entityReducer = (state = { entities: {} }, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_MOVIE_ENTITIES:
      return {
        ...state,
        entities: { ...action.payload.entities }
      };
    default:
      return state;
  }
};

const listReducer = (listType) => {
  const initialState = {};
  initialState[`${listType}`] = ListResult;

  const prefix = listType === 'search' ? 'SEARCH_MOVIE' : `FETCH_${snakeCase(listType).toUpperCase()}_MOVIE`;

  return (state = initialState, action) => {

    const newState = { ...state };

    switch (action.type) {
      case actionTypes[`${prefix}_REQUEST`]:
        newState[`${listType}`] = { isFetching: true, error: null };
        return newState;

      case actionTypes[`${prefix}_SUCCESS`]:
        newState[`${listType}`] = {
          isFetching: false,
          ...action.payload.result
        };

        return newState;

      case actionTypes[`${prefix}_FAILURE`]:
        newState[`${listType}`] = { 
          isFetching: false,
          error: action.payload.error
        };

        return newState;

      default:
        return state;
    }
  };
};

const popularMovies = listReducer('popular');

const upcomingMovies = listReducer('upcoming');

const inTheatreMovies = listReducer('inTheatre');

const topRatedMovie = listReducer('topRated');

const searchMovies = listReducer('search');

const movieInfo = (state = {
  info: InfoResult
}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIE_INFO_REQUEST:
      return {
        ...state,
        info: { isFetching: true }
      };

    case actionTypes.FETCH_MOVIE_INFO_SUCCESS:
      return {
        ...state,
        info: { 
          isFetching: false,
          ...action.payload.result
        }
      };

    case actionTypes.FETCH_MOVIE_INFO_FAILURE:
      return {
        ...state,
        info: {
          error: action.payload.error
        }
      };
    default: 
      return state;
  }
};


const movieReducer = combineReducers({
  entities: entityReducer,
  search: searchMovies,
  popular: popularMovies,
  upcoming: upcomingMovies,
  inTheatre: inTheatreMovies,
  topRated: topRatedMovie,
  info: movieInfo
});

export default movieReducer;

