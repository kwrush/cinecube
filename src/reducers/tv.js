import { fromJS } from 'immutable';
import { tvEntity } from 'constants/storeConstants';
import { 
  updateFetchStatus, 
  updateResultEntity
} from 'utils/reducerHandlers';
import { tvActionTypes as actionTypes } from 'constants/actionTypes';

const initialState = fromJS(tvEntity); 

const updateTvInfoEntity = (state, newData) =>
  state
    .mergeDeep({
      entities: newData.entities.tv,
      info: {
        id: newData.result
      }
    });

const tv = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DISCOVER_TV_REQUEST:
      return updateFetchStatus(state, 'discover', action.payload);
    case actionTypes.FETCH_POPULAR_TV_REQUEST:
      return updateFetchStatus(state, 'popular', action.payload);
    case actionTypes.FETCH_TOP_RATED_TV_REQUEST:
      return updateFetchStatus(state, 'topRated', action.payload);
    case actionTypes.FETCH_ON_AIR_TV_REQUEST:
      return updateFetchStatus(state, 'onAir', action.payload);
    case actionTypes.FETCH_TV_INFO_REQUEST:
      return updateFetchStatus(state, 'info', action.payload);
    case actionTypes.DISCOVER_TV_SUCCESS:
      return updateResultEntity(
        updateFetchStatus(state, 'discover', action.payload), 
        'discover', action.payload
      );
    case actionTypes.FETCH_POPULAR_TV_SUCCESS:
      return updateResultEntity(
        updateFetchStatus(state, 'popular', action.payload), 
        'popular', action.payload
      );
    case actionTypes.FETCH_TOP_RATED_TV_SUCCESS:
      return updateResultEntity(
        updateFetchStatus(state, 'topRated', action.payload), 
        'topRated', action.payload
      );
    case actionTypes.FETCH_ON_AIR_TV_SUCCESS:
      return updateResultEntity(
        updateFetchStatus(state, 'onAir', action.payload), 
        'onAir', action.payload
      );
    case actionTypes.FETCH_TV_INFO_SUCCESS:
      return updateTvInfoEntity(
        updateFetchStatus(state, 'info', action.payload), 
        action.payload);
    default:
      return state;
  }
};

export default tv;