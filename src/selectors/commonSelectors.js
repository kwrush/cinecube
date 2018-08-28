import { get } from 'lodash';

export const getEntities = (state, mediaType) => get(state, ['entities', mediaType]);

export const getEntityIds = (state, mediaType, indexType) => get(state, [mediaType, indexType , 'items']);

export const getInfoId = (state, mediaType) => get(state, [mediaType, 'info', 'target', 'id']);

export const getUpdatedTime = (state, mediaType, indexType) => get(state, [mediaType, indexType, 'updatedAt']);

export const getPageNumber = (state, mediaType, indexType) => get(state, [mediaType, indexType, 'page']);

export const getFetchingStatus = (state, mediaType, indexType) => get(state, [mediaType, indexType, 'isFetching']);

export const getError = (state, mediaType, indexType) => get(state, [mediaType, indexType, 'error']);

export const getTotalPages = (state, mediaType, indexType) => get(state, [mediaType, indexType, 'totalPages']);