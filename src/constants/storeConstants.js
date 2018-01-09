/**
 * Store entity for the specific domain, for example
 * {
 *   pageIndex: 1
 *   totalPages: 100,
 *   isFetching: false,
 *   updatedAt: 10059593,
 *   result: { id1: 'id1', id2: 'id2' }
 * }
 */
export const resultEntity = {
  pageIndex: null,
  totalPages: null,
  isFetching: false,
  updatedAt: null,
  result: {}
};

export const infoEntity = {
  isFetching: false,
  updatedAt: null,
  id: null
};


/**
 * Data store in which entities stores data objects, e.g.
 * dataEntity = {
 *   entities: { id1: {...}, id2: {...} },
 *   discover: {
 *     ...,
 *     result: { id1: 'id1', id2: 'id2' }
 *   }
 * }
 */
export const movieEntity = {
  entities: {},
  discover: resultEntity,
  popular: resultEntity,
  upcoming: resultEntity,
  inTheatre: resultEntity,
  topRated: resultEntity,
  search: resultEntity,
  info: infoEntity
};

export const tvEntity = {
  entities: {},
  discover: resultEntity,
  popular: resultEntity,
  onAir: resultEntity,
  topRated: resultEntity,
  search: resultEntity,
  info: infoEntity
};

export const peopleEntity = {
  entities: {},
  popular: resultEntity,
  search: resultEntity,
  info: infoEntity
};