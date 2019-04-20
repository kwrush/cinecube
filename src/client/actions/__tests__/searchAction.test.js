import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import tk from 'timekeeper';
import { api } from '../../services/apiUtils';
import MockAdapter from 'axios-mock-adapter';
import {
  searchActionTypes as t,
  entitiesActionTypes as et 
} from '../../constants/actionTypes';  
import * as sa from '../searchActions';
import { getTimeStamp } from '../../utils/helpers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const mockApi = new MockAdapter(api);

describe('Search action creators tests', () => {
  describe('Sync actions', () => {
    let time = new Date();

    beforeEach(() => {
      tk.freeze(time);
    });

    afterEach(() => {
      tk.reset();
    });

    it('should create an action to request search', () => {
      const q = [
        'movie_query',
        'tv_query',
        'people_query',
        'multi_query'
      ];
      const exp1 = {
        type: t.SEARCH_MOVIE_REQUEST,
        payload: { query: q[0] }
      };
      const exp2 = {
        type: t.SEARCH_TV_REQUEST,
        payload: { query: q[1] }
      };
      const exp3 = {
        type: t.SEARCH_PEOPLE_REQUEST,
        payload: { query: q[2] }
      };
      const exp4 = {
        type: t.SEARCH_MULTI_REQUEST,
        payload: { query: q[3] }
      };

      expect(sa.searchMediaRequest('movie', q[0])).toEqual(exp1);
      expect(sa.searchMediaRequest('tv', q[1])).toEqual(exp2);
      expect(sa.searchMediaRequest('people', q[2])).toEqual(exp3);
      expect(sa.searchMediaRequest('multi', q[3])).toEqual(exp4);
    });

    it('should create an action to update result', () => {
      const result = { id: 1, title: 'Test' }; 
      const query = 'test';

      const exp1 = {
        type: t.SEARCH_MOVIE_SUCCESS,
        payload: { query, result },
        lastUpdated: getTimeStamp()
      };
      const exp2 = {
        type: t.SEARCH_TV_SUCCESS,
        payload: { query, result },
        lastUpdated: getTimeStamp()
      };
      const exp3 = {
        type: t.SEARCH_PEOPLE_SUCCESS,
        payload: { query, result },
        lastUpdated: getTimeStamp()
      };
      const exp4 = {
        type: t.SEARCH_MULTI_SUCCESS,
        payload: { query, result },
        lastUpdated: getTimeStamp()
      };

      expect(sa.searchMediaSuccess('movie', query)(result)).toEqual(exp1);
      expect(sa.searchMediaSuccess('tv', query)(result)).toEqual(exp2);
      expect(sa.searchMediaSuccess('people', query)(result)).toEqual(exp3);
      expect(sa.searchMediaSuccess('multi', query)(result)).toEqual(exp4);
    });

    it('should create an action to update error', () => {
      const e = new Error('Error');
      const exp1 = {
        type: t.SEARCH_MOVIE_FAIL,
        payload: e.message,
        error: e
      };
      const exp2 = {
        type: t.SEARCH_TV_FAIL,
        payload: e.message,
        error: e
      };
      const exp3 = {
        type: t.SEARCH_PEOPLE_FAIL,
        payload: e.message,
        error: e
      };
      const exp4 = {
        type: t.SEARCH_MULTI_FAIL,
        payload: e.message,
        error: e
      };

      expect(sa.searchMediaFail('movie')(e)).toEqual(exp1);
      expect(sa.searchMediaFail('tv')(e)).toEqual(exp2);
      expect(sa.searchMediaFail('people')(e)).toEqual(exp3);
      expect(sa.searchMediaFail('multi')(e)).toEqual(exp4);
    });
  });

  describe('Async success actions', () => {

    const createActionData = mediaType => {
      const reqAction = `SEARCH_${mediaType.toUpperCase()}_REQUEST`;
      const succAction = `SEARCH_${mediaType.toUpperCase()}_SUCCESS`;

      const data = {
        entities: {
          movie: { '1': { id: 1, title: 'AAA' }, '2': { id: 2, title: 'BB' } }
        },
        result: {
          page: 1,
          results: [1, 2]
        }
      };

      const actions = [
        {
          type: t[reqAction],
          payload: { query: 'Something' }
        },
        {
          type: et.MERGE_ENTITIES,
          payload: data.entities
        },
        {
          type: t[succAction],
          payload: {
            query: 'Something',
            result: data.result
          },
          lastUpdated: getTimeStamp()
        }
      ];

      return { data, actions };
    };

    const e = new Error('Network Error');
    const failActions = mediaType => ([
      {
        type: t[`SEARCH_${mediaType.toUpperCase()}_REQUEST`],
        payload: { query: 'Something' }
      },
      {
        type: t[`SEARCH_${mediaType.toUpperCase()}_FAIL`],
        payload: e.message,
        error: e
      }
    ]);

    let time = new Date();

    beforeEach(() => {
      tk.freeze(time);
    });

    afterEach(() => {
      tk.reset();
      store.clearActions();
    });

    it('should create SEARCH_MULTI_SUCCESS action when loading data has been done', async () => {
      const { data, actions } = createActionData('multi');

      mockApi
        .onGet('/search')
        .reply(200, { ...data });

      await store.dispatch(sa.searchByMediaType('multi', { query: 'Something' }));
      expect(store.getActions()).toEqual(actions);
    });

    it('should create SEARCH_MOVIE_SUCCESS action when loading data has been done', async () => {
      const { data, actions } = createActionData('movie');

      mockApi
        .onGet('/search/movie')
        .reply(200, { ...data });

      await store.dispatch(sa.searchByMediaType('movie', { query: 'Something' }));
      expect(store.getActions()).toEqual(actions);
    });

    it('should create SEARCH_TV_SUCCESS action when loading data has been done', async () => {
      const { data, actions } = createActionData('tv');

      mockApi
        .onGet('/search/tv')
        .reply(200, { ...data });

      await store.dispatch(sa.searchByMediaType('tv', { query: 'Something' }));
      expect(store.getActions()).toEqual(actions);
    });

    it('should create SEARCH_PEOPLE_SUCCESS action when loading data has been done', async () => {
      const { data, actions } = createActionData('people');

      mockApi
        .onGet('/search/people')
        .reply(200, { ...data });

      await store.dispatch(sa.searchByMediaType('people', { query: 'Something' }));
      expect(store.getActions()).toEqual(actions);
    });

    it('should create SEARCH_MULTI_FAIL action when loading fails', async () => {
      mockApi
        .onGet('/search')
        .networkError();

      await store.dispatch(sa.searchByMediaType('multi', { query: 'Something' }));
      expect(store.getActions()).toEqual(failActions('multi')); 
    });

    it('should create SEARCH_MOVIE_FAIL action when loading fails', async () => {
      mockApi
        .onGet('/search/movie')
        .networkError();

      await store.dispatch(sa.searchByMediaType('movie', { query: 'Something' }));
      expect(store.getActions()).toEqual(failActions('movie')); 
    });

    it('should create SEARCH_TV_FAIL action when loading fails', async () => {
      mockApi
        .onGet('/search/tv')
        .networkError();

      await store.dispatch(sa.searchByMediaType('tv', { query: 'Something' }));
      expect(store.getActions()).toEqual(failActions('tv')); 
    });

    it('should create SEARCH_PEOPLE_FAIL action when loading fails', async () => {
      mockApi
        .onGet('/search/people')
        .networkError();

      await store.dispatch(sa.searchByMediaType('people', { query: 'Something' }));
      expect(store.getActions()).toEqual(failActions('people')); 
    });
  });
});