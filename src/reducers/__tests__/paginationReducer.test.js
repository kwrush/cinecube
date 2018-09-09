import { mediaListActionTypes } from "../../constants/actionTypes";
import pagination from "../paginationReducer";

describe('Test of pagination reducers', () => {
  it('should update state correctly on fetching request', () => {
    const action = {
      type: mediaListActionTypes.FETCH_MEDIA_LIST_REQUEST,
      payload: { isFetching: true, page: 2 },
      meta: { mediaType: 'movie', topic: 'popular' }
    };

    const state = {
      movie: {
        popular: { 1: { isFetching: false, page: 1 } }
      }
    }

    expect(pagination(state, action)).toEqual({
      movie: {
        popular: { 
          1: { isFetching: false, page: 1 },
          2: { isFetching: true, page: 2 }
        }
      }
    });
  });

  it('should set response data correctly', () => {
    const state = {
      movie: {
        popular: {
          1: { isFetching: false, items: [1, 2, 3] },
          totalPages: 50
        }
      }
    };

    const action = {
      type: mediaListActionTypes.FETCH_MEDIA_LIST_SUCCESS,
      payload: {
        page: 2,
        results: [1, 2, 3, 4],
        updatedAt: 123,
        totalPages: 100,
        isFetching: false
      },
      meta: { mediaType: 'movie', topic: 'popular' }
    };

    expect(pagination(state, action)).toEqual({
      movie: {
        popular: {
          1: { isFetching: false, items: [1, 2, 3] },
          2: {
            page: 2,
            items: [1, 2, 3, 4],
            updatedAt: 123,
            isFetching: false
          },
          totalPages: 100
        }
      }
    });
  });

  it('should reduce failure action correctly', () => {
    const action = {
      type: mediaListActionTypes.FETCH_MEDIA_LIST_FAILURE,
      payload: { isFetching: false, page: 1, error:  'Error' },
      meta: { mediaType: 'movie', topic: 'popular' }
    };

    expect(pagination({}, action)).toEqual({
      movie: {
        popular: { 1: { isFetching: false, error: 'Error', page: 1 } }
      }
    });
  });
});