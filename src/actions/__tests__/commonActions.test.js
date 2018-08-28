import * as commonActions from '../commonActions';
import { mergeEntites } from '../entitiesActions';

describe('Common actions tests', () => {
  
  it('should create the correct request action', () => {
    const expectedAction = {
      type: 'FETCH_MOVIE_LIST_REQUEST',
      payload: { popular: { isFetching: true } }
    };

    expect(commonActions.fetchRequest('movie', 'list', 'popular')).toEqual(expectedAction);
  });

  it('should create the correct successful action', () => {

    const result = { 
      page: 1,
      totalPages: 10,
      results: [1, 2, 3, 4],
    };

    const expectedAction = {
      type: 'FETCH_MOVIE_LIST_SUCCESS',
      payload: {
        popular: { 
          page: result.page,
          totalPages: result.totalPages,
          items: result.results,
          isFetching: false,
          error: null
        }
      }
    };

    expect(commonActions.fetchSuccess('movie', 'list', 'popular', result)).toMatchObject(expectedAction);
  });

  it('should create failed action correctly', () => {
    const expectedAction = {
      type: 'FETCH_MOVIE_LIST_FAILURE',
      payload: {
        popular: { isFetching: false, error: 'Error' }
      } 
    };

    expect(commonActions.fetchFailure('movie', 'list', 'popular', 'Error')).toEqual(expectedAction);
  });
});

describe('Entities actons tests', () => {
  it('should create entities action correctly', () => {

    const entities = {
      movie: { 1: {name: 'A'}, 2: {name: 'B'} },
      tv: { 2: {name: 'C'}, 4: {name: 'D'} }
    };

    const exectedAction = {
      type: 'MERGE_ENTITIES',
      payload: {
        ...entities
      }
    };

    expect(mergeEntites(entities)).toEqual(exectedAction);
  });
});
