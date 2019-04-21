import { tvActionTypes as t } from '../constants/actionTypes';
import {
  popularTvs,
  topRatedTvs,
  onAirTvs,
  tvDetail
} from '../services/tvApi'; 
import {
  fetchListRequest,
  fetchListSuccess,
  fetchListFail,
  fetchInfoRequest,
  fetchInfoSuccess,
  fetchInfoFail,
  fetchMediaAction,
  shouldFetchMediaList,
  shouldFetchMediaInfo
} from '../utils/actionUtils';

export const fetchPopularTvsRequest = fetchListRequest('popular', 'tv')(t);

export const fetchPopularTvsSuccess = fetchListSuccess('popular', 'tv')(t);

export const fetchPopularTvsFail = fetchListFail('popular', 'tv')(t);

export const fetchOnAirTvsRequest = fetchListRequest('onair', 'tv')(t);

export const fetchOnAirTvsSuccess = fetchListSuccess('onair', 'tv')(t);

export const fetchOnAirTvsFail = fetchListFail('onair', 'tv')(t);

export const fetchTopRatedTvsRequest = fetchListRequest('toprated', 'tv')(t);

export const fetchTopRatedTvsSuccess = fetchListSuccess('toprated', 'tv')(t);

export const fetchTopRatedTvsFail = fetchListFail('toprated', 'tv')(t);

export const fetchTvDetailRequest = fetchInfoRequest('tv')(t);

export const fetchTvDetailSuccess = fetchInfoSuccess('tv')(t)

export const fetchTvDetailFail = fetchInfoFail('tv')(t);

const shouldFetchTvList = (state = {}, fetchType = '', nextPage) => {
  const ft = fetchType.toLowerCase();

  if (['popular', 'toprated', 'onair'].indexOf(ft) < 0)
    return false;

  return shouldFetchMediaList(state, ft, 'tv', nextPage);
};

/**
* 
* @param {object} params request parameters 
*/
export const fetchPopularTvs = (params = { page: 1 }) => (dispatch, getState) => {
  const { page } = params;
  return fetchMediaAction({
    shouldDispatchAction: shouldFetchTvList(getState(), 'popular', page),
    requestAction: fetchPopularTvsRequest,
    succesAction: fetchPopularTvsSuccess,
    failAction: fetchPopularTvsFail,
    apiRequest: popularTvs,
    params,
    dispatch
  });
};

export const fetchTopRatedTvs = (params = { page: 1 }) => (dispatch, getState) => {
  const { page } = params;
  return fetchMediaAction({
    shouldDispatchAction: shouldFetchTvList(getState(), 'toprated', page),
    requestAction: fetchTopRatedTvsRequest,
    succesAction: fetchTopRatedTvsSuccess,
    failAction: fetchTopRatedTvsFail,
    apiRequest: topRatedTvs,
    params,
    dispatch
  });
};

export const fetchOnAirTvs = (params = { page: 1 }) => (dispatch, getState) => {
  const { page } = params;
  return fetchMediaAction({
    shouldDispatchAction: shouldFetchTvList(getState(), 'onair', page),
    requestAction: fetchOnAirTvsRequest,
    succesAction: fetchOnAirTvsSuccess,
    failAction: fetchOnAirTvsFail,
    apiRequest: onAirTvs,
    params,
    dispatch
  });
};

const shouldFetchTvInfo = (state, id) => shouldFetchMediaInfo(state, 'tv', id);

/**
* 
* @param {number} id tv id 
* @param {object} params request paramerter
*/
export const fetchTvDetail = (id, params) => (dispatch, getState) => 
 fetchMediaAction({
   shouldDispatchAction: shouldFetchTvInfo(getState(), id),
   requestAction: fetchTvDetailRequest,
   succesAction: fetchTvDetailSuccess,
   failAction: fetchTvDetailFail,
   apiRequest: tvDetail(id),
   params,
   dispatch
 });
