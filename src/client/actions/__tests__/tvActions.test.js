import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { api } from '../../services/apiUtils';
import MockAdapter from 'axios-mock-adapter';
import {
  tvActionTypes as t,
  entitiesActionTypes as et 
} from '../../constants/actionTypes';  
import * as m from '../tvActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const mockApi = new MockAdapter(api);

describe('Tv action creators tests', () => {
  describe('Sync actions', () => {
    it('should create an action to request tvs', () => {
      const exp1 = {
        type: t.FETCH_POPULAR_TVS_REQUEST,
        payload: {}
      };
      const exp2 = {
        type: t.FETCH_TV_DETAIL_REQUEST,
        payload: {}
      };

      expect(m.fetchPopularTvsRequest()).toEqual(exp1);
      expect(m.fetchTvDetailRequest()).toEqual(exp2);
    });

    it('should create an action to update result', () => {
      const result = { id: 1, title: 'Test' }; 

      const exp1 = {
        type: t.FETCH_POPULAR_TVS_SUCCESS,
        payload: result
      };
      const exp2 = {
        type: t.FETCH_TV_DETAIL_SUCCESS,
        payload: result
      };

      expect(m.fetchPopularTvsSuccess(result)).toEqual(exp1);
      expect(m.fetchTvDetailSuccess(result)).toEqual(exp2);
    });

    it('should create an action to update error', () => {
      const e = { message: 'Error' };
      const exp1 = {
        type: t.FETCH_POPULAR_TVS_FAILURE,
        payload: {
          errorMessage: 'Error'
        }
      };
      const exp2 = {
        type: t.FETCH_TV_DETAIL_FAILURE,
        payload: {
          errorMessage: 'Error'
        }
      };

      expect(m.fetchPopularTvsFailure(e)).toEqual(exp1);
      expect(m.fetchTvDetailFailure(e)).toEqual(exp2);
    });
  });

  describe('Async actions', () => {

    afterEach(() => store.clearActions());

    it('should create FETCH_POPULAR_TV_SUCCESS action when loading data has been done', async () => {
      const data = {
        entities: {
          tv: { '1': { id: 1, title: 'AAA' }, '2': { id: 2, title: 'BB' } }
        },
        result: {
          page: 1,
          results: [1, 2]
        }
      };

      const expActions = [
        {
          type: t.FETCH_POPULAR_TVS_REQUEST,
          payload: {}
        },
        {
          type: et.MERGE_ENTITIES,
          payload: data.entities
        },
        {
          type: t.FETCH_POPULAR_TVS_SUCCESS,
          payload: data.result
        }
      ];
      
      mockApi
        .onGet('/tv/popular')
        .reply(200, { ...data });

      await store.dispatch(m.fetchPopularTvs({}));
      expect(store.getActions()).toEqual(expActions);
    });

    it('should create FETCH_POPULAR_TV_FAILURE action when loading fails', async () => {
      const expActions = [
        {
          type: t.FETCH_POPULAR_TVS_REQUEST,
          payload: {}
        },
        {
          type: t.FETCH_POPULAR_TVS_FAILURE,
          payload: { errorMessage: 'Network Error' }
        }
      ];

      mockApi
        .onGet('/tv/popular')
        .networkError();

      await store.dispatch(m.fetchPopularTvs({}));
      expect(store.getActions()).toEqual(expActions); 
    });

    it('should create FETCH_TV_DETAIL_SUCCESS action when the loading has been done', async () => {
      const data = {
        entities: {
          tv: { 3: { id: 1, title: 'CCC' } }
        }, 
        result: { id: 3 }
      };

      const expActions = [
        {
          type: t.FETCH_TV_DETAIL_REQUEST,
          payload: {}
        },
        {
          type: et.MERGE_ENTITIES,
          payload: data.entities
        },
        {
          type: t.FETCH_TV_DETAIL_SUCCESS,
          payload: data.result
        }
      ];

      mockApi
        .onGet('/tv/3')
        .reply(200, { ...data });

      await store.dispatch(m.fetchTvDetail(3));
      expect(store.getActions()).toEqual(expActions);
    });
  });
});