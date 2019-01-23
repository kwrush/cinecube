import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { api } from '../../services/apiUtils';
import MockAdapter from 'axios-mock-adapter';
import {
  movieActionTypes as t,
  entitiesActionTypes as et 
} from '../../constants/actionTypes';  
import * as m from '../movieActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const mockApi = new MockAdapter(api);

describe('Movie action creators tests', () => {
  describe('Sync actions', () => {
    it('should create an action to request movies', () => {
      const exp1 = {
        type: t.FETCH_POPULAR_MOVIES_REQUEST,
        payload: {}
      };
      const exp2 = {
        type: t.FETCH_MOVIE_DETAIL_REQUEST,
        payload: {}
      };

      expect(m.fetchPopularMoviesRequest()).toEqual(exp1);
      expect(m.fetchMovieDetailRequest()).toEqual(exp2);
    });

    it('should create an action to update result', () => {
      const result = { id: 1, title: 'Test' }; 

      const exp1 = {
        type: t.FETCH_POPULAR_MOVIES_SUCCESS,
        payload: result
      };
      const exp2 = {
        type: t.FETCH_MOVIE_DETAIL_SUCCESS,
        payload: result
      };

      expect(m.fetchPopularMoviesSuccess(result)).toEqual(exp1);
      expect(m.fetchMovieDetailSuccess(result)).toEqual(exp2);
    });

    it('should create an action to update error', () => {
      const e = { message: 'Error' };
      const exp1 = {
        type: t.FETCH_POPULAR_MOVIES_FAILURE,
        payload: {
          errorMessage: 'Error'
        }
      };
      const exp2 = {
        type: t.FETCH_MOVIE_DETAIL_FAILURE,
        payload: {
          errorMessage: 'Error'
        }
      };

      expect(m.fetchPopularMoviesFailure(e)).toEqual(exp1);
      expect(m.fetchMovieDetailFailure(e)).toEqual(exp2);
    });
  });

  describe('Async actions', () => {

    afterEach(() => store.clearActions());

    it('should create FETCH_POPULAR_MOVIE_SUCCESS action when loading data has been done', async () => {
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
          type: t.FETCH_POPULAR_MOVIES_REQUEST,
          payload: {}
        },
        {
          type: et.MERGE_ENTITIES,
          payload: data.entities
        },
        {
          type: t.FETCH_POPULAR_MOVIES_SUCCESS,
          payload: data.result
        }
      ];
      
      mockApi
        .onGet('/movie/popular')
        .reply(200, { ...data });

      await store.dispatch(m.fetchPopularMovies({}));
      expect(store.getActions()).toEqual(expActions);
    });

    it('should create FETCH_POPULAR_MOVIE_FAILURE action when loading fails', async () => {
      const expActions = [
        {
          type: t.FETCH_POPULAR_MOVIES_REQUEST,
          payload: {}
        },
        {
          type: t.FETCH_POPULAR_MOVIES_FAILURE,
          payload: { errorMessage: 'Network Error' }
        }
      ];

      mockApi
        .onGet('/movie/popular')
        .networkError();

      await store.dispatch(m.fetchPopularMovies({}));
      expect(store.getActions()).toEqual(expActions); 
    });

    it('should create FETCH_MOVIE_DETAIL_SUCCESS action when the loading has been done', async () => {
      const data = {
        entities: {
          movie: { 3: { id: 1, title: 'CCC' } }
        }, 
        result: { id: 3 }
      };

      const expActions = [
        {
          type: t.FETCH_MOVIE_DETAIL_REQUEST,
          payload: {}
        },
        {
          type: et.MERGE_ENTITIES,
          payload: data.entities
        },
        {
          type: t.FETCH_MOVIE_DETAIL_SUCCESS,
          payload: data.result
        }
      ];

      mockApi
        .onGet('/movie/3')
        .reply(200, { ...data });

      await store.dispatch(m.fetchMovieDetail(3));
      expect(store.getActions()).toEqual(expActions);
    });
  });
});