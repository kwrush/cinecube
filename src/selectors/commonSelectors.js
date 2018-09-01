import { get } from 'lodash';

export const getEntitiesByType = (state, mediaType) => get(state, ['entities', mediaType]);

export const getTopicItemsByPage = (state, mediaType, topic, page) => get(state, ['pagination', mediaType, topic, page, 'items']);

export const getTopicUpdatedTimeByPage = (state, mediaType, topic, page) => get(state, ['pagination', mediaType, topic, page, 'updatedAt']);

export const getFetchingStatusByPage = (state, mediaType, topic, page) => get(state, ['pagination', mediaType, topic, page, 'isFetching']);

export const getTotalPagesByTopic = (state, mediaType, topic) => get(state, ['pagination', mediaType, topic, 'totalPages']);

export const getActiveInfoByType = (state, mediaType) => get(state, ['mediaInfo', mediaType, 'active']);

export const getFetchedInfoByType = (state, mediaType) => get(state, ['mediaInfo', mediaType, 'fetched']);