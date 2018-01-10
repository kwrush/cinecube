export const getDataEntities = 
  (state, mediaType) => state.getIn([mediaType, 'entities']);

export const getEntityUpdateTime = 
  (state, mediaType, entityName) => state.getIn([mediaType, entityName, 'updatedAt']);
  
export const getEntityResult = 
  (state, mediaType, entityName) => state.getIn([mediaType, entityName, 'result']);

export const getCurrentPage = 
  (state, mediaType, entityName) => state.getIn([mediaType, entityName, 'pageIndex']);

export const getTotalPages = 
  (state, mediaType, entityName) => state.getIn([mediaType, entityName, 'totalPages']);
  
  