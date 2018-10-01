import { 
  mediaListActionTypes, 
  mediaInfoActionTypes 
} from '../constants/actionTypes';
import { mergeEntites } from '../actions/entitiesActions';
import { makeMediaListFetchAction } from '../utils/actionCreatorFactory';
import { promptError } from '../actions/globalActions';
import { getMediaListApi } from '../utils/actionUtils';
import { shouldFetchListFromApi } from '../services/apiUtils';

export const fetchListRequest = (mediaType, topic, page) => ({
  type: mediaListActionTypes.FETCH_MEDIA_LIST_REQUEST,
  payload: {
    isFetching: true,
    page
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

export const fetchListFailure = (mediaType, topic, page, error) => ({
  type: mediaListActionTypes.FETCH_MEDIA_LIST_FAILURE,
  payload: {
    page,
    isFetching: false,
    ...process.env.NODE_ENV === 'production' || { error }
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
    ...process.env.NODE_ENV === 'production' || { error }
  },
  meta: {
    mediaType
  }
});

export const fetchMediaList = (mediaType, topic, params) => async (dispatch, getState) => {
 
  const fetchApi = getMediaListApi(mediaType, topic);
  const page = params.page || 1;

  try {
    if (fetchApi === null) {
      throw new Error('The resource requested is not available.');
    }

    if (!shouldFetchListFromApi(getState(), mediaType, topic, page))
      return;

    dispatch(makeMediaListFetchAction('request', mediaType, topic)(page));
    
    const { data } = await fetchApi(params);

    dispatch(mergeEntites({
      [`${mediaType}`]: data.entities.results
    }));

    dispatch(makeMediaListFetchAction('success', mediaType, topic)(data.result));

  } catch (e) {
    dispatch(makeMediaListFetchAction('failure', mediaType, topic)(page, e));
    dispatch(promptError('Error occured during requesting of resources.'));
  }
};