import { get } from 'lodash';
import { createSelector } from 'reselect';
import { 
  createEntitiesSelector, 
  getEntitiesBySchema 
} from '../utils/selectorUtils';

export const getSearchQuery = state => get(state, 'search.query');

export const getActiveSearch = state => get(state, 'search.active');

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
  createEntitiesSelector('multi'),
  getSearchResults(searchType, query),
  getEntitiesBySchema
);



