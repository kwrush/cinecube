import {
  isFetching,
  isFetchingFailure,
  getFetchingError
} from '../apiSelectors';

const state = {
  api: {
    fetching: {
      fetchPopularMovies: false,
      etchPopularTvs: false,
      fetchPopularPeople: true,
      fetchTvDetail: false
    },
    error: {
      fetchPopularMovies: {
        error: true,
        message: 'Network Error'
      },
      fetchPopularPeople: {
        error: false
      },
      fetchPopularTvs: {
        error: false
      },
      fetchMovieDetail: {
        error: true,
        message: 'Unknown Error'
      }
    }
  }
};

describe('Api selectors tests', () => {
  it('should retrun the correct fetching status for the given actions', () => {
    expect(isFetching(['FETCH_POPULAR_MOVIES', 'FETCH_POPULAR_TVS'])(state)).toBeFalsy();
    expect(isFetching(['FETCH_TV_DETAIL'])(state)).toBeFalsy();
    expect(isFetching(['FETCH_POPULAR_TVS', 'FETCH_POPULAR_PEOPLE'])(state)).toBeTruthy();
  });

  it('should return the correct error info for the given actions', () => {
    expect(isFetchingFailure(['FETCH_POPULAR_MOVIES'])(state)).toBeTruthy();
    expect(isFetchingFailure(['FETCH_POPULAR_TVS', 'FETCH_POPULAR_MOVIES'])(state)).toBeTruthy();
    expect(isFetchingFailure('FETCH_POPULAR_PEOPLE')(state)).toBeFalsy();
  }); 

  it('should return the error message for the given actions', () => {
    expect(getFetchingError([
      'FETCH_POPULAR_MOVIES',
      'FETCH_MOVIE_DETAIL'
    ])(state)).toEqual(['Network Error', 'Unknown Error']);
  });
});