import * as sel from '../mediaSelectors';
import tk from 'timekeeper';
import { getTimeStamp } from '../../utils/helpers';

const initState = () => ({
  entities: {
    movie: { 
      1: { id: 1, title: 'AA', mediaType: 'movie' }, 
      2: { id: 2, title: 'BB', mediaType: 'movie' }, 
      3: { id: 3, title: 'CC', mediaType: 'movie' }
    },
    tv: { 
      2: { id: 2, name: 'CC', mediaType: 'tv' }, 
      3: { id: 3, name: 'DD', mediaType: 'tv' }, 
      4: { id: 4, name: 'EE', mediaType: 'tv' }
    },
    people: { 
      2: { id: 2, name: 'BB', mediaType: 'people' }, 
      3: { id: 3, name: 'CC', mediaType: 'people' }
    }
  },
  mediaListings: {
    popularMovie: {
      results: [2, 3],
      page: 1,
      totalPages: 10,
      lastUpdated: getTimeStamp() - 5000
    },
    upcomingMovie: {
      results: [1, 3],
      page: 1,
      totalPages: 10,
      lastUpdated: getTimeStamp() - 3000
    },
    nowplayingMovie: {
      results: [3],
      page: 1,
      totalPages: 10,
      lastUpdated: getTimeStamp() - 4000
    },
    topratedMovie: {
      results: [2],
      page: 1,
      totalPages: 10,
      lastUpdated: getTimeStamp() - 2000
    },
    topratedTv: {
      results: [2, 3],
      page: 1,
      totalPages: 10,
      lastUpdated: getTimeStamp() - 2000
    },
    onairTv: {
      results: [2, 3],
      page: 10,
      totalPages: 10,
      lastUpdated: getTimeStamp() - 1000
    },
    trendingMovie: {
      results: [1],
      lastUpdated: getTimeStamp() - 2000
    },
    trendingTv: {
      results: [2, 4],
      lastUpdated: getTimeStamp() - 2000
    },
    trendingPeople: {
      results: [3],
      lastUpdated: getTimeStamp() - 2000
    },
    popularPeople: {
      results: [2],
      page: 1,
      totalPages: 10,
      lastUpdated: getTimeStamp()
    }
  },
  mediaInfo: {
    active: { 'movie__2': getTimeStamp() - 4000 },
    items: {
      'movie__2': getTimeStamp() - 4000,
      'tv__3': getTimeStamp() - 1000,
      'people__3': getTimeStamp() - 2000
    }
  },
  trending: {
    results: [
      { id: 2, schema: 'movie' },
      { id: 2, schema: 'tv' }
    ],
    lastUpdated: getTimeStamp() - 2000
  }
});

describe('Media selectors tests', () => {
  let time = new Date();

  beforeEach(() => {
    tk.freeze(time);
  });

  afterEach(() => {
    tk.reset();
  });

  it('should get popular media contents', () => {
    const state = initState();

    const movies = sel.getPopularMedia('movie')(state);
    const tvs = sel.getPopularMedia('tv')(state);
    const people = sel.getPopularMedia('people')(state);

    expect(movies).toEqual([
      { id: 2, title: 'BB', mediaType: 'movie' }, 
      { id: 3, title: 'CC', mediaType: 'movie' }
    ]);
    expect(tvs).toBeUndefined();
    expect(people).toEqual([{ id: 2, name: 'BB', mediaType: 'people' }]);
  });

  it('should get trending media', () => {
    const state = initState();

    const movies = sel.getTrendingMedia('movie')(state);
    const tvs = sel.getTrendingMedia('tv')(state);
    const people = sel.getTrendingMedia('people')(state);

    expect(movies).toEqual([{ id: 1, title: 'AA', mediaType: 'movie' }]);
    expect(tvs).toEqual([
      { id: 2, name: 'CC', mediaType: 'tv' }, 
      { id: 4, name: 'EE', mediaType: 'tv' }
    ]);
    expect(people).toEqual([{ id: 3, name: 'CC', mediaType: 'people' }]);
  });

  it('should get top rated media', () => {
    const state = initState();

    const movies = sel.getTopRatedMedia('movie')(state);
    const tvs = sel.getTopRatedMedia('tv')(state);

    expect(movies).toEqual([{ id: 2, title: 'BB', mediaType: 'movie' }]);
    expect(tvs).toEqual([
      { id: 2, name: 'CC', mediaType: 'tv' }, 
      { id: 3, name: 'DD', mediaType: 'tv' }
    ]);
  });

  it('should get upcoming movies', () => {
    const state = initState();
    const movies = sel.getUpcomingMovie(state);
    expect(movies).toEqual([
      { id: 1, title: 'AA', mediaType: 'movie' }, 
      { id: 3, title: 'CC', mediaType: 'movie' }
    ]);
  });

  it('should get now playing movies', () => {
    const state = initState();
    const movies = sel.getNowPlayingMovie(state);
    expect(movies).toEqual([{ id: 3, title: 'CC', mediaType: 'movie' }]);
  });

  it('should get the active movie detail', () => {
    const state = initState();
    const info = sel.getMediaDetail('movie')(state);
    expect(info).toEqual({ id: 2, title: 'BB', mediaType: 'movie' });
  });

  it('should have more popular movies to load', () => {
    const state = initState();
    const res = sel.hasMoreResults('popular', 'movie')(state);
    expect(res).toBeTruthy();
  });

  it('should has no more on air tv to load', () => {
    const state = initState();
    const res = sel.hasMoreResults('onair', 'tv')(state);
    expect(res).toBeFalsy();
  });

  it('should get updated time of popular movie', () => {
    const state = initState();
    expect(sel.getMediaListUpdatedTime('popular', 'movie')(state))
      .toBe(getTimeStamp() - 5000);
  });

  it('should get updated time of detail for tv_3', () => {
    const state = initState();
    expect(sel.getMediaInfoUpdatedTime('tv', 3)(state))
      .toBe(getTimeStamp() - 1000);
  });

  it('should throw an error when giving the wrong media type', () => {
    const fn = () => {
      sel.getTopRatedMedia('people')({})
    };
    expect(fn)
      .toThrowError(new Error('Invalid media type people for entity toprated'));
  });

  it('should get trending media', () => {
    const state = initState();
    expect(sel.getTrendingAll(state))
      .toEqual([
        { id: 2, title: 'BB', mediaType: 'movie' }, 
        { id: 2, name: 'CC', mediaType: 'tv' }, 
      ]);
  });

  it('should get updated time of trending media', () => {
    const state = initState();
    expect(sel.getTrendingAllUpdatedTime(state))
      .toEqual(getTimeStamp() - 2000);
  });
});