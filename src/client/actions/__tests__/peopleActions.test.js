import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import tk from 'timekeeper';
import { api } from '../../services/apiUtils';
import MockAdapter from 'axios-mock-adapter';
import {
  peopleActionTypes as t,
  entitiesActionTypes as et 
} from '../../constants/actionTypes';  
import * as pa from '../peopleActions';
import { getTimeStamp } from '../../utils/helpers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const mockApi = new MockAdapter(api);

describe('People action creators tests', () => {
  describe('Sync actions', () => {
    let time = new Date();

    beforeEach(() => {
      tk.freeze(time);
    });

    afterEach(() => {
      tk.reset();
    });

    it('should create an action to request peoples', () => {
      const exp1 = {
        type: t.FETCH_POPULAR_PEOPLE_REQUEST
      };
      const exp2 = {
        type: t.FETCH_PEOPLE_DETAIL_REQUEST
      };

      expect(pa.fetchPopularPeopleRequest).toEqual(exp1);
      expect(pa.fetchPeopleDetailRequest).toEqual(exp2);
    });

    it('should create an action to update result', () => {
      const result = { id: 1, name: 'Test' }; 

      const exp1 = {
        type: t.FETCH_POPULAR_PEOPLE_SUCCESS,
        payload: result,
        lastUpdated: getTimeStamp()
      };
      const exp2 = {
        type: t.FETCH_PEOPLE_DETAIL_SUCCESS,
        payload: result,
        lastUpdated: getTimeStamp()
      };

      expect(pa.fetchPopularPeopleSuccess(result)).toEqual(exp1);
      expect(pa.fetchPeopleDetailSuccess(result)).toEqual(exp2);
    });

    it('should create an action to update error', () => {
      const e = new Error('Error');
      const exp1 = {
        type: t.FETCH_POPULAR_PEOPLE_FAIL,
        payload: e.message,
        error: e
      };
      const exp2 = {
        type: t.FETCH_PEOPLE_DETAIL_FAIL,
        payload: e.message,
        error: e
      };

      expect(pa.fetchPopularPeopleFail(e)).toEqual(exp1);
      expect(pa.fetchPeopleDetailFail(e)).toEqual(exp2);
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

    it('should create FETCH_POPULAR_PEOPLE_SUCCESS action when loading data has been done', async () => {
      const data = {
        entities: {
          people: { '1': { id: 1, name: 'AAA' }, '2': { id: 2, name: 'BB' } }
        },
        result: {
          page: 1,
          results: [1, 2]
        }
      };

      const expActions = [
        { type: t.FETCH_POPULAR_PEOPLE_REQUEST },
        {
          type: et.MERGE_ENTITIES,
          payload: data.entities
        },
        {
          type: t.FETCH_POPULAR_PEOPLE_SUCCESS,
          payload: data.result,
          lastUpdated: getTimeStamp()
        }
      ];
      
      mockApi
        .onGet('/people/popular')
        .reply(200, { ...data });

      await store.dispatch(pa.fetchPopularPeople({}));
      expect(store.getActions()).toEqual(expActions);
    });

    it('should create FETCH_POPULAR_PEOPLE_FAIL action when loading fails', async () => {
      const e = new Error('Network Error');
      const expActions = [
        {
          type: t.FETCH_POPULAR_PEOPLE_REQUEST
        },
        {
          type: t.FETCH_POPULAR_PEOPLE_FAIL,
          payload: e.message,
          error: e
        }
      ];

      mockApi
        .onGet('/people/popular')
        .networkError();

      await store.dispatch(pa.fetchPopularPeople({}));
      expect(store.getActions()).toEqual(expActions); 
    });

    it('should create FETCH_PEOPLE_DETAIL_SUCCESS action when the loading has been done', async () => {
      const data = {
        entities: {
          people: { 3: { id: 3, name: 'Tom' } }
        }, 
        result: { id: 3 }
      };

      const expActions = [
        { type: t.FETCH_PEOPLE_DETAIL_REQUEST },
        {
          type: et.MERGE_ENTITIES,
          payload: data.entities
        },
        {
          type: t.FETCH_PEOPLE_DETAIL_SUCCESS,
          payload: data.result,
          lastUpdated: getTimeStamp()
        }
      ];

      mockApi
        .onGet('/people/3')
        .reply(200, { ...data });

      await store.dispatch(pa.fetchPeopleDetail(3));
      expect(store.getActions()).toEqual(expActions);
    });
  });
});