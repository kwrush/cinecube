import { Map, List, fromJS } from 'immutable';
import { tvActionTypes as actionTypes } from 'constants/actionTypes';

const entityItem = {
  updateAt: null,
  isFetching: false,
  result: {}
};

const initialState = fromJS({
  entities: {},
  discover: entityItem,
  popular: entityItem,
  onAir: entityItem,
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

const updateTvData = (state, type, newData) => 
  state
    .mergeDeep({
      entities: fromJS(newData.entities),
      [`${type}`]: {
        result: zipObject(newData.result, newData.result.map(id => true))
      }
    });

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
      return updateTvData(
        updateFetchStatus(state, 'discover', action.payload.isFetching), 
        'discover', action.payload.data
      );
    case actionTypes.FETCH_POPULAR_TV_SUCCESS:
      return updateTvData(
        updateFetchStatus(state, 'popular', action.payload.isFetching), 
        'popular', action.payload.data
      );
    case actionTypes.FETCH_TOP_RATED_TV_SUCCESS:
      return updateTvData(
        updateFetchStatus(state, 'topRated', action.payload.isFetching), 
        'topRated', action.payload.data
      );
    case actionTypes.FETCH_ON_AIR_TV_SUCCESS:
      return updateTvData(
        updateFetchStatus(state, 'onAir', action.payload.isFetching), 
        'onAir', action.payload.data
      );
    case actionTypes.FETCH_TV_INFO_SUCCESS:
      return updateTvData(
        updateFetchStatus(state, 'info', action.payload.isFetching), 
        'info', {
          entities: action.payload.data.entities.tvInfo,
          result: action.payload.data.result
        });
    default:
      return state;
  }
};

export default tv;