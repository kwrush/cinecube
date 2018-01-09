import { createSelector } from 'reselect';
import { getDataEntities, getResult } from './commonSelectors';
import { descendComparator } from 'utils/helpers';

export const getTvOverviewEntity = state => getDataEntities(state, 'tv');
export const getPopularTvIds = state => getResult(state, 'tv', 'popular');
export const getDiscoverTvIds = state => getResult(state, 'tv', 'discover');
export const getTopRatedTvIds = state => getResult(state, 'tv', 'topRated');
export const getOnAirTvIds = state => getResult(state, 'tv', 'onAir');

export const getPopularTvs = createSelector(
  [ getTvOverviewEntity, getPopularTvIds ],
  (data, ids) => ids
    .map(id => data.get(id))
    .sortBy(
      tv => tv.get('popularity'),
      (p1, p2) => descendComparator(p1, p2)
    )
); 

export const getDiscoverTvs = createSelector(
  [ getTvOverviewEntity, getDiscoverTvIds ],
  (data, ids) => ids
    .map(id => data.get(id))
    .sortBy(
      tv => tv.get('popularity'),
      (p1, p2) => descendComparator(p1, p2)
    )
);

export const getOnAirTvs = createSelector(
  [ getTvOverviewEntity, getOnAirTvIds ],
  (data, ids) => ids
    .map(id => data.get(id))
    .sortBy(
      tv => tv.get('popularity'),
      (p1, p2) => descendComparator(p1, p2)
    )
);
