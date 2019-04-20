import { merge } from 'lodash';
import { uniqueConcat } from '../utils/helpers';

const _searchEntityKey = (searchType, query) => (`${searchType}__query__${query}`);

const _handleSearchResults = (state = {}, action) => {
  const { type } = action;
  const matches = /SEARCH_(MULTI|MOVIE|TV|PEOPLE)_SUCCESS/.exec(type);

  if (!matches) return state;

  const { payload, lastUpdated } = action;
  const [, requestType] = matches;
  const { query, result } = payload;
  const { results, page, ...rest } = result;
  const entityKey = _searchEntityKey(requestType.toLowerCase(), query);

  let newResults = results;
  if (state.listings && state.listings[entityKey]) {
    const prevResults = state.listings[entityKey].results;
    const prevPage = state && state.page ? state.page : 0;
    if (prevPage !== page)
      newResults = uniqueConcat(prevResults, results);
  };

  const listing = {
    [entityKey]: {
      results: newResults,
      page,
      ...rest,
      lastUpdated
    }
  };

  return merge(
    {},
    state,
    { listings: listing }
  );
};


export default (state = {}, action) => {

  const { type, payload } = action;
  const requestMatches = /SEARCH_(MULTI|MOVIE|TV|PEOPLE)_REQUEST/.exec(type);

  if (!requestMatches) return _handleSearchResults(state, action);

  const [, requestType] = requestMatches;
  const { query } = payload;

  const active = _searchEntityKey(requestType.toLowerCase(), query);

  return {
    ...state,
    query,
    active
  };
};
