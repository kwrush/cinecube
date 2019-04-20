import listingReducer from '../mediaListReducers';
import tk from 'timekeeper';
import { merge } from 'lodash';
import * as ma from '../../actions/movieActions';
import * as ta from '../../actions/tvActions';
import * as pa from '../../actions/peopleActions';
import * as tr from '../../actions/trendingActions';
import { getTimeStamp } from '../../utils/helpers';


const initialState = {
  popularMovie: {
    results: [1, 3, 2],
    page: 1,
    totalPages: 10,
    totalResults: 100,
    lastUpdated: Date.now() - 1000
  },
  topratedMovie: {
    results: [1, 2],
    page: 1,
    totalPages: 10,
    totalResults: 100,
    lastUpdated: Date.now() - 900
  },
  upcomingMovie: {
    results: [4, 5, 6],
    page: 1,
    totalPages: 10,
    totalResults: 100,
    lastUpdated: Date.now() - 800
  },
  popularTv: {
    results: [1, 3, 2],
    page: 1,
    totalPages: 10,
    totalResults: 100,
    lastUpdated: Date.now() - 500
  },
  topratedTv: {
    results: [1, 2],
    page: 1,
    totalPages: 10,
    totalResults: 100,
    lastUpdated: Date.now() - 300
  },
  trendingMovie: {
    results: [1, 2],
    page: 1,
    totalPages: 10,
    totalResults: 90,
    lastUpdated: Date.now() - 200
  }
};

