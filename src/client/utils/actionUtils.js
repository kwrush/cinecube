import * as movieApi from '../services/movieApi';
import * as tvApi from '../services/tvApi';
import * as peopleApi from '../services/peopleApi';
import { camelCaseKey, getTimeStamp } from './helpers';
import { mergeEntities } from '../actions/entitiesActions';

const getMovieListApi = (topic) => {
  switch (topic.toLowerCase()) {
    case 'popular':
      return movieApi['fetchPopularMovies'];
    case 'toprated':
      return movieApi['fetchTopRatedMovies'];
    case 'intheatre':
      return movieApi['fetchInTheatreMovies'];
    case 'upcoming':
      return movieApi['fetchUpcomingMovies'];
    default:
      return null;
  }
};

const getTvListApi = (topic) => {
  switch (topic.toLowerCase()) {
    case 'popular':
      return tvApi['fetchPopularTvs'];
    case 'topRated':
      return tvApi['fetchTopRatedTvs'];
    case 'upcoming':
      return tvApi['fetchOnAirTvs'];
    default:
      return null;
  }
};

const getPeopleListApi = (topic) => {
  if (topic === 'popular') 
    return peopleApi['fetchPopularPeople'];

  return null;
};

export const getMediaListApi = (mediaType, topic) => {
  if (mediaType === 'movie') {
    return getMovieListApi(topic);
  } else if (mediaType === 'tv') {
    return getTvListApi(topic);
  } else if (mediaType === 'people') {
    return getPeopleListApi(topic);
  }

  return null;
};

export const createActionTypes = (actions) => {
  const actionMap = {};

  for (let i in actions) {
    if (i < actions.length) {
      actionMap[actions[i]] = actions[i];
    }
  }

  return actionMap;
};

export const createSyncAction = (type, ...args) => {
  const action = { type };
  return Object.assign({}, action, ...args);
};

export const fetchMediaAction = async ({
  shouldDispatchAction,
  apiRequest,
  requestAction,
  failAction,
  succesAction,
  params,
  dispatch
}) => {
  if (!shouldDispatchAction) {
    return Promise.resolve();
  }

  typeof requestAction === 'function'
    ? dispatch(requestAction())
    : dispatch(requestAction);

  try {
    const res = await apiRequest({ ...params });
    const camelized = camelCaseKey(res.data);
    dispatch(mergeEntities(camelized.entities));
    dispatch(succesAction(camelized.result));
 
  } catch (e) {
    dispatch(failAction(e));
  }
};

const createSuccessSyncAction = actionType => 
  result => createSyncAction(
    actionType,
    { payload: result },
    { lastUpdated: getTimeStamp() }
  );

const createFailSyncAction = actionType =>
  e => createSyncAction(
    actionType,
    { payload: e.message || 'Error occured during the request of resource' },
    { error: e }
  );

export const fetchListRequest = (fetchType, mediaType) => {
  const actionType = `FETCH_${fetchType.toUpperCase()}_${mediaType.toUpperCase()}_REQUEST`;
  return t => createSyncAction(t[actionType]);
};

export const fetchListSuccess = (fetchType, mediaType) => {
  const actionType = `FETCH_${fetchType.toUpperCase()}_${mediaType.toUpperCase()}_SUCCESS`;
  return t => createSuccessSyncAction(t[actionType]);
};

export const fetchListFail = (fetchType, mediaType) => {
  const actionType = `FETCH_${fetchType.toUpperCase()}_${mediaType.toUpperCase()}_FAIL`;
  return t => createFailSyncAction(t[actionType]);
};

export const fetchInfoRequest = mediaType => {
  const actionType = `FETCH_${mediaType.toUpperCase()}_DETAIL_REQUEST`;
  return t => createSyncAction(t[actionType]);
};

export const fetchInfoSuccess = mediaType => {
  const actionType = `FETCH_${mediaType.toUpperCase()}_DETAIL_SUCCESS`;
  return t => createSuccessSyncAction(t[actionType]);
};

export const fetchInfoFail = mediaType => {
  const actionType = `FETCH_${mediaType.toUpperCase()}_DETAIL_FAIL`;
  return t => createFailSyncAction(t[actionType]);
};

export const searchRequest = (searchType, query) => {
  const actionType = `SEARCH_${searchType.toUpperCase()}_REQUEST`;
  return t => createSyncAction(
    t[actionType],
    { payload: { query } }
  );
};

export const searchSuccess = (searchType, query) => {
  const actionType = `SEARCH_${searchType.toUpperCase()}_SUCCESS`;
  return t => result => createSyncAction(
    t[actionType],
    { payload: { query, result } },
    { lastUpdated: getTimeStamp() }
  );
};

export const searchFail = searchType => {
  const actionType = `SEARCH_${searchType.toUpperCase()}_FAIL`;
  return t => createFailSyncAction(t[actionType]);
};

