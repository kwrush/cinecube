import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import tk from 'timekeeper';
import { api } from '../../services/apiUtils';
import MockAdapter from 'axios-mock-adapter';
import {
  trendingActionTypes as t,
  entitiesActionTypes as et 
} from '../../constants/actionTypes';  
import * as ta from '../trendingActions';
import { getTimeStamp } from '../../utils/helpers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const mockApi = new MockAdapter(api);

describe('Trending action creator tests', () => {
  describe('Sync actions', () => {
    let time = new Date();

    beforeEach(() => {
      tk.freeze(time);
    });

    afterEach(() => {
      tk.reset();
    });

    it('should create a trending request action', () => {
      const actionAll = {
        type: t.FETCH_TRENDING_ALL_REQUEST
      };
      const actionMovie = {
        type: t.FETCH_TRENDING_MOVIE_REQUEST
      };
      const actionTv = {
        type: t.FETCH_TRENDING_TV_REQUEST
      };
      const actionPeople = {
        type: t.FETCH_TRENDING_PEOPLE_REQUEST
      };

      expect(ta.fetchTrendingAllRequest).toEqual(actionAll);
      expect(ta.fetchTrendingMoviesRequest).toEqual(actionMovie);
      expect(ta.fetchTrendingTvsRequest).toEqual(actionTv);
      expect(ta.fetchTrendingPeopleRequest).toEqual(actionPeople);
    });

    it('should create a trending success action', () => {
      const result = { results: [1, 2, 3] };
      const actionAll = {
        type: t.FETCH_TRENDING_ALL_SUCCESS,
        payload: result,
        lastUpdated: getTimeStamp()
      };
      const actionMovie = {
        type: t.FETCH_TRENDING_MOVIE_SUCCESS,
        payload: result,
        lastUpdated: getTimeStamp()
      };
      const actionTv = {
        type: t.FETCH_TRENDING_TV_SUCCESS,
        payload: result,
        lastUpdated: getTimeStamp()
      };
      const actionPeople = {
        type: t.FETCH_TRENDING_PEOPLE_SUCCESS,
        payload: result,
        lastUpdated: getTimeStamp()
      };

      expect(ta.fetchTrendingAllSuccess(result)).toEqual(actionAll);
      expect(ta.fetchTrendingMoviesSuccess(result)).toEqual(actionMovie);
      expect(ta.fetchTrendingTvsSuccess(result)).toEqual(actionTv);
      expect(ta.fetchTrendingPeopleSuccess(result)).toEqual(actionPeople);
    });
    
    it('should create a trending fail action', () => {
      const e = new Error('Error');

      const actionAll = {
        type: t.FETCH_TRENDING_ALL_FAIL,
        payload: e.message,
        error: e
      };
      const actionMovie = {
        type: t.FETCH_TRENDING_MOVIE_FAIL,
        payload: e.message,
        error: e
      };
      const actionTv = {
        type: t.FETCH_TRENDING_TV_FAIL,
        payload: e.message,
        error: e
      };
      const actionPeople = {
        type: t.FETCH_TRENDING_PEOPLE_FAIL,
        payload: e.message,
        error: e
      };

      expect(ta.fetchTrendingAllFail(e)).toEqual(actionAll);
      expect(ta.fetchTrendingMoviesFail(e)).toEqual(actionMovie);
      expect(ta.fetchTrendingTvsFail(e)).toEqual(actionTv);
      expect(ta.fetchTrendingPeopleFail(e)).toEqual(actionPeople);
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

    const createActionData = type => {
      const reqAction = `FETCH_TRENDING_${type.toUpperCase()}_REQUEST`;
      const succAction = `FETCH_TRENDING_${type.toUpperCase()}_SUCCESS`;
      const data = {
        entities: { '1': { id: 1, title: 'Movie' } },
        result: { results: [1] }
      };

      const actions = [
        { type: t[reqAction] },
        { type: et.MERGE_ENTITIES, payload: data.entities },
        { 
          type: t[succAction],
          payload: data.result,
          lastUpdated: getTimeStamp()
        }
      ];

      return { data, actions };
    };

    const e = new Error('Network Error');
    const failActions = type => ([
      {
        type: t[`FETCH_TRENDING_${type.toUpperCase()}_REQUEST`]
      },
      {
        type: t[`FETCH_TRENDING_${type.toUpperCase()}_FAIL`],
        payload: e.message,
        error: e
      }
    ]);

    it('should create FETCH_TRENDING_ALL action when loading data has been done', async () => {
      const { data, actions } = createActionData('all');
      mockApi.onGet('/trending').reply(200, { ...data });

      await store.dispatch(ta.fetchTrendingAll());
      expect(store.getActions()).toEqual(actions);
    });

    it('should create FETCH_TRENDING_MOVIE action when loading data has been done', async () => {
      const { data, actions } = createActionData('movie');
      mockApi.onGet('/trending/movie').reply(200, { ...data });

      await store.dispatch(ta.fetchTrendingMovies());
      expect(store.getActions()).toEqual(actions);
    });

    it('should create FETCH_TRENDING_TV action when loading data has been done', async () => {
      const { data, actions } = createActionData('tv');
      mockApi.onGet('/trending/tv').reply(200, { ...data });

      await store.dispatch(ta.fetchTrendingTvs());
      expect(store.getActions()).toEqual(actions);
    });

    it('should create FETCH_TRENDING_PEOPLE action when loading data has been done', async () => {
      const { data, actions } = createActionData('people');
      mockApi.onGet('/trending/people').reply(200, { ...data });

      await store.dispatch(ta.fetchTrendingPeople());
      expect(store.getActions()).toEqual(actions);
    });

    it('should create FETCH_TREDNING_ALL_FAIL when loading fails', async () => {
      mockApi.onGet('/trending').networkError();
      await store.dispatch(ta.fetchTrendingAll());
      expect(store.getActions()).toEqual(failActions('all'));
    });

    it('should create FETCH_TREDNING_MOVIE_FAIL when loading fails', async () => {
      mockApi.onGet('/trending/movie').networkError();
      await store.dispatch(ta.fetchTrendingMovies());
      expect(store.getActions()).toEqual(failActions('movie'));
    });

    it('should create FETCH_TREDNING_TV_FAIL when loading fails', async () => {
      mockApi.onGet('/trending/tv').networkError();
      await store.dispatch(ta.fetchTrendingTvs());
      expect(store.getActions()).toEqual(failActions('tv'));
    });

    it('should create FETCH_TREDNING_PEOPLE_FAIL when loading fails', async () => {
      mockApi.onGet('/trending/people').networkError();
      await store.dispatch(ta.fetchTrendingPeople());
      expect(store.getActions()).toEqual(failActions('people'));
    });
  });
});

