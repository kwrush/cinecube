import { tvActionTypes as t } from '../constants/actionTypes';
import { mergeEntities } from './entitiesActions';
import {
  popularTvs,
  tvDetail
} from '../services/tvApi'; 
import { camelCaseKey } from '../utils/helpers';
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
export const fetchPopularTvs = (params) => (dispatch, getState) => 
  fetchMediaAction({
    shouldDispatchAction: shouldFetchTv(getState()),
    apiRequest: popularTvs,
    requestAction: () => fetchPopularTvsRequest,
    succesAction: fetchPopularTvsSuccess,
    failAction: fetchPopularTvsFail,
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
    apiRequest: tvDetail,
    requestAction: () => fetchTvDetailRequest,
    succesAction: fetchTvDetailSuccess,
    failAction: fetchTvDetailFail,
    params,
    dispatch
  });
