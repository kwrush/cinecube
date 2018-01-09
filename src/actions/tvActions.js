import { normalize } from 'normalizr';
import { tvActionTypes as actionTypes } from 'constants/actionTypes';
import { tvResultSchema, tvInfoSchema } from 'constants/schema';
import { loadTvShows, tvShowsInfo, searchTvShows } from 'utils/api';
import { getResult, getUpdateTime } from 'selectors/commonSelectors';
import { fetchRequest, fetchSuccess, fetchFailure } from './commonActions';
import { differenceInDays } from 'utils/helpers';

const performTvShowsFetch = (type, params, fetchSuccessAction) => async (dispatch) => {
  try {
    const { data } = await loadTvShows(type, params); 
    const normalized = normalize(data.results, tvResultSchema);
    const payload = {
      pageIndex: data.page,
      totalPages: data.totalPages,
      entities: { ...normalized.entities.tv },
      result: normalized.result
    };
    dispatch(fetchSuccess(payload, fetchSuccessAction));
  } catch (err) {
    dispatch(fetchFailure(err));
    // for debug
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
  }
};

const discoverTvShows = (params) => performTvShowsFetch('discover', params, actionTypes.DISCOVER_TV_SUCCESS, );

const fetchPopularTvShows = (params) => performTvShowsFetch('popular', params, actionTypes.FETCH_POPULAR_TV_SUCCESS);

const fetchOnAirTvShows = (params) => performTvShowsFetch('onAir', params, actionTypes.FETCH_ON_AIR_TV_SUCCESS);

const fetchTopRatedTvShows = (params) => performTvShowsFetch('topRated', params, actionTypes.FETCH_TOP_RATED_TV_SUCCESS);

const fetchTvShowsInfo = (id) => async (dispatch) => {
  try {
    const { data } = await tvShowsInfo(id);
    const normalized = normalize(data, tvInfoSchema);
    const payload = {
      entities: normalized.entities,
      result: normalized.result
    };
    dispatch(fetchSuccess(payload, actionTypes.FETCH_TV_INFO_SUCCESS));
  } catch (err) {
    dispatch(fetchFailure(err));
    // for debug
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
  }
};

const performTvShowsSearch = (query, params) => async (dispatch) => {
  try {
    const { data } = await searchTvShows(query, params);
    const normalized = normalize(data.results, tvResultSchema);
    const payload = {
      pageIndex: data.page,
      totalPages: data.totalPages,
      entities: { ...normalized.entities.tv },
      result: normalized.result
    };
    dispatch(fetchSuccess(payload, actionTypes.SEARCH_TV_SUCCESS));
  } catch (err) {
    dispatch(fetchFailure(err));
    // for debug
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
  }
};

const shouldFetchTvShows = (state, entityType) => {

  const result = getResult(state, 'tv', entityType);
  const updatedAt = getUpdateTime(state, 'tv', entityType);

  return !result || result.size === 0 || 
    updatedAt === null || differenceInDays(Date.now() - updatedAt) > 1;
};

export const fetchTvShowsIfNeeded = (requestType, params) => (dispatch, getState) => {
  
  let entityType = null;
  let action = null;
  
  switch (requestType) {
    case actionTypes.DISCOVER_TV_REQUEST:
      entityType = 'discover';
      action = discoverTvShows;
      break;
    case actionTypes.FETCH_POPULAR_TV_REQUEST:
      entityType = 'popular'
      action = fetchPopularTvShows;
      break;
    case actionTypes.FETCH_TOP_RATED_TV_REQUEST:
      entityType = 'topRated';
      action = fetchTopRatedTvShows;
      break;
    case actionTypes.FETCH_ON_AIR_TV_REQUEST:
      entityType = 'onAir';
      action = fetchOnAirTvShows;
      break;
    case actionTypes.FETCH_TV_INFO_REQUEST:
      entityType = 'info';
      action = fetchTvShowsInfo;
      break;
    default:
      break;
  }

  if (action && shouldFetchTvShows(getState(), entityType)) {
    dispatch(fetchRequest(requestType));
    dispatch(action(params));
  }
};

export const tvShowsSearch = (params) => (dispatch) => {
  const { query, ...options } = params;
  dispatch(fetchRequest(actionTypes.SEARCH_TV_REQUEST));
  dispatch(performTvShowsSearch(query, options));
};


