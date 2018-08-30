import { createSelector } from "reselect";
import { getEntityIds, getEntities, getInfoId } from "./commonSelectors";

const getTvs = (ids, entities) => ids.length && ids.map(id => entities[`${id}`]);

const getTvEntities = state => getEntities(state, 'tv');
const getPopularTvIds = state => getEntityIds(state, 'tv', 'popular');
const getDiscoveredTvIds = state => getEntityIds(state, 'tv', 'discover');
const getTopRatedTvIds = state => getEntityIds(state, 'tv', 'topRated');
const getOnAirTvIds = state => getEntityIds(state, 'tv', 'onAir');
const getTvInfoId = state => getInfoId(state, 'tv');

export const getPopularTvs = createSelector(
  getPopularTvIds,
  getTvEntities,
  getTvs
);

export const getDiscoveredTvs = createSelector(
  getDiscoveredTvIds,
  getTvEntities,
  getTvs
);

export const getTopRatedTvs = createSelector(
  getTopRatedTvIds,
  getTvEntities,
  getTvs
);

export const getOnAirTvs = createSelector(
  getOnAirTvIds,
  getTvEntities,
  getTvs
);

export const getTvDetail = createSelector(
  getTvInfoId,
  getTvEntities,
  (id, entities) => entities[`${id}`]
);
