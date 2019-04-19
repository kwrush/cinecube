import * as movieApi from '../services/movieApi';
import * as tvApi from '../services/tvApi';
import * as peopleApi from '../services/peopleApi';
import { camelCaseKey, getTimeStamp } from './helpers';
import { mergeEntities } from '../actions/entitiesActions';
import { create } from 'domain';

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
  dispatch(requestAction());
  try {
    const res = await apiRequest({ ...params });
    const camelized = camelCaseKey(res.data);
    dispatch(mergeEntities(camelized.entities));
    dispatch(succesAction(camelized.results));
 
  } catch (e) {
    dispatch(failAction(e));
  }
};

const createSuccessSyncAction = actionType => 
  t => result => createSyncAction(
    t[actionType],
    { payload: result },
    { timestamp: getTimeStamp() }
  );

const createFailSyncAction = actionType =>
  t => e => createSyncAction(
    t[actionType],
    { 
      payload: {
        errorMessage: e.message || 'Error occured during the request of resource'
      }
    }
  );

export const fetchListRequest = (fetchType, mediaType) => {
  const actionType = `FETCH_${fetchType.toUpperCase()}_${mediaType.toUpperCase()}_REQUEST`;
  return t => createSyncAction(t[actionType]);
};

export const fetchListSuccess = (fetchType, mediaType) => {
  const actionType = `FETCH_${fetchType.toUpperCase()}_${mediaType.toUpperCase()}_SUCCESS`;
  return createSuccessSyncAction(actionType);
};

export const fetchListFail = (fetchType, mediaType) => {
  const actionType = `FETCH_${fetchType.toUpperCase()}_${mediaType.toUpperCase()}_FAIL`;
  return createFailSyncAction(actionType);
};

export const fetchInfoRequest = mediaType => {
  const actionType = `FETCH_${mediaType.toUpperCase()}_DETAIL_REQUEST`;
  return t => createSyncAction(t[actionType]);
};

export const fetchInfoSuccess = mediaType => {
  const actionType = `FETCH_${mediaType.toUpperCase()}_DETAIL_SUCCESS`;
  return createSuccessSyncAction(actionType);
};

export const fetchInfoFail = mediaType => {
  const actionType = `FETCH_${mediaType.toUpperCase()}_DETAIL_FAIL`;
  return createFailSyncAction(actionType);
};