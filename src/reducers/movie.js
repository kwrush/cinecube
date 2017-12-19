import { Map, List, fromJS } from 'immutable';
import zipObject from 'lodash/zipObject';
import { movieActionTypes as actionTypes } from 'constants/actionTypes';

const entityItem = {
  updateAt: null,
  isFetching: false,
  result: {}
};

const initialState = fromJS({
  entities: {},
  discover: entityItem,
  popular: entityItem,
  upcoming: entityItem,
  inTheatre: entityItem,
  topRated: entityItem,
  info: entityItem,
  search: entityItem
}); 

const updateFetchStatus = (state, type, newStatus) => {
  const isFetching = typeof newStatus.isFetching === 'undefined' ? false : newStatus.isFetching;
  const updateAt = typeof newStatus.updateAt === 'undefined' ? null : newStatus.updateAt 
  return state.update(`${type}`, type => type.merge({
    isFetching: isFetching,
    updateAt: updateAt
  }));
};

const updateMovieData = (state, type, newData) => 
  state
    .mergeDeep({
      entities: fromJS(newData.entities),
      [`${type}`]: {
        result: zipObject(newData.result, newData.result.map(id => true))
      }
    });

const movie = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DISCOVER_MOVIE_REQUEST:
      return updateFetchStatus(state, 'discover', action.payload);
    case actionTypes.FETCH_POPULAR_MOVIE_REQUEST:
      return updateFetchStatus(state, 'popular', action.payload);
    case actionTypes.FETCH_TOP_RATED_MOVIE_REQUEST:
      return updateFetchStatus(state, 'topRated', action.payload);
    case actionTypes.FETCH_UPCOMING_MOVIE_REQUEST:
      return updateFetchStatus(state, 'upcoming', action.payload);
    case actionTypes.FETCH_IN_THEATRE_MOVIE_REQUEST:
      return updateFetchStatus(state, 'inTheatre', action.payload);
    case actionTypes.FETCH_MOVIE_INFO_REQUEST:
      return updateFetchStatus(state, 'info', action.payload);
    case actionTypes.DISCOVER_MOVIE_SUCCESS:
      return updateMovieData(
        updateFetchStatus(state, 'discover', action.payload), 
        'discover', action.payload.data
      );
    case actionTypes.FETCH_POPULAR_MOVIE_SUCCESS:
      return updateMovieData(
        updateFetchStatus(state, 'popular', action.payload), 
        'popular', action.payload.data
      );
    case actionTypes.FETCH_TOP_RATED_MOVIE_SUCCESS:
      return updateMovieData(
        updateFetchStatus(state, 'topRated', action.payload), 
        'topRated', action.payload.data
      );
    case actionTypes.FETCH_UPCOMING_MOVIE_SUCCESS:
      return updateMovieData(
        updateFetchStatus(state, 'upcoming', action.payload), 
        'upcoming', action.payload.data
      );
    case actionTypes.FETCH_IN_THEATRE_MOVIE_SUCCESS:
      return updateMovieData(
        updateFetchStatus(state, 'inTheatre', action.payload), 
        'inTheatre', action.payload.data
      );
    case actionTypes.FETCH_MOVIE_INFO_SUCCESS:
      return updateMovieData(
        updateFetchStatus(state, 'info', action.payload), 
        'info', {
          entities: action.payload.data.entities.movieInfo,
          result: action.payload.data.result
        });
    default:
      return state;
  }
};

export default movie;