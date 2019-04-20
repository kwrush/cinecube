import { trendingActionTypes as t } from '../constants/actionTypes';
import { 
  fetchListRequest, 
  fetchListSuccess,
  fetchListFail,
  fetchMediaAction
} from '../utils/actionUtils';
import { trendingAll } from '../services/trendingApi';

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

//TODO: implement this
const shouldFetchTrending = state => true;

/**
 * 
 * @param {object} params request parameters 
 */
export const fetchTrendingAll = params => (dispatch, getState) => 
  fetchMediaAction({
    shouldDispatchAction: shouldFetchTrending(getState()),
    requestAction: fetchTrendingAllRequest,
    succesAction: fetchTrendingAllSuccess,
    failAction: fetchTrendingAllFail,
    apiRequest: trendingAll,
    params,
    dispatch
  });

export const fetchTrendingMovies = params => (dispatch, getState) => 
  fetchMediaAction({
    shouldDispatchAction: shouldFetchTrending(getState()),
    requestAction: fetchTrendingMoviesRequest,
    succesAction: fetchTrendingMoviesSuccess,
    failAction: fetchTrendingMoviesFail,
    apiRequest: trendingAll,
    params,
    dispatch
  });

export const fetchTrendingTvs = params => (dispatch, getState) => 
  fetchMediaAction({
    shouldDispatchAction: shouldFetchTrending(getState()),
    requestAction: fetchTrendingTvsRequest,
    succesAction: fetchTrendingTvsSuccess,
    failAction: fetchTrendingTvsFail,
    apiRequest: trendingAll,
    params,
    dispatch
  });

export const fetchTrendingPeople = params => (dispatch, getState) => 
  fetchMediaAction({
    shouldDispatchAction: shouldFetchTrending(getState()),
    requestAction: fetchTrendingPeopleRequest,
    succesAction: fetchTrendingPeopleSuccess,
    failAction: fetchTrendingPeopleFail,
    apiRequest: trendingAll,
    params,
    dispatch
  });