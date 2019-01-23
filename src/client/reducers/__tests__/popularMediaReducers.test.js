import mediaReducer from '../popularMediaReducers';
import {
  movieActionTypes as mt,
  tvActionTypes as tt,
  peopleActionTypes as pt
} from '../../constants/actionTypes';

const initialState = {
  movie: { 
    results: [1, 3, 2], 
    page: 1,
    totalPages: 10, 
    totalResults: 100 
  },
  tv: { 
    results: [3, 4, 2, 5], 
    page: 2,
    totalPages: 10, 
    totalResults: 100 
  },
  people: { 
    results: [2], 
    page: 1,
    totalPages: 10, 
    totalResults: 100 
  }
};

describe('Popular media reducers tests', () => {
  it('should return the initial state', () => {
    expect(mediaReducer(undefined, {})).toEqual({
      movie: {},
      tv: {},
      people: {}
    });
  });

  it('should add movie results in state when the loading has been done', () => {
    expect(
      mediaReducer(initialState, {
        type: mt.FETCH_POPULAR_MOVIES_SUCCESS,
        payload: {
          result: { page: 2, totalPages: 10, totalResults: 100, results: [5, 6] }
        }
      })
    ).toEqual({
      ...initialState,
      movie: {
        results: [1, 3, 2, 5, 6],
        page: 2,
        totalPages: 10,
        totalResults: 100
      }
    });
  });

  it('should add tv results in state when the loading has been done', () => {
    expect(
      mediaReducer(initialState, {
        type: tt.FETCH_POPULAR_TVS_SUCCESS,
        payload: {
          result: { page: 3, totalPages: 10, totalResults: 110, results: [5, 6] }
        }
      })
    ).toEqual({
      ...initialState,
      tv: {
        results: [3, 4, 2, 5, 6],
        page: 3,
        totalPages: 10,
        totalResults: 110
      }
    });
  });

  it('should add people results in state when the loading has been done', () => {
    expect(
      mediaReducer(initialState, {
        type: pt.FETCH_POPULAR_PEOPLE_SUCCESS,
        payload: {
          result: { page: 3, totalPages: 10, totalResults: 110, results: [5, 6] }
        }
      })
    ).toEqual({
      ...initialState,
      people: {
        results: [2, 5, 6],
        page: 3,
        totalPages: 10,
        totalResults: 110
      }
    });
  });
});