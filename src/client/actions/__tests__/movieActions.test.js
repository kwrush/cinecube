import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import tk from 'timekeeper';
import { api } from '../../services/apiUtils';
import MockAdapter from 'axios-mock-adapter';
import {
  movieActionTypes as t,
  entitiesActionTypes as et 
} from '../../constants/actionTypes';  
import * as m from '../movieActions';
import { getTimeStamp } from '../../utils/helpers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const mockApi = new MockAdapter(api);


describe('Movie action creators tests', () => {
  describe('Sync actions', () => {

    let time = new Date();

    beforeEach(() => {
      tk.freeze(time);
    });

    afterEach(() => {
      tk.reset();
    });

    it('should create an action to request movies', () => {
      expect(m.fetchPopularMoviesRequest).toEqual({
        type: t.FETCH_POPULAR_MOVIE_REQUEST,
      });

      expect(m.fetchUpcomingMoviesRequest).toEqual({
        type: t.FETCH_UPCOMING_MOVIE_REQUEST,
      });

      expect(m.fetchTopRatedMoviesRequest).toEqual({
        type: t.FETCH_TOPRATED_MOVIE_REQUEST,
      });

      expect(m.fetchNowPlayingMoviesRequest).toEqual({
        type: t.FETCH_NOWPLAYING_MOVIE_REQUEST,
      });

      expect(m.fetchMovieDetailRequest).toEqual({
        type: t.FETCH_MOVIE_DETAIL_REQUEST,
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
        type: t.FETCH_MOVIE_DETAIL_SUCCESS,
        payload: result,
        timestamp: getTimeStamp()
      };

      expect(m
        .fetchPopularMoviesSuccess(result))
        .toEqual(listAction('popular_movie'));
      expect(m
        .fetchNowPlayingMoviesSuccess(result))
        .toEqual(listAction('nowplaying_movie'));
      expect(m
        .fetchTopRatedMoviesSuccess(result))
        .toEqual(listAction('toprated_movie'));
      expect(m
        .fetchUpcomingMoviesSuccess(result))
        .toEqual(listAction('upcoming_movie'));
      expect(m
        .fetchMovieDetailSuccess(result))
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
        type: t.FETCH_MOVIE_DETAIL_FAIL,
        payload: {
          errorMessage: 'Error'
        }
      };

      expect(m
        .fetchPopularMoviesFail(e))
        .toEqual(listAction('popular_movie'));
      expect(m
        .fetchNowPlayingMoviesFail(e))
        .toEqual(listAction('nowplaying_movie'));
      expect(m
        .fetchTopRatedMoviesFail(e))
        .toEqual(listAction('toprated_movie'));
      expect(m
        .fetchUpcomingMoviesFail(e))
        .toEqual(listAction('upcoming_movie'));
      expect(m
        .fetchMovieDetailFail(e))
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
          type: t.FETCH_POPULAR_MOVIE_REQUEST
        },
        {
          type: et.MERGE_ENTITIES,
          payload: data.entities
        },
        {
          type: t.FETCH_POPULAR_MOVIE_SUCCESS,
          payload: data.result,
          timestamp: getTimeStamp()
        }
      ];
      
      mockApi
        .onGet('/movie/popular')
        .reply(200, { ...data });

      await store.dispatch(m.fetchPopularMovies({}));
      expect(store.getActions()).toEqual(expActions);
    });

    it('should create FETCH_POPULAR_MOVIE_FAIL action when loading fails', async () => {
      const expActions = [
        {
          type: t.FETCH_POPULAR_MOVIE_REQUEST,
          payload: {}
        },
        {
          type: t.FETCH_POPULAR_MOVIE_FAIL,
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
          type: t.FETCH_MOVIE_DETAIL_REQUEST
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