import { get } from 'lodash';
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

export const getSearchQuery = (state) => 
  get(state, 'search.query');

export const getActiveSearch = (state) => 
  get(state, 'search.active');

export const getSearchListing = (searchType, query) => (state) => {
  const key = `${searchType}__query__${query}`;
  return get(state, `search.listings.${key}`);
};

export const getSearchResults = (searchType, query) => createSelector(
  getSearchListing(searchType, query),
  (listing) => listing && listing.results
);

export const getSearchResultsPageNumber = (searchType, query) => createSelector(
  getSearchListing(searchType, query),
  (listing) => listing && listing.page
);

export const getSearchResultsTotalPages = (searchType, query) => createSelector(
  getSearchListing(searchType, query),
  (listing) => listing && listing.totalPages
);

export const getSearchResultsTotalNumber = (searchType, query) => createSelector(
  getSearchListing(searchType, query),
  (listing) => listing && listing.totalResults
);

export const hasMoreSearchResults = (searchType, query) => createSelector(
  getSearchResultsPageNumber(searchType, query),
  getSearchResultsTotalPages(searchType, query),
  (page, totalPages) => page < totalPages
);

export const getSearchMedia = (searchType, query) => createSelector(
  _entitiesSelector(searchType),
  getSearchResults(searchType, query),
  (entities, results) => results && results.map(res => {
    if (typeof res === 'object') {
      const { schema, id } = res;
      return get(entities, `${schema}.${id}`);
    } else {
      return get(entities, res);
    }
  })
);