describe('Media listing reducers tests', () => {
  let time = new Date();

  beforeEach(() => {
    tk.freeze(time);
  });

  afterEach(() => {
    tk.reset();
  });

  it('should return initial state', () => {
    expect(listingReducer(undefined, {})).toEqual({});
  });

  it('should return intial state when action is not matched', () => {
    const actions = tr.fetchTrendingAllSuccess({});
    expect(listingReducer(initialState, actions)).toEqual(initialState);
  })

  it('should update popularMovie items in state when FETCH_POPULAR_MOVIE_SUCCESS is dispatched', () => {
    const res = {
      results: [5, 6],
      page: 2,
      totalPages: 9,
      totalResults: 90,
      lastUpdated: getTimeStamp()
    };
    const action = ma.fetchPopularMoviesSuccess(res);

    expect(listingReducer(initialState, action))
      .toEqual(merge(initialState,
        {
          popularMovie: {
            results: [1, 3, 2, 5, 6],
            page: 2,
            totalPages: 9,
            totalResults: 90,
            lastUpdated: getTimeStamp()
          }
        }));
  });

  it('should update topratedMovie items in state when FETCH_TOPRATED_MOVIE_SUCCESS is dispatched', () => {
    const res = {
      results: [3, 4],
      page: 1,
      totalPages: 10,
      totalResults: 90,
      lastUpdated: getTimeStamp()
    };
    const action = ma.fetchTopRatedMoviesSuccess(res);

    expect(listingReducer(initialState, action))
      .toEqual(merge(initialState,
        {
          topratedMovie: {
            results: [3, 4],
            page: 1,
            totalPages: 10,
            totalResults: 90,
            lastUpdated: getTimeStamp()
          }
        }));
  });

  it('should update upcomingMovie items in state when FETCH_UPCOMING_MOVIE_SUCCESS is dispatched', () => {
    const res = {
      results: [3, 4],
      page: 2,
      totalPages: 10,
      totalResults: 90,
      lastUpdated: getTimeStamp()
    };
    const action = ma.fetchUpcomingMoviesSuccess(res);

    expect(listingReducer(initialState, action))
      .toEqual(merge(initialState,
        {
          upcomingMovie: {
            results: [4, 5, 6, 3],
            page: 2,
            totalPages: 10,
            totalResults: 90,
            lastUpdated: getTimeStamp()
          }
        }));
  });

  it('should add nowplayingMovie items in state when FETCH_NOWPLAYING_MOVIE_SUCCESS is dispatched', () => {
    const res = {
      results: [3, 4],
      page: 1,
      totalPages: 10,
      totalResults: 90,
      lastUpdated: getTimeStamp()
    };
    const action = ma.fetchNowPlayingMoviesSuccess(res);

    expect(listingReducer(initialState, action))
      .toEqual(merge(initialState,
        {
          nowplayingMovie: {
            results: [3, 4],
            page: 1,
            totalPages: 10,
            totalResults: 90,
            lastUpdated: getTimeStamp()
          }
        }));
  });

  it('should update popularTv items in state when FETCH_POPULAR_TV_SUCCESS is dispatched', () => {
    const res = {
      results: [1, 4],
      page: 2,
      totalPages: 10,
      totalResults: 90,
      lastUpdated: getTimeStamp()
    };
    const action = ta.fetchPopularTvsSuccess(res);

    expect(listingReducer(initialState, action))
      .toEqual(merge(initialState,
        {
          popularTv: {
            results: [1, 3, 2, 4],
            page: 2,
            totalPages: 10,
            totalResults: 90,
            lastUpdated: getTimeStamp()
          }
        }));
  });

  it('should update topratedTv items in state when FETCH_TOPRATED_TV_SUCCESS is dispatched', () => {
    const res = {
      results: [1, 4],
      page: 1,
      totalPages: 10,
      totalResults: 90,
      lastUpdated: getTimeStamp()
    };
    const action = ta.fetchTopRatedTvsSuccess(res);

    expect(listingReducer(initialState, action))
      .toEqual(merge(initialState,
        {
          topratedTv: {
            results: [1, 4],
            page: 1,
            totalPages: 10,
            totalResults: 90,
            lastUpdated: getTimeStamp()
          }
        }));
  });

  it('should add onairTv items in state when FETCH_ONAIR_TV_SUCCESS is dispatched', () => {
    const res = {
      results: [1, 4],
      page: 1,
      totalPages: 10,
      totalResults: 90,
      lastUpdated: getTimeStamp()
    };
    const action = ta.fetchOnAirTvsSuccess(res);

    expect(listingReducer(initialState, action))
      .toEqual(merge(initialState,
        {
          onairTv: {
            results: [1, 4],
            page: 1,
            totalPages: 10,
            totalResults: 90,
            lastUpdated: getTimeStamp()
          }
        }));
  });

  it('should add popularPeople items in state when FETCH_POPULAR_PEOPLE_SUCCESS is dispatched', () => {
    const res = {
      results: [1, 2],
      page: 1,
      totalPages: 10,
      totalResults: 90,
      lastUpdated: getTimeStamp()
    };
    const action = pa.fetchPopularPeopleSuccess(res);

    expect(listingReducer(initialState, action))
      .toEqual(merge(initialState,
        {
          popularPeople: {
            results: [1, 2],
            page: 1,
            totalPages: 10,
            totalResults: 90,
            lastUpdated: getTimeStamp()
          }
        }));
  });

  it('should add popularPeople items in state when FETCH_POPULAR_PEOPLE_SUCCESS is dispatched', () => {
    const res = {
      results: [1, 2],
      page: 1,
      totalPages: 10,
      totalResults: 90,
      lastUpdated: getTimeStamp()
    };
    const action = pa.fetchPopularPeopleSuccess(res);

    expect(listingReducer(initialState, action))
      .toEqual(merge(initialState,
        {
          popularPeople: {
            results: [1, 2],
            page: 1,
            totalPages: 10,
            totalResults: 90,
            lastUpdated: getTimeStamp()
          }
        }));
  });

  it('should update trendingMovie items in state when FETCH_TREDNING_MOVIE_SUCCESS is dispatched', () => {
    const res = {
      results: [1, 2, 3],
      page: 1,
      totalPages: 10,
      totalResults: 90,
      lastUpdated: getTimeStamp()
    };
    const action = tr.fetchTrendingMoviesSuccess(res);

    expect(listingReducer(initialState, action))
      .toEqual(merge(initialState,
        {
          trendingMovie: {
            results: [1, 2, 3],
            page: 1,
            totalPages: 10,
            totalResults: 90,
            lastUpdated: getTimeStamp()
          }
        }));
  });

  it('should add trendingTv items in state when FETCH_TRENDING_TV_SUCCESS is dispatched', () => {
    const res = {
      results: [1, 2],
      page: 1,
      totalPages: 10,
      totalResults: 90,
      lastUpdated: getTimeStamp()
    };
    const action = tr.fetchTrendingTvsSuccess(res);

    expect(listingReducer(initialState, action))
      .toEqual(merge(initialState,
        {
          trendingTv: {
            results: [1, 2],
            page: 1,
            totalPages: 10,
            totalResults: 90,
            lastUpdated: getTimeStamp()
          }
        }));
  });

  it('should add trendingPeople items in state when FETCH_TRENDING_PEOPLE_SUCCESS is dispatched', () => {
    const res = {
      results: [1, 2],
      page: 1,
      totalPages: 10,
      totalResults: 90,
      lastUpdated: getTimeStamp()
    };
    const action = tr.fetchTrendingPeopleSuccess(res);

    expect(listingReducer(initialState, action))
      .toEqual(merge(initialState,
        {
          trendingPeople: {
            results: [1, 2],
            page: 1,
            totalPages: 10,
            totalResults: 90,
            lastUpdated: getTimeStamp()
          }
        }));
  });
});
