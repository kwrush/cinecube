import apiReducers from '../apiReducers';
import { movieActionTypes as mt } from '../../constants/actionTypes';

const err = new Error('Something wrong');

describe('Api reducer tests', () => {
  it('should return the initial state if the input is not an api action', () => {
    expect(apiReducers(undefined, {})).toEqual({ error:{}, fetching: {} });
  });

  it('should set fetching to ture and error to false for the request action', () => {
    expect(
      apiReducers({}, { 
        type: mt.FETCH_MOVIE_DETAIL_REQUEST
      })).toEqual({
        error: { fetchMovieDetail: { error: false, message: '', notify: false } }, 
        fetching: { fetchMovieDetail: true } 
      });

    expect(
      apiReducers({}, {
        type: mt.FETCH_POPULAR_MOVIE_REQUEST,
      })).toEqual({
        error: { fetchPopularMovie: { error: false, message: '', notify: false } },
        fetching: { fetchPopularMovie: true }
      });
  });

  it('should set fetching and error to false for the success action', () => {
    expect(
      apiReducers({}, {
        type: mt.FETCH_MOVIE_DETAIL_SUCCESS,
        payload: {}
      })).toEqual({
        error: { fetchMovieDetail: { error: false, message: '', notify: false } },
        fetching: { fetchMovieDetail: false }
      });

    expect(
      apiReducers({}, {
        type: mt.FETCH_POPULAR_MOVIE_SUCCESS,
        payload: {}
      })).toEqual({
        error: { fetchPopularMovie: { error: false, message: '', notify: false } },
        fetching: { fetchPopularMovie: false }
      });
  });

  it('should set fetching and error to false for the failure action', () => {
    expect(
      apiReducers({}, {
        type: mt.FETCH_MOVIE_DETAIL_FAIL,
        payload: err.message,
        error: err
      })).toEqual({
        error: { fetchMovieDetail: { error: true, message: 'Something wrong', notify: false } },
        fetching: { fetchMovieDetail: false }
      });

    expect(
      apiReducers({}, {
        type: mt.FETCH_POPULAR_MOVIE_FAIL,
        payload: err.message,
        error: err
      })).toEqual({
        error: { fetchPopularMovie: { error: true, message: 'Something wrong', notify: false } },
        fetching: { fetchPopularMovie: false }
      });
  });
});
