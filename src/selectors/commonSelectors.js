import { get } from 'lodash';

export const getDataEntities =
  (state, mediaType) => get(state, [mediaType, 'entities']);

export const getEntityUpdateTime = 
  (state, mediaType, entityName) => get(state, [mediaType, entityName, 'updatedAt']);
  
export const getEntityResult = 
  (state, mediaType, entityName) => get(state, [mediaType, entityName, 'result']);

export const getCurrentPage = 
  (state, mediaType, entityName) => get(state, [mediaType, entityName, 'pageIndex']);

export const getTotalPages = 
  (state, mediaType, entityName) => get(state, [mediaType, entityName, 'totalPages']);