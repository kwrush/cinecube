import { fromJS } from 'immutable';
import { movieEntity } from 'constants/storeConstants';
import { movieActionTypes as actionTypes } from 'constants/actionTypes';
import { 
  updateFetchStatus, 
  updateResultEntity
} from 'utils/reducerHandlers';

const initialState = fromJS(movieEntity); 

const updateMoiveInfoEntity = (state, newData) =>
  state
    .mergeDeep({
      entities: newData.entities.movie,
      info: {
        id: newData.result
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
      return updateResultEntity(
        updateFetchStatus(state, 'discover', action.payload), 
        'discover', action.payload
      );
    case actionTypes.FETCH_POPULAR_MOVIE_SUCCESS:
      return updateResultEntity(
        updateFetchStatus(state, 'popular', action.payload), 
        'popular', action.payload
      );
    case actionTypes.FETCH_TOP_RATED_MOVIE_SUCCESS:
      return updateResultEntity(
        updateFetchStatus(state, 'topRated', action.payload), 
        'topRated', action.payload
      );
    case actionTypes.FETCH_UPCOMING_MOVIE_SUCCESS:
      return updateResultEntity(
        updateFetchStatus(state, 'upcoming', action.payload), 
        'upcoming', action.payload
      );
    case actionTypes.FETCH_IN_THEATRE_MOVIE_SUCCESS:
      return updateResultEntity(
        updateFetchStatus(state, 'inTheatre', action.payload), 
        'inTheatre', action.payload
      );
    case actionTypes.FETCH_MOVIE_INFO_SUCCESS:
      return updateMoiveInfoEntity(
        updateFetchStatus(state, 'info', action.payload), 
        action.payload);
    default:
      return state;
  }
};

export default movie;