import searchReducer from '../searchReducers';
import { searchActionTypes as t } from '../../constants/actionTypes';

const initialState = {
  query: 'Something',
  active: 'multi__query__Something',
  listings: {
    'multi__query__Something': {
      results: [1, 4, 6],
      page: 1,
      totalPages: 10,
      totalResults: 100
    }
  }
};

describe('Search reducers tests', () => {
  it('should return the inital state', () => {
    expect(searchReducer(initialState, {})).toEqual(initialState);
  });

  it('should update query and active to tv__query__shows for search tv request', () => {
    expect(searchReducer(initialState, {
      type: t.SEARCH_TV_REQUEST,
      payload: {
        query: 'shows'
      }
    })).toEqual({
      query: 'shows',
      active: 'tv__query__shows',
      listings: {
        'multi__query__Something': {
          results: [1, 4, 6],
          page: 1,
          totalPages: 10,
          totalResults: 100
        }
      }
    });
  });

  it('should merge results in multi__[query:Something] when the loading has been done', () => {

    const state = {
      query: 'Something',
      active: 'multi__query__Something',
      listings: {
        'multi__query__Something': {
          results: [
            { id: 4, schema: 'movie' },
            { id: 3, schema: 'tv' },
            { id: 5, schema: 'people' }
          ],
          page: 1,
          totalPages: 10,
          totalResults: 100
        }
      }
    };

    expect(searchReducer(state, {
      type: t.SEARCH_MULTI_SUCCESS,
      payload: {
        query: 'Something',
        result: { page: 2, totalPages: 10, totalResults: 200, results: [
          { id: 3, schema: 'movie' }, { id: 3, schema: 'tv' }, { id: 6, schema: 'people' }
        ] }
      }
    })).toEqual({
      query: 'Something',
      active: 'multi__query__Something',
      listings: {
        'multi__query__Something': {
          results: [
            { id: 4, schema: 'movie' },
            { id: 3, schema: 'tv' },
            { id: 5, schema: 'people' },
            { id: 3, schema: 'movie' },
            { id: 6, schema: 'people' }
          ],
          page: 2,
          totalPages: 10,
          totalResults: 200
        }
      }
    });
  });

  it('should add movie__query__Toys to state when the loading has been done', () => {
    expect(searchReducer(initialState, {
      type: t.SEARCH_MOVIE_SUCCESS,
      payload: {
        query: 'Toys',
        result: { page: 1, totalPages: 10, totalResults: 100, results: [2, 3, 5] }
      }
    })).toEqual({
      query: 'Something',
      active: 'multi__query__Something',
      listings: {
        'multi__query__Something': {
          results: [1, 4, 6],
          page: 1,
          totalPages: 10,
          totalResults: 100
        },
        'movie__query__Toys': {
          results: [2, 3, 5],
          page: 1,
          totalPages: 10,
          totalResults: 100
        }
      }
    });
  });
});