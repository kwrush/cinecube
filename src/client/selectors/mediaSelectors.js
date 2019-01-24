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

export const getPopularMediaPagesCount = (mediaType) => (state) => 
  get(state, `popularMedia.${mediaType.toLowerCase()}.totalPages`);

export const getPopularMediaResultsCount = (mediaType) => (state) => 
  get(state, `popularMedia.${mediaType.toLowerCase()}.totalResults`);
  
export const getPopularMedia = (mediaType) => createSelector(
  _entitiesSelector(`${mediaType}`),
  getPopularMediaResults(`${mediaType}`),
  (entities, ids) => ids && ids.map(id => get(entities, id))
);

export const getMediaInfoResult = (mediaType) => (state) => 
  get(state, `mediaInfo.${mediaType.toLowerCase()}.id`);

export const getMediaDetail = (mediaType) => createSelector(
  _entitiesSelector(`${mediaType}`),
  getMediaInfoResult(`${mediaType}`),
  (entities, id) => id && get(entities, id)
);