import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import tk from 'timekeeper';
import { api } from '../../services/apiUtils';
import MockAdapter from 'axios-mock-adapter';
import {
  tvActionTypes as t,
  entitiesActionTypes as et 
} from '../../constants/actionTypes';  
import * as ta from '../tvActions';
import { getTimeStamp } from '../../utils/helpers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const mockApi = new MockAdapter(api);

describe('Tv action creators tests', () => {
  describe('Sync actions', () => {

    let time = new Date();

    beforeEach(() => {
      tk.freeze(time);
    });

    afterEach(() => {
      tk.reset();
    });

    it('should create an action to request tvs', () => {
      expect(ta.fetchPopularTvsRequest).toEqual({
        type: t.FETCH_POPULAR_TV_REQUEST,
      });

      expect(ta.fetchTopRatedTvsRequest).toEqual({
        type: t.FETCH_TOPRATED_TV_REQUEST,
      });

      expect(ta.fetchOnAirTvsRequest).toEqual({
        type: t.FETCH_ONAIR_TV_REQUEST,
      });

      expect(ta.fetchTvDetailRequest).toEqual({
        type: t.FETCH_TV_DETAIL_REQUEST,
      });
    });

    it('should create an action to update result', () => {
      const result = { id: 1, title: 'Test' }; 

      const listAction = entry => ({
        type: t[`FETCH_${entry.toUpperCase()}_SUCCESS`],
        payload: result,
        timestamp: getTimeStamp()
      });

      const detailAction = {
        type: t.FETCH_TV_DETAIL_SUCCESS,
        payload: result,
        timestamp: getTimeStamp()
      };

      expect(ta
        .fetchPopularTvsSuccess(result))
        .toEqual(listAction('popular_tv'));
      expect(ta
        .fetchOnAirTvsSuccess(result))
        .toEqual(listAction('onair_tv'));
      expect(ta
        .fetchTopRatedTvsSuccess(result))
        .toEqual(listAction('toprated_tv'));
      expect(ta
        .fetchTvDetailSuccess(result))
        .toEqual(detailAction);
    });

    it('should create an action to update error', () => {
      const e = { message: 'Error' };

      const listAction = entry => ({
        type: t[`FETCH_${entry.toUpperCase()}_FAIL`],
        payload: {
          errorMessage: 'Error'
        }
      });

      const detailAction = {
        type: t.FETCH_TV_DETAIL_FAIL,
        payload: {
          errorMessage: 'Error'
        }
      };

      expect(ta
        .fetchPopularTvsFail(e))
        .toEqual(listAction('popular_tv'));
      expect(ta
        .fetchTopRatedTvsFail(e))
        .toEqual(listAction('toprated_tv'));
      expect(ta
        .fetchOnAirTvsFail(e))
        .toEqual(listAction('onair_tv'));
      expect(ta
        .fetchTvDetailFail(e))
        .toEqual(detailAction);
    });
  });

  describe('Async actions', () => {

    let time = new Date();

    beforeEach(() => {
      tk.freeze(time);
    });

    afterEach(() => {
      tk.reset();
      store.clearActions();
    });

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
          type: t.FETCH_POPULAR_TV_REQUEST
        },
        {
          type: et.MERGE_ENTITIES,
          payload: data.entities
        },
        {
          type: t.FETCH_POPULAR_TV_SUCCESS,
          payload: data.result,
          timestamp: getTimeStamp()
        }
      ];
      
      mockApi
        .onGet('/tv/popular')
        .reply(200, { ...data });

      await store.dispatch(ta.fetchPopularTvs({}));
      expect(store.getActions()).toEqual(expActions);
    });

    it('should create FETCH_POPULAR_TV_FAIL action when loading fails', async () => {
      const expActions = [
        {
          type: t.FETCH_POPULAR_TV_REQUEST,
        },
        {
          type: t.FETCH_POPULAR_TV_FAIL,
          payload: { errorMessage: 'Network Error' },
        }
      ];

      mockApi
        .onGet('/tv/popular')
        .networkError();

      await store.dispatch(ta.fetchPopularTvs({}));
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
          type: t.FETCH_TV_DETAIL_REQUEST
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

      await store.dispatch(ta.fetchTvDetail(3));
      expect(store.getActions()).toEqual(expActions);
    });
  });
});