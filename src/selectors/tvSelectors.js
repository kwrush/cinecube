import { createSelector } from 'reselect';
import { descendComparator } from 'utils/helpers';

export const getTvOverviewEntity = state => state.getIn(['tv', 'entities']);
export const getPopularTvIds = state => state.getIn(['tv', 'popular', 'result']);
export const getDiscoverTvIds = state => state.getIn(['tv', 'discover', 'result']);
export const getTopRatedTvIds = state => state.getIn(['tv', 'topRated', 'result']);
export const getOnAirTvIds = state => state.getIn(['tv', 'onAir', 'result']);

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
