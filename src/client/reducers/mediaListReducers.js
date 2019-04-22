import { camelCase } from 'lodash';
import { uniqueConcat } from '../utils/helpers';

const _matchListingAction = (actionType = '') => {
  const matches = /FETCH_(\w+)_(\w+)_SUCCESS/.exec(actionType);
  if (!matches) return false;

  const [, fetchType, fetchMedia] = matches;

  return {
    fetchType,
    fetchMedia
  };
};

const _handleMediaListResult = (state, payload, lastUpdated) => {
  const { results, page, ...rest } = payload;
  const prevResults = state && state.results ? state.results : [];
  const prevPage = state && state.page ? state.page : 0;

  const newResults = prevPage !== page 
    ? uniqueConcat(prevResults, results)
    : results;

  return {
    results: newResults,
    page,
    ...rest,
    lastUpdated
  };
};

export default (state = {}, action) => {
  const { type, payload, lastUpdated } = action;
  const matches = _matchListingAction(type);

  if (!matches) return state;

  const { fetchType, fetchMedia } = matches;

  if (['movie', 'tv', 'people'].indexOf(fetchMedia.toLowerCase()) === -1) return state;

  const listKey = camelCase(`${fetchType}_${fetchMedia}`);
  return {
    ...state,
    [listKey]: _handleMediaListResult(state[listKey], payload, lastUpdated)
  };
};