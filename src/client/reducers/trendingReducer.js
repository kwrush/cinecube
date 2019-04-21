import { trendingActionTypes as t } from '../constants/actionTypes';

const trendingReducer = (state = {}, action) => {
  const { type, payload, lastUpdated } = action;

  if (type !== t.FETCH_TRENDING_ALL_SUCCESS ) return state;

  const { results, ...rest } = payload;
  return {
    ...state,
    ...rest,
    results,
    lastUpdated
  };
};

export default trendingReducer;