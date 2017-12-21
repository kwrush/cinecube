import zipObject from 'lodash/zipObject';

export const updateFetchStatus = (state, entityName, newStatus) => {
  const isFetching = typeof newStatus.isFetching === 'undefined' ? false : newStatus.isFetching;
  const updatedAt = typeof newStatus.updatedAt === 'undefined' ? null : newStatus.updatedAt 
  return state.update(entityName, entity => entity.merge({
    isFetching: isFetching,
    updatedAt: updatedAt
  }));
};

export const updateResultEntity = (state, entityName, newData) => 
  state
    .mergeDeep({
      entities: newData.entities,
      [entityName]: {
        pageIndex: newData.pageIndex,
        totalPages: newData.totalPages,
        result: zipObject(newData.result, newData.result.map(id => `${id}`))
      }
    });
