import { fromJS } from 'immutable';
import { tvEntity } from 'constants/storeConstants';
import { 
  updateFetchStatus, 
  updateResultEntity, 
  updateInfoEntity 
} from 'utils/reducerHandlers';
import { tvActionTypes as actionTypes } from 'constants/actionTypes';

const initialState = fromJS(tvEntity); 


const tv = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DISCOVER_TV_REQUEST:
      return updateFetchStatus(state, 'discover', action.payload.isFetching);
    case actionTypes.FETCH_POPULAR_TV_REQUEST:
      return updateFetchStatus(state, 'popular', action.payload.isFetching);
    case actionTypes.FETCH_TOP_RATED_TV_REQUEST:
      return updateFetchStatus(state, 'topRated', action.payload.isFetching);
    case actionTypes.FETCH_ON_AIR_TV_REQUEST:
      return updateFetchStatus(state, 'onAir', action.payload.isFetching);
    case actionTypes.FETCH_TV_INFO_REQUEST:
      return updateFetchStatus(state, 'info', action.payload.isFetching);
    case actionTypes.DISCOVER_TV_SUCCESS:
      return updateResultEntity(
        updateFetchStatus(state, 'discover', action.payload.isFetching), 
        'discover', action.payload.data
      );
    case actionTypes.FETCH_POPULAR_TV_SUCCESS:
      return updateResultEntity(
        updateFetchStatus(state, 'popular', action.payload.isFetching), 
        'popular', action.payload.data
      );
    case actionTypes.FETCH_TOP_RATED_TV_SUCCESS:
      return updateResultEntity(
        updateFetchStatus(state, 'topRated', action.payload.isFetching), 
        'topRated', action.payload.data
      );
    case actionTypes.FETCH_ON_AIR_TV_SUCCESS:
      return updateResultEntity(
        updateFetchStatus(state, 'onAir', action.payload.isFetching), 
        'onAir', action.payload.data
      );
    case actionTypes.FETCH_TV_INFO_SUCCESS:
      return updateInfoEntity(
        updateFetchStatus(state, 'info', action.payload.isFetching), 
        action.payload.data);
    default:
      return state;
  }
};

export default tv;