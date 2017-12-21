/**
 * Store entity for the specific end point, for example
 * {
 *   pages: {1: { 123: '123', 456: '456' }, 2: {....}},
 *   pageCount: 100,
 *   isFetching: { 1: false, 2: true }
 * }
 */
export const pageEntity = {
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

export const movieEntity = {
  entities: {},
  discover: pageEntity,
  popular: pageEntity,
  upcoming: pageEntity,
  inTheatre: pageEntity,
  topRated: pageEntity,
  search: pageEntity,
  info: infoEntity
};

export const tvEntity = {
  entities: {},
  discover: pageEntity,
  popular: pageEntity,
  onAir: pageEntity,
  topRated: pageEntity,
  search: pageEntity,
  info: infoEntity
};

export const peopleEntity = {
  entities: {},
  popular: pageEntity,
  search: pageEntity,
  info: infoEntity
};