import { makeMediaListFetchAction, makeMediaInfoFetchAction } from '../actionCreatorFactory';
import { mediaListActionTypes, mediaInfoActionTypes } from '../../constants/actionTypes';

describe('Tests of action creator factory', () => {
  it('should create request action correctly', () => {
    expect(
      makeMediaListFetchAction('request', 'movie', 'popular')(2))
      .toEqual({
        type: mediaListActionTypes.FETCH_MEDIA_LIST_REQUEST,
        payload: {
          isFetching: true,
          page: 2
        },
        meta: {
          mediaType: 'movie',
          topic: 'popular'
        }
      });

    expect(
      makeMediaInfoFetchAction('request', 'movie')(33))
      .toEqual({
        type: mediaInfoActionTypes.FETCH_MEDIA_INFO_REQUEST,
        payload: {
          active: 33,
          isFetching: true
        },
        meta: {
          mediaType: 'movie'
        }
      });
  });

  it('should create fetching success action correctly', () => {

    const listRes = {
      entities: { 1: { id: 1, title: 'A' }, 2: { id: 2, title: 'B' } },
      result: {
        page: 1,
        results: [1, 2],
        totalPages: 100
      }
    };

    expect(
      makeMediaListFetchAction('success', 'movie', 'popular')(listRes))
      .toMatchObject({
        type: mediaListActionTypes.FETCH_MEDIA_LIST_SUCCESS,
        payload: {
          isFetching: false,
          ...listRes
        },
        meta: {
          mediaType: 'movie',
          topic: 'popular'
        }
      });

    expect(makeMediaInfoFetchAction('success', 'movie')(33))
      .toMatchObject({
        type: mediaInfoActionTypes.FETCH_MEDIA_INFO_SUCCESS,
        payload: {
          fetched: 33,
          isFetching: false,
        },
        meta: {
          mediaType: 'movie'
        }
      });
  });

  it('should create fetching failure action correctly', () => {
    expect(
      makeMediaListFetchAction('failure', 'movie', 'popular')(1, 'Request failed'))
      .toEqual({
        type: mediaListActionTypes.FETCH_MEDIA_LIST_FAILURE,
        payload: {
          page: 1,
          isFetching: false,
          error: 'Request failed'
        },
        meta: {
          mediaType: 'movie',
          topic: 'popular'
        }
      });

    expect(
      makeMediaInfoFetchAction('failure', 'movie')('Request failed'))
      .toEqual({
        type: mediaInfoActionTypes.FETCH_MEDIA_INFO_FAILURE,
        payload: {
          isFetching: false,
          error: 'Request failed'
        },
        meta: {
          mediaType: 'movie'
        }
      });
  });
});