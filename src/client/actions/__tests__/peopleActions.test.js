import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { api } from '../../services/apiUtils';
import MockAdapter from 'axios-mock-adapter';
import {
  peopleActionTypes as t,
  entitiesActionTypes as et 
} from '../../constants/actionTypes';  
import * as m from '../peopleActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const mockApi = new MockAdapter(api);

describe('People action creators tests', () => {
  describe('Sync actions', () => {
    it('should create an action to request peoples', () => {
      const exp1 = {
        type: t.FETCH_POPULAR_PEOPLE_REQUEST,
        payload: {}
      };
      const exp2 = {
        type: t.FETCH_PEOPLE_DETAIL_REQUEST,
        payload: {}
      };

      expect(m.fetchPopularPeopleRequest()).toEqual(exp1);
      expect(m.fetchPeopleDetailRequest()).toEqual(exp2);
    });

    it('should create an action to update result', () => {
      const result = { id: 1, title: 'Test' }; 

      const exp1 = {
        type: t.FETCH_POPULAR_PEOPLE_SUCCESS,
        payload: result
      };
      const exp2 = {
        type: t.FETCH_PEOPLE_DETAIL_SUCCESS,
        payload: result
      };

      expect(m.fetchPopularPeopleSuccess(result)).toEqual(exp1);
      expect(m.fetchPeopleDetailSuccess(result)).toEqual(exp2);
    });

    it('should create an action to update error', () => {
      const e = { message: 'Error' };
      const exp1 = {
        type: t.FETCH_POPULAR_PEOPLE_FAILURE,
        payload: {
          errorMessage: 'Error'
        }
      };
      const exp2 = {
        type: t.FETCH_PEOPLE_DETAIL_FAILURE,
        payload: {
          errorMessage: 'Error'
        }
      };

      expect(m.fetchPopularPeopleFailure(e)).toEqual(exp1);
      expect(m.fetchPeopleDetailFailure(e)).toEqual(exp2);
    });
  });

  describe('Async actions', () => {

    afterEach(() => store.clearActions());

    it('should create FETCH_POPULAR_PEOPLE_SUCCESS action when loading data has been done', async () => {
      const data = {
        entities: {
          people: { '1': { id: 1, title: 'AAA' }, '2': { id: 2, title: 'BB' } }
        },
        result: {
          page: 1,
          results: [1, 2]
        }
      };

      const expActions = [
        {
          type: t.FETCH_POPULAR_PEOPLE_REQUEST,
          payload: {}
        },
        {
          type: et.MERGE_ENTITIES,
          payload: data.entities
        },
        {
          type: t.FETCH_POPULAR_PEOPLE_SUCCESS,
          payload: data.result
        }
      ];
      
      mockApi
        .onGet('/people/popular')
        .reply(200, { ...data });

      await store.dispatch(m.fetchPopularPeople({}));
      expect(store.getActions()).toEqual(expActions);
    });

    it('should create FETCH_POPULAR_PEOPLE_FAILURE action when loading fails', async () => {
      const expActions = [
        {
          type: t.FETCH_POPULAR_PEOPLE_REQUEST,
          payload: {}
        },
        {
          type: t.FETCH_POPULAR_PEOPLE_FAILURE,
          payload: { errorMessage: 'Network Error' }
        }
      ];

      mockApi
        .onGet('/people/popular')
        .networkError();

      await store.dispatch(m.fetchPopularPeople({}));
      expect(store.getActions()).toEqual(expActions); 
    });

    it('should create FETCH_PEOPLE_DETAIL_SUCCESS action when the loading has been done', async () => {
      const data = {
        entities: {
          people: { 3: { id: 1, title: 'CCC' } }
        }, 
        result: { id: 3 }
      };

      const expActions = [
        {
          type: t.FETCH_PEOPLE_DETAIL_REQUEST,
          payload: {}
        },
        {
          type: et.MERGE_ENTITIES,
          payload: data.entities
        },
        {
          type: t.FETCH_PEOPLE_DETAIL_SUCCESS,
          payload: data.result
        }
      ];

      mockApi
        .onGet('/people/3')
        .reply(200, { ...data });

      await store.dispatch(m.fetchPeopleDetail(3));
      expect(store.getActions()).toEqual(expActions);
    });
  });
});