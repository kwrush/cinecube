import { fetchListRequest, fetchListSuccess, fetchListFailure, fetchInfoRequest, fetchInfoSuccess, fetchInfoFailure } from "../fetchMediaActions";
import { mediaListActionTypes, mediaInfoActionTypes } from "../../constants/actionTypes";

describe('Tests of sync fetching actions', () => {
  it('should create fetching list actions', () => {
    const result = {
      page: 2,
      totalPages: 100,
      totalResults: 500,
      results: [1, 2, 3]
    };

    expect(fetchListRequest('movie', 'popular', 1)).toEqual({
      type:  mediaListActionTypes.FETCH_MEDIA_LIST_REQUEST,
      payload:{ isFetching: true, page: 1 },
      meta: { mediaType: 'movie', topic: 'popular' }
    });

    expect(fetchListSuccess('movie', 'popular', result)).toMatchObject({
      type: mediaListActionTypes.FETCH_MEDIA_LIST_SUCCESS,
      payload: { isFetching: false, ...result },
      meta: { mediaType: 'movie', topic: 'popular' }
    });

    expect(fetchListFailure('movie','popular', 1, 'Error')).toEqual({
      type: mediaListActionTypes.FETCH_MEDIA_LIST_FAILURE,
      payload: { isFetching: false, page: 1, error: 'Error' },
      meta: { mediaType: 'movie', topic: 'popular' }
    });
  });

  it('should create fetching info actions', () => {
    const id = 1234;

    expect(fetchInfoRequest('movie', id)).toEqual({
      type:  mediaInfoActionTypes.FETCH_MEDIA_INFO_REQUEST,
      payload:{ isFetching: true, active: id },
      meta: { mediaType: 'movie' }
    });

    expect(fetchInfoSuccess('movie', id)).toMatchObject({
      type: mediaInfoActionTypes.FETCH_MEDIA_INFO_SUCCESS,
      payload: { isFetching: false, fetched: id },
      meta: { mediaType: 'movie' }
    });

    expect(fetchInfoFailure('movie', 'Error')).toEqual({
      type: mediaInfoActionTypes.FETCH_MEDIA_INFO_FAILURE,
      payload: { isFetching: false, error: 'Error' },
      meta: { mediaType: 'movie' }
    });
  });
});