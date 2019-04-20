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
  fetchMediaAction
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

const shouldFetchTv = state => true;

/**
* 
* @param {object} params request parameters 
*/
export const fetchPopularTvs = params => (dispatch, getState) => 
 fetchMediaAction({
   shouldDispatchAction: shouldFetchTv(getState()),
   requestAction: fetchPopularTvsRequest,
   succesAction: fetchPopularTvsSuccess,
   failAction: fetchPopularTvsFail,
   apiRequest: popularTvs,
   params,
   dispatch
 });

export const fetchTopRatedTvs = params => (dispatch, getState) =>
  fetchMediaAction({
    shouldDispatchAction: shouldFetchTv(getState()),
    requestAction: fetchTopRatedTvsRequest,
    succesAction: fetchTopRatedTvsSuccess,
    failAction: fetchTopRatedTvsFail,
    apiRequest: topRatedTvs,
    params,
    dispatch
  });

export const fetchOnAirTvs = params => (dispatch, getState) =>
  fetchMediaAction({
    shouldDispatchAction: shouldFetchTv(getState()),
    requestAction: fetchOnAirTvsRequest,
    succesAction: fetchOnAirTvsSuccess,
    failAction: fetchOnAirTvsFail,
    apiRequest: onAirTvs,
    params,
    dispatch
  });

/**
* 
* @param {number} id tv id 
* @param {object} params request paramerter
*/
export const fetchTvDetail = (id, params) => (dispatch, getState) => 
 fetchMediaAction({
   shouldDispatchAction: shouldFetchTv(getState()),
   requestAction: fetchTvDetailRequest,
   succesAction: fetchTvDetailSuccess,
   failAction: fetchTvDetailFail,
   apiRequest: tvDetail(id),
   params,
   dispatch
 });
