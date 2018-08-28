export const Entities = {
  movie: {},
  tv: {},
  people: {},
  credits: {}
};

export const Listings = {
  activeKey: null,
  listsByKey: {},
  isFetching: false,
  page: null,
  totalPages: null,
  error: null,
  updatedTimeByKey: {}
};

export const MediaInfo = {
  mediaId: null,
  mediaType: null,
  isFetching: false,
  error: null,
};

export const Search = {
  query: '',
  isFetching: false,
  activeType: null,
  resultsByType: {},
  page: null,
  totalPages: null,
  error: null
};

export const initialState = {
  entities: { ...Entities },
  listings: { ...Listings },
  mediaInfo: { ...MediaInfo },
  search: { ...Search }
};