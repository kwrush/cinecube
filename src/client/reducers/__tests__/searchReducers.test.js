import searchReducer from '../searchReducers';
import { searchActionTypes as t } from '../../constants/actionTypes';

const initialState = {
  forMulti: {
    results: [1, 2],
    page: 1,
    totalPages: 5,
    totalResults: 20
  },
  forMovie: {
    results: [1],
    page: 1,
    totalPages: 4,
    totalResults: 10
  },
  forTv: {},
  forPeople: {}
};

describe('Search reducers tests', () => {
  it('should return the inital state', () => {
    expect(searchReducer(undefined, {})).toEqual({
      forMulti: {},
      forMovie: {},
      forTv: {},
      forPeople: {}
    });
  });

  it('should update forMulti when the loading has been done', () => {
    expect(searchReducer(initialState, {
      type: t.SEARCH_MULTI_SUCCESS,
      payload: {
        result: { page: 2, totalPages: 5, totalResults: 15, results: [4, 2] }
      }
    })).toEqual({
      ...initialState,
      forMulti: {
        results: [1, 2, 4],
        page: 2,
        totalPages: 5,
        totalResults: 15
      }
    });
  });

  it('should update forMovie when the loading has been done', () => {
    expect(searchReducer(initialState, {
      type: t.SEARCH_MOVIE_SUCCESS,
      payload: {
        result: { page: 2, totalPages: 5, totalResults: 15, results: [2] }
      }
    })).toEqual({
      ...initialState,
      forMovie: {
        results: [1, 2],
        page: 2,
        totalPages: 5,
        totalResults: 15
      }
    });
  });

  it('should update forTv when the loading has been done', () => {
    expect(searchReducer(initialState, {
      type: t.SEARCH_TV_SUCCESS,
      payload: {
        result: { page: 1, totalPages: 5, totalResults: 15, results: [2, 3] }
      }
    })).toEqual({
      ...initialState,
      forTv: {
        results: [2, 3],
        page: 1,
        totalPages: 5,
        totalResults: 15
      }
    });
  });

  it('should update forPeople when the loading has been done', () => {
    expect(searchReducer(initialState, {
      type: t.SEARCH_PEOPLE_SUCCESS,
      payload: {
        result: { page: 1, totalPages: 5, totalResults: 15, results: [1, 2] }
      }
    })).toEqual({
      ...initialState,
      forPeople: {
        results: [1, 2],
        page: 1,
        totalPages: 5,
        totalResults: 15
      }
    });
  });
});