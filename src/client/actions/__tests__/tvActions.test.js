import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import tk from 'timekeeper';
import { entitiesActionTypes as et, tvActionTypes as t } from '../../constants/actionTypes';
import { api } from '../../services/apiUtils';
import { getTimeStamp } from '../../utils/helpers';
import * as ta from '../tvActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const mockApi = new MockAdapter(api);

const createActionData = type => {
  const data = {
    entities: {
      tv: { '1': { id: 1, name: 'AAA' }, '2': { id: 2, name: 'BB' } }
    },
    result: {
      page: 1,
      results: [1, 2]
    }
  };

  const actions = [
    { type: t[`FETCH_${type.toUpperCase()}_TV_REQUEST`] },
    { type: et.MERGE_ENTITIES, payload: data.entities },
    {
      type: t[`FETCH_${type.toUpperCase()}_TV_SUCCESS`],
      payload: data.result,
      lastUpdated: getTimeStamp()
    }
  ];

  return { data, actions };
};

const netError = new Error('Network Error');
const failActions = type => ([
  { type: t[`FETCH_${type.toUpperCase()}_TV_REQUEST`] },
  {
    type: t[`FETCH_${type.toUpperCase()}_TV_FAIL`],
    payload: netError.message,
    error: netError
  }
]);



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
        lastUpdated: getTimeStamp()
      });

      const detailAction = {
        type: t.FETCH_TV_DETAIL_SUCCESS,
        payload: result,
        lastUpdated: getTimeStamp()
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
      const e = new Error('Error');
      const listAction = entry => ({
        type: t[`FETCH_${entry.toUpperCase()}_FAIL`],
        payload: e.message,
        error: e
      });

      const detailAction = {
        type: t.FETCH_TV_DETAIL_FAIL,
        payload: e.message,
        error: e
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
      const { data, actions } = createActionData('popular');
      mockApi
        .onGet('/tv/popular')
        .reply(200, { ...data });

      await store.dispatch(ta.fetchPopularTvs());
      expect(store.getActions()).toEqual(actions);
    });

    it('should create FETCH_ONAIR_TV_SUCCESS action when loading data has been done', async () => {
      const { data, actions } = createActionData('onair');
      mockApi
        .onGet('/tv/on-air')
        .reply(200, { ...data });

      await store.dispatch(ta.fetchOnAirTvs());
      expect(store.getActions()).toEqual(actions);
    });

    it('should create FETCH_TOPRATED_TV_SUCCESS action when loading data has been done', async () => {
      const { data, actions } = createActionData('toprated');
      mockApi
        .onGet('/tv/top-rated')
        .reply(200, { ...data });

      await store.dispatch(ta.fetchTopRatedTvs());
      expect(store.getActions()).toEqual(actions);
    });

    it('should create FETCH_POPULAR_TV_FAIL action when loading fails', async () => {
      mockApi
        .onGet('/tv/popular')
        .networkError();

      await store.dispatch(ta.fetchPopularTvs());
      expect(store.getActions()).toEqual(failActions('popular')); 
    });

    it('should create FETCH_ONAIR_TV_FAIL action when loading fails', async () => {
      mockApi
        .onGet('/tv/on-air')
        .networkError();

      await store.dispatch(ta.fetchOnAirTvs());
      expect(store.getActions()).toEqual(failActions('onair')); 
    });

    it('should create FETCH_TOPRATED_TV_FAIL action when loading fails', async () => {
      mockApi
        .onGet('/tv/top-rated')
        .networkError();

      await store.dispatch(ta.fetchTopRatedTvs());
      expect(store.getActions()).toEqual(failActions('toprated')); 
    });

    it('should create FETCH_TV_DETAIL_SUCCESS action when the loading has been done', async () => {
      const data = {
        entities: {
          tv: { 3: { id: 1, title: 'CCC' } }
        }, 
        result: { id: 3 }
      };

      const expActions = [
        { type: t.FETCH_TV_DETAIL_REQUEST },
        {
          type: et.MERGE_ENTITIES,
          payload: data.entities
        },
        {
          type: t.FETCH_TV_DETAIL_SUCCESS,
          payload: data.result,
          lastUpdated: getTimeStamp()
        }
      ];

      mockApi
        .onGet('/tv/3')
        .reply(200, { ...data });

      await store.dispatch(ta.fetchTvDetail(3));
      expect(store.getActions()).toEqual(expActions);
    });

    it('should create FETCH_TV_DETAIL_SUCCESS action when the loading has been done', async () => {
      const e = new Error('Network Error');
      const expActions = [
        { type: t.FETCH_TV_DETAIL_REQUEST },
        {
          type: t.FETCH_TV_DETAIL_FAIL,
          payload: e.message,
          error: e
        }
      ];

      mockApi
        .onGet('/tv/3')
        .networkError();

      await store.dispatch(ta.fetchTvDetail(3));
      expect(store.getActions()).toEqual(expActions);
    });
  });
});