import { get, capitalize } from 'lodash';
import { createSelector } from 'reselect';
import {
  getEntities,
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
  } else if (type === 'multi') {
    entitiesSelector = getEntities
  }

  return entitiesSelector;
};

export const getSearchResults = (searchType) => (state) => 
  get(state, `search.for${capitalize(searchType)}.results`);

export const getSearchResultsPageNumber = (searchType) => (state) => 
  get(state, `search.for${capitalize(searchType)}.page`);

export const getSearchRsultsPagesCount = (searchType) => (state) => 
  get(state, `search.for${capitalize(searchType)}.totalPages`);

export const getSearchResultsTotalNumber = (searchType) => (state) => 
  get(state, `search.for${capitalize(searchType)}.totalResults`);

export const getMediaResults = (searchType) => createSelector(
  _entitiesSelector(`${searchType}`),
  getSearchResults(`${searchType}`),
  (entities, results) => results && results.map(res => {
    if (typeof res === 'object') {
      const { schema, id } = res;
      return get(entities, `${schema}.${id}`);
    } else {
      return get(entities, res);
    }
  })
);

