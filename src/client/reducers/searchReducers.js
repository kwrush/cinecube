import { merge } from 'lodash';
import { uniqueConcat } from '../utils/helpers';

const _searchTypeKey = (searchType, query) => (`${searchType}__query__${query}`);

const _handleSearchResults = (state, action) => {
  const { type, payload } = action;
  const matches = /(.*)_(MULTI|MOVIE|TV|PEOPLE)_SUCCESS/.exec(type);

  if (!matches) return state;

  const [, , requestType] = matches;

  let { query, result } = payload;
  let { results, ...pageInfo } = result;
  const key = _searchTypeKey(requestType.toLocaleLowerCase(), query);

  if (state.listings && state.listings[key]) {
    const prevResults = state.listings[key].results;
    results = uniqueConcat(prevResults, results);
  } 

  const listings = {
    [key]: {
      results,
      ...pageInfo
    }
  };

  return merge(
    {},
    state,
    { listings }
  );
};


export default (state = {}, action) => {

  const { type, payload } = action;
  const requestMatches = /(.*)_(MULTI|MOVIE|TV|PEOPLE)_REQUEST/.exec(type);

  if (!requestMatches) return _handleSearchResults(state, action);

  const [, , requestType] = requestMatches;
  const { query } = payload;

  const key = _searchTypeKey(requestType.toLowerCase(), query);

  return {
    ...state,
    query,
    listings: {},
    active: key,
  };
};

