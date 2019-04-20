import searchReducer from '../searchReducer';
import tk from 'timekeeper';
import {
  searchMediaRequest,
  searchMediaSuccess,
} from '../../actions/searchActions';
import { getTimeStamp } from '../../utils/helpers';

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
  let time = new Date();

  beforeEach(() => {
    tk.freeze(time);
  });

  afterEach(() => {
    tk.reset();
  });

  it('should return the inital state', () => {
    expect(searchReducer(initialState, {})).toEqual(initialState);
  });

  it('should update query and active to tv__query__shows for search tv request', () => {
    const query = 'shows'
    const action = searchMediaRequest('tv', query);

    expect(searchReducer(initialState, action)).toEqual({
      query,
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

  it('should merge results in multi__query__Something when the loading has been done', () => {
    const query = 'Something'
    const state = {
      query,
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
          totalResults: 100,
          lastUpdated: getTimeStamp()
        }
      }
    };

    const res = {
      page: 2, totalPages: 10, totalResults: 200, results: [
        { id: 3, schema: 'movie' },
        { id: 3, schema: 'tv' },
        { id: 6, schema: 'people' }
      ]
    };

    const action = searchMediaSuccess('multi', query)(res);

    expect(searchReducer(state, action)).toEqual({
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
          totalResults: 200,
          lastUpdated: getTimeStamp()
        }
      }
    });
  });

  it('should add movie__query__Toys to state when the loading has been done', () => {
    const res = { page: 1, totalPages: 10, totalResults: 100, results: [2, 3, 5] };
    const action = searchMediaSuccess('movie', 'Toys')(res);

    expect(searchReducer(initialState, action)).toEqual({
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
          totalResults: 100,
          lastUpdated: getTimeStamp()
        }
      }
    });
  });
});