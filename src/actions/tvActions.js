import { normalize } from 'normalizr';
import { tvActionTypes as actionTypes } from 'constants/actionTypes';
import { tvResultSchema, tvInfoSchema } from 'constants/schema';
import { loadTvShows, tvShowsInfo, searchTvShows } from 'utils/api';
import { fetchRequest, fetchSuccess, fetchFailure } from './commonActions';

const performTvShowsFetch = (type, params, fetchSuccessAction) => async (dispatch) => {
  try {
    const { data } = await loadTvShows(type, params); 
    const result = normalize(data.results, tvResultSchema);
    dispatch(fetchSuccess(result, fetchSuccessAction));
  } catch (err) {
    dispatch(fetchFailure(err));
    // for debug
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
  }
};

const discoverTvShows = (params) => performMovieFetch('discover', params, actionTypes.DISCOVER_TV_SUCCESS, );

const fetchPopularTvShows = (params) => performTvShowsFetch('popular', params, actionTypes.FETCH_POPULAR_TV_SUCCESS);

const fetchOnAirTvShows = (params) => performMovieFetch('onAir', params, actionTypes.FETCH_ON_AIR_MOVIE_SUCCESS);

const fetchTopRatedTvShows = (params) => performTvShowsFetch('topRated', params, actionTypes.FETCH_TOP_RATED_TV_SUCCESS);

const fetchTvShowsInfo = (id) => async (dispatch) => {
  try {
    const { data } = await tvShowsInfo(id);
    const result = normalize(data, tvInfoSchema);
    dispatch(fetchSuccess(result, actionTypes.FETCH_TV_INFO_SUCCESS));
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
    const result = normalize(data.results, tvResultSchema);
    dispatch(fetchSuccess(data.results, actionTypes.SEARCH_TV_SUCCESS));
  } catch (err) {
    dispatch(fetchFailure(err));
    // for debug
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
  }
};

export const fetchTvShows = (requestType, params) => (dispatch) => {
  let action = null;
  
  switch (requestType) {
    case actionTypes.DISCOVER_TV_REQUEST:
      action = discoverTvShows;
      break;
    case actionTypes.FETCH_POPULAR_TV_REQUEST:
      action = fetchPopularTvShows;
      break;
    case actionTypes.FETCH_TOP_RATED_TV_REQUEST:
      action = fetchTopRatedTvShows;
      break;
    case actionTypes.FETCH_ON_AIR_TV_REQUEST:
      action = fetchOnAirTvShows;
      break;
  }
  
  if (action) {
    dispatch(fetchRequest(requestType));
    dispatch(action(params));
  }
};

export const tvShowsSearch = (params) => (dispatch) => {
  const { query, ...options } = params;
  dispatch(fetchRequest(actionTypes.SEARCH_TV_REQUEST));
  dispatch(performTvShowsSearch(query, options));
};


