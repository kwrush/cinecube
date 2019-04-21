import { trendingActionTypes as t } from '../constants/actionTypes';
import { 
  fetchListRequest, 
  fetchListSuccess,
  fetchListFail,
  fetchMediaAction
} from '../utils/actionUtils';
import { trendingAll } from '../services/trendingApi';
import { 
  getMediaListUpdatedTime, 
  getTrendingAllUpdatedTime 
} from '../selectors/mediaSelectors';
import { getTimeStamp, differenceInTime } from '../utils/helpers';

export const fetchTrendingAllRequest = fetchListRequest('trending', 'all')(t);

export const fetchTrendingAllSuccess = fetchListSuccess('trending', 'all')(t);

export const fetchTrendingAllFail = fetchListFail('trending', 'all')(t);

export const fetchTrendingMoviesRequest = fetchListRequest('trending', 'movie')(t);

export const fetchTrendingMoviesSuccess = fetchListSuccess('trending', 'movie')(t);

export const fetchTrendingMoviesFail = fetchListFail('trending', 'movie')(t);

export const fetchTrendingTvsRequest = fetchListRequest('trending', 'tv')(t);

export const fetchTrendingTvsSuccess = fetchListSuccess('trending', 'tv')(t);

export const fetchTrendingTvsFail = fetchListFail('trending', 'tv')(t);

export const fetchTrendingPeopleRequest = fetchListRequest('trending', 'people')(t);

export const fetchTrendingPeopleSuccess = fetchListSuccess('trending', 'people')(t);

export const fetchTrendingPeopleFail = fetchListFail('trending', 'people')(t);

const shouldFetchTrendingList = (state = {}, mediaType = '') => {
  const mt = mediaType.toLowerCase();
  if (['all', 'movie', 'tv', 'people'].indexOf(mt) < 0) 
    return false;

  const currently = getTimeStamp();
  const lastUpdated = mt === 'all' 
    ? getTrendingAllUpdatedTime(state)
    : getMediaListUpdatedTime('trending', mt)(state);

  return typeof lastUpdated === 'undefined' 
    || differenceInTime(lastUpdated * 1000, currently * 1000, 'days') > 1;
}; 

/**
 * 
 * @param {object} params request parameters 
 */
export const fetchTrendingAll = params => (dispatch, getState) => 
  fetchMediaAction({
    shouldDispatchAction: shouldFetchTrendingList(getState(), 'all'),
    requestAction: fetchTrendingAllRequest,
    succesAction: fetchTrendingAllSuccess,
    failAction: fetchTrendingAllFail,
    apiRequest: trendingAll,
    params,
    dispatch
  });

export const fetchTrendingMovies = params => (dispatch, getState) => 
  fetchMediaAction({
    shouldDispatchAction: shouldFetchTrendingList(getState(), 'movie'),
    requestAction: fetchTrendingMoviesRequest,
    succesAction: fetchTrendingMoviesSuccess,
    failAction: fetchTrendingMoviesFail,
    apiRequest: trendingAll,
    params,
    dispatch
  });

export const fetchTrendingTvs = params => (dispatch, getState) => 
  fetchMediaAction({
    shouldDispatchAction: shouldFetchTrendingList(getState(), 'tv'),
    requestAction: fetchTrendingTvsRequest,
    succesAction: fetchTrendingTvsSuccess,
    failAction: fetchTrendingTvsFail,
    apiRequest: trendingAll,
    params,
    dispatch
  });

export const fetchTrendingPeople = params => (dispatch, getState) => 
  fetchMediaAction({
    shouldDispatchAction: shouldFetchTrendingList(getState(), 'people'),
    requestAction: fetchTrendingPeopleRequest,
    succesAction: fetchTrendingPeopleSuccess,
    failAction: fetchTrendingPeopleFail,
    apiRequest: trendingAll,
    params,
    dispatch
  });