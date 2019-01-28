import { get } from 'lodash';
import { createSelector } from 'reselect';
import {
  getMovieEntities,
  getTvEntities,
  getPeopleEntities
} from './entitiesSelectors';

const _entitiesSelector = (mediaType) => {
  const type = mediaType.toLowerCase();

  let entitiesSelector;

  if (type === 'movie') {
    entitiesSelector = getMovieEntities;
  } else if (type === 'tv') {
    entitiesSelector = getTvEntities;
  } else if (type === 'people') {
    entitiesSelector = getPeopleEntities;
  }

  return entitiesSelector;
};

export const getPopularMediaResults = (mediaType) => (state) => 
  get(state, `popularMedia.${mediaType.toLowerCase()}.results`);

export const getPopularMediaPageNumber = (mediaType) => (state) => 
  get(state, `popularMedia.${mediaType.toLowerCase()}.page`);

export const getPopularMediaTotalPages = (mediaType) => (state) => 
  get(state, `popularMedia.${mediaType.toLowerCase()}.totalPages`);

export const getPopularMediaResultsCount = (mediaType) => (state) => 
  get(state, `popularMedia.${mediaType.toLowerCase()}.totalResults`);

export const hasMorePopularMediaResults = (mediaType) => createSelector(
  getPopularMediaPageNumber(mediaType),
  getPopularMediaTotalPages(mediaType),
  (page, totalPages) => page < totalPages
);

export const getPopularMedia = (mediaType) => createSelector(
  _entitiesSelector(mediaType),
  getPopularMediaResults(mediaType),
  (entities, ids) => ids && ids.map(id => get(entities, id))
);

export const getActiveMediaId = (state) => get(state, 'mediaInfo.active');

export const getMediaInfoResults = (state) => get(state, 'mediaInfo.ids');

export const getMediaDetail = (mediaType) => createSelector(
  _entitiesSelector(mediaType),
  getActiveMediaId,
  (entities, activeId) => {

    if (!activeId) return false;

    const [, id] = activeId.split('__');

    return get(entities, id);
  } 
);