import { 
  mediaListActionTypes, 
  mediaInfoActionTypes 
} from '../constants/actionTypes';

export const fetchListRequest = (mediaType, topic, page) => ({
  type: mediaListActionTypes.FETCH_MEDIA_LIST_REQUEST,
  payload: {
    isFetching: true,
    page: page
  },
  meta: {
    mediaType,
    topic
  }
});

export const fetchInfoRequest = (mediaType, id) => ({
  type: mediaInfoActionTypes.FETCH_MEDIA_INFO_REQUEST,
  payload: {
    active: id,
    isFetching: true
  },
  meta: {
    mediaType
  }
});

export const fetchListSuccess = (mediaType, topic, result) => ({
  type: mediaListActionTypes.FETCH_MEDIA_LIST_SUCCESS,
  payload: {
    isFetching: false,
    updatedAt: Date.now(),
    ...result
  },
  meta: {
    mediaType,
    topic
  }
});

export const fetchInfoSuccess = (mediaType, id) => ({
  type: mediaInfoActionTypes.FETCH_MEDIA_INFO_SUCCESS,
  payload: {
    fetched: id,
    isFetching: false,
    updatedAt: Date.now()
  },
  meta: {
    mediaType
  }
});

export const fetchListFailure = (mediaType, topic, error) => ({
  type: mediaListActionTypes.FETCH_MEDIA_LIST_FAILURE,
  payload: {
    isFetching: false,
    ...process.env.NODE_ENV === 'production' || { error: error } 
  },
  meta: {
    mediaType,
    topic
  }
});

export const fetchInfoFailure = (mediaType, error) => ({
  type: mediaInfoActionTypes.FETCH_MEDIA_INFO_FAILURE,
  payload: {
    isFetching: false,
    ...process.env.NODE_ENV === 'production' || { error: error } 
  },
  meta: {
    mediaType
  }
});