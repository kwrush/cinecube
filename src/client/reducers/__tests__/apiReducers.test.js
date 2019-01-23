import apiReducers from '../apiReducers';
import { movieActionTypes as mt } from '../../constants/actionTypes';

const err = {
  errorMessage: 'Something wrong'
};

describe('Api reducer tests', () => {
  it('should return the initial state if the input is not an api action', () => {
    expect(apiReducers(undefined, {})).toEqual({ error:{}, fetching: {} });
  });

  it('should set fetching to ture and error to false for the request action', () => {
    expect(
      apiReducers({}, { 
        type: mt.FETCH_MOVIE_DETAIL_REQUEST,
        payload: {} 
      })).toEqual({
        error: { fetchMovieDetail: { error: false, message: '' } }, 
        fetching: { fetchMovieDetail: true } 
      });

    expect(
      apiReducers({}, {
        type: mt.FETCH_POPULAR_MOVIES_REQUEST,
        payload: {}
      })).toEqual({
        error: { fetchPopularMovies: { error: false, message: '' } },
        fetching: { fetchPopularMovies: true }
      });
  });

  it('should set fetching and error to false for the success action', () => {
    expect(
      apiReducers({}, {
        type: mt.FETCH_MOVIE_DETAIL_SUCCESS,
        payload: {}
      })).toEqual({
        error: { fetchMovieDetail: { error: false, message: '' } },
        fetching: { fetchMovieDetail: false }
      });

    expect(
      apiReducers({}, {
        type: mt.FETCH_POPULAR_MOVIES_SUCCESS,
        payload: {}
      })).toEqual({
        error: { fetchPopularMovies: { error: false, message: '' } },
        fetching: { fetchPopularMovies: false }
      });
  });

  it('should set fetching and error to false for the failure action', () => {
    expect(
      apiReducers({}, {
        type: mt.FETCH_MOVIE_DETAIL_FAILURE,
        payload: err
      })).toEqual({
        error: { fetchMovieDetail: { error: true, message: 'Something wrong' } },
        fetching: { fetchMovieDetail: false }
      });

    expect(
      apiReducers({}, {
        type: mt.FETCH_POPULAR_MOVIES_FAILURE,
        payload: err
      })).toEqual({
        error: { fetchPopularMovies: { error: true, message: 'Something wrong' } },
        fetching: { fetchPopularMovies: false }
      });
  });
});
