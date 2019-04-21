import { get } from 'lodash';
import { createSelector } from 'reselect';
import { 
  createMediaListPath, 
  createEntitiesSelector, 
  getEntitiesBySchema,
  getEntitiesByIds
} from '../utils/selectorUtils';


export const getPopularMediaResults = mediaType => {
  const path = createMediaListPath('popular', mediaType, 'results');
  return state => get(state, path);
};

export const getTrendingMediaResults = mediaType => {
  const path = createMediaListPath('trending', mediaType, 'results');
  return state => get(state, path);
};

export const getTopRatedMediaResults = mediaType => {
  const path = createMediaListPath('toprated', mediaType, 'results');
  return state => get(state, path);
};

export const getUpcomingMovieResults = state => {
  const path = createMediaListPath('upcoming', 'movie', 'results');
  return get(state, path);
};

export const getNowPlayingMovieResults = state => {
  const path = createMediaListPath('nowplaying', 'movie', 'results');
  return get(state, path);
};

export const getOnAirTvsResults = state => {
  const path = createMediaListPath('onair', 'tv', 'results');
  return get(state, path);
};

export const getMediaListUpdatedTime = (entityType, mediaType) => {
  const path = createMediaListPath(entityType, mediaType, 'lastUpdated');
  return state => get(state, path);
};

export const getMediaPageNumber = (entityType, mediaType) => {
  const path = createMediaListPath(entityType, mediaType, 'page');
  return state => get(state, path);
};

export const getMediaTotalPages = (entityType, mediaType) => {
  const path = createMediaListPath(entityType, mediaType, 'totalPages');
  return state => get(state, path);
};

export const hasMoreResults = (entityType, mediaType) => 
  createSelector(
    getMediaPageNumber(entityType, mediaType),
    getMediaTotalPages(entityType, mediaType),
    (page, totalPages) => page < totalPages
  );

export const getPopularMedia = mediaType => createSelector(
  createEntitiesSelector(mediaType),
  getPopularMediaResults(mediaType),
  (entities, ids) => getEntitiesByIds(entities, mediaType, ids)
);

export const getTrendingMedia = mediaType => createSelector(
  createEntitiesSelector(mediaType),
  getTrendingMediaResults(mediaType),
  (entities, ids) => getEntitiesByIds(entities, mediaType, ids)
);

export const getTopRatedMedia = mediaType => createSelector(
  createEntitiesSelector(mediaType),
  getTopRatedMediaResults(mediaType),
  (entities, ids) => getEntitiesByIds(entities, mediaType, ids)
);

export const getUpcomingMovie = createSelector(
  createEntitiesSelector('movie'),
  getUpcomingMovieResults,
  (entities, ids) => getEntitiesByIds(entities, 'movie', ids)
);

export const getNowPlayingMovie = createSelector(
  createEntitiesSelector('movie'),
  getNowPlayingMovieResults,
  (entities, ids) => getEntitiesByIds(entities, 'movie', ids)
);

export const getOnAirTv = createSelector(
  createEntitiesSelector('tv'),
  getOnAirTvsResults,
  (entities, ids) => getEntitiesByIds(entities, 'tv', ids)
);

export const getTrendingAllResults = state => get(state, 'trending.results');

export const getTrendingAllUpdatedTime = state => get(state, 'trending.lastUpdated');

export const getTrendingAll = createSelector(
  createEntitiesSelector('all'),
  getTrendingAllResults,
  getEntitiesBySchema
);

export const getActiveMediaId = state => {
  const active = get(state, 'mediaInfo.active');
  const key = Object.keys(active)[0];
  if (!key) return undefined;

  const [, id] = key.split('__');
  return id;
};

export const getMediaInfoResults = state => get(state, 'mediaInfo.items');

export const getMediaInfoUpdatedTime = (mediaType, id) => createSelector(
  getMediaInfoResults,
  items => {
    if (!items) return undefined;
    const key = `${mediaType.toLowerCase()}__${id}`;
    return items[key];
  }
);

export const getMediaDetail = mediaType => createSelector(
  createEntitiesSelector(mediaType),
  getActiveMediaId,
  (entities, activeId) => get(entities, activeId)
);