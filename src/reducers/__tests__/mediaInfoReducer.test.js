import { mediaInfoActionTypes } from "../../constants/actionTypes";
import mediaInfo from "../mediaInfoReducer";

describe('Test of media info reducers', () => {
  it('should update state correctly on fetching request', () => {
    const action = {
      type: mediaInfoActionTypes.FETCH_MEDIA_INFO_REQUEST,
      payload: { isFetching: true, active: 1 },
      meta: { mediaType: 'movie'}
    };

    expect(mediaInfo({}, action)).toEqual({
      movie: {
        active: 1,
        isFetching: true
      }
    });
  });

  it('should update fetched id correctly on request success', () => {
    const action = {
      type: mediaInfoActionTypes.FETCH_MEDIA_INFO_SUCCESS,
      payload: { fetched: 1, isFetching: false },
      meta: { mediaType: 'movie' }
    };

    expect(mediaInfo({}, action)).toMatchObject({
      movie: {
        fetched: [1],
        isFetching: false
      }
    });
  });

  it('should push id into array of fetched ids on request success', () => {
    const state = {
      movie: { active: 2, isFetching: true, fetched: [1] }
    };

    const action = {
      type: mediaInfoActionTypes.FETCH_MEDIA_INFO_SUCCESS,
      payload: { fetched: 2, isFetching: false },
      meta: { mediaType: 'movie' }
    };

    expect(mediaInfo(state, action)).toMatchObject({
      movie: {
        active: 2,
        isFetching: false,
        fetched: [1, 2]
      }
    });
  });

  it('should set error to the state correctly', () => {
    const action = {
      type: mediaInfoActionTypes.FETCH_MEDIA_INFO_FAILURE,
      payload: { isFetching: false, error:  'Error' },
      meta: { mediaType: 'movie' }
    };

    expect(mediaInfo({}, action)).toEqual({
      movie: {
        isFetching: false,
        error: 'Error'
      }
    });
  });
});