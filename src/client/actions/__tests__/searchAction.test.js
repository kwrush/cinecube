import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { api } from '../../services/apiUtils';
import MockAdapter from 'axios-mock-adapter';
import {
  searchActionTypes as t,
  entitiesActionTypes as et 
} from '../../constants/actionTypes';  
import * as sa from '../searchActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const mockApi = new MockAdapter(api);

describe('Search action creators tests', () => {
  describe('Sync actions', () => {
    it('should create an action to request search', () => {
      const exp1 = {
        type: t.SEARCH_MOVIE_REQUEST,
        payload: {}
      };
      const exp2 = {
        type: t.SEARCH_TV_REQUEST,
        payload: {}
      };
      const exp3 = {
        type: t.SEARCH_PEOPLE_REQUEST,
        payload: {}
      };
      const exp4 = {
        type: t.SEARCH_MULTI_REQUEST,
        payload: {}
      };

      expect(sa.searchMediaRequest('movie')).toEqual(exp1);
      expect(sa.searchMediaRequest('tv')).toEqual(exp2);
      expect(sa.searchMediaRequest('people')).toEqual(exp3);
      expect(sa.searchMediaRequest('multi')).toEqual(exp4);
    });

    it('should create an action to update result', () => {
      const result = { id: 1, title: 'Test' }; 

      const exp1 = {
        type: t.SEARCH_MOVIE_SUCCESS,
        payload: result
      };
      const exp2 = {
        type: t.SEARCH_TV_SUCCESS,
        payload: result
      };
      const exp3 = {
        type: t.SEARCH_PEOPLE_SUCCESS,
        payload: result
      };
      const exp4 = {
        type: t.SEARCH_MULTI_SUCCESS,
        payload: result
      };

      expect(sa.searchMediaSuccess('movie', result)).toEqual(exp1);
      expect(sa.searchMediaSuccess('tv', result)).toEqual(exp2);
      expect(sa.searchMediaSuccess('people', result)).toEqual(exp3);
      expect(sa.searchMediaSuccess('multi', result)).toEqual(exp4);
    });

    it('should create an action to update error', () => {
      const e = { message: 'Error' };
      const exp1 = {
        type: t.SEARCH_MOVIE_FAILURE,
        payload: {
          errorMessage: 'Error'
        }
      };
      const exp2 = {
        type: t.SEARCH_TV_FAILURE,
        payload: {
          errorMessage: 'Error'
        }
      };
      const exp3 = {
        type: t.SEARCH_PEOPLE_FAILURE,
        payload: {
          errorMessage: 'Error'
        }
      };
      const exp4 = {
        type: t.SEARCH_MULTI_FAILURE,
        payload: {
          errorMessage: 'Error'
        }
      };

      expect(sa.searchMediaFailure('movie', e)).toEqual(exp1);
      expect(sa.searchMediaFailure('tv', e)).toEqual(exp2);
      expect(sa.searchMediaFailure('people', e)).toEqual(exp3);
      expect(sa.searchMediaFailure('multi', e)).toEqual(exp4);
    });
  });

  describe('Async actions', () => {

    afterEach(() => store.clearActions());

    it('should create SEARCH_[MEDIA_TYPE]_SUCCESS action when loading data has been done', async () => {
      const data = {
        entities: {
          movie: { '1': { id: 1, title: 'AAA' }, '2': { id: 2, title: 'BB' } }
        },
        result: {
          page: 1,
          results: [1, 2]
        }
      };

      const expActions = [
        {
          type: t.SEARCH_MOVIE_REQUEST,
          payload: {}
        },
        {
          type: et.MERGE_ENTITIES,
          payload: data.entities
        },
        {
          type: t.SEARCH_MOVIE_SUCCESS,
          payload: data.result
        }
      ];
      
      mockApi
        .onGet('/search/movie')
        .reply(200, { ...data });

      await store.dispatch(sa.searchByMediaType('movie', { query: 'Movie' }));
      expect(store.getActions()).toEqual(expActions);
    });

    it('should create SEARCH_[MEDIA_TYPE]_FAILURE action when loading fails', async () => {
      const expActions = [
        {
          type: t.SEARCH_MOVIE_REQUEST,
          payload: {}
        },
        {
          type: t.SEARCH_MOVIE_FAILURE,
          payload: { errorMessage: 'Network Error' }
        }
      ];

      mockApi
        .onGet('/search/movie')
        .networkError();

      await store.dispatch(sa.searchByMediaType('movie', { query: 'Movie' }));
      expect(store.getActions()).toEqual(expActions); 
    });
  });
});