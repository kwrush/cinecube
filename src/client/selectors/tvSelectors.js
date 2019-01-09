import { createSelector } from "reselect";
import { 
  getTopicItemsByPage, 
  getEntitiesByType, 
  getActiveInfoByType, 
  getFetchedInfoByType 
} from "./commonSelectors";

const getTvs = (ids, entities) => 
  Array.isArray(ids) ? ids.map(id => ({ ...entities[`${id}`], ...{ mediaType: 'tv' } })) : [];

const getTvListByTopic = (topic) => (state, props) =>
  getTopicItemsByPage(state, 'tv', topic,
    typeof props === 'undefined'
      ? 1
      : typeof props.page === 'undefined'
        ? 1
        : props.page);

const getTvEntities = state => 
  getEntitiesByType(state, 'tv');

const getPopularTvIds = (state, props) => 
  getTvListByTopic('popular')(state, props);

const getTopRatedTvIds = (state, props) => 
  getTvListByTopic('topRated')(state, props);

const getOnAirTvIds = (state, props) => 
  getTvListByTopic('onAir')(state, props);

const getActiveTvInfo = (state) => 
  getActiveInfoByType(state, 'tv');

const getFetchedTvInfo = (state) => 
  getFetchedInfoByType(state, 'tv');

export const getPopularTvs = createSelector(
  getPopularTvIds,
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
  getActiveTvInfo,
  getFetchedTvInfo,
  getTvEntities,
  (activeId, fetchedId, entities) => 
    typeof activeId === 'undefined' 
    ? null 
    : typeof fetchedId === 'undefined' 
      ? null 
      : fetchedId.includes(activeId)
        ? entities[`${activeId}`]
        : null
);
