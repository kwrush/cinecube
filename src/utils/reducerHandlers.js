import zipObject from 'lodash/zipObject';

export const updateFetchStatus = (state, type, newStatus) => {
  const isFetching = typeof newStatus.isFetching === 'undefined' ? false : newStatus.isFetching;
  const updatedAt = typeof newStatus.updatedAt === 'undefined' ? null : newStatus.updatedAt 
  return state.update(`${type}`, type => type.merge({
    isFetching: isFetching,
    updatedAt: updatedAt
  }));
};

export const updateResultEntity = (state, type, newData) =>
  state
    .mergeDeep({
      entities: newData.entities,
      [`${type}`]: {
        pages: {
          [newData.page]: zipObject(newData.result, newData.result.map(id => `${id}`))
        },
        totalPages: newData.totalPages,
      }
    });

export const updateInfoEntity = (state, newData) =>
  state
    .mergeDeep({
      entities: newData.entities,
      info: {
        id: newData.result
      }
    });