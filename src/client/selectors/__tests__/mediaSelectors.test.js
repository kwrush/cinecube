import * as sels from '../mediaSelectors';

const state = {
  entities: {
    movie: { 
      1: { id: 1, title: 'AA' }, 
      2: { id: 2, title: 'BB' }, 
      3: { id: 3, title: 'CC' }
    },
    tv: { 
      2: { id: 2, name: 'CC' }, 
      3: { id: 3, name: 'DD' }, 
      4: { id: 4, name: 'EE' }
    },
    people: { 
      2: { id: 2, name: 'BB' }, 
      3: { id: 3, name: 'CC' }
    }
  },
  popularMedia: {
    movie: {
      results: [2, 3],
      page: 1,
      totalPages: 10,
      totalResults: 50
    },
    tv: {
      results: [2, 4],
      page: 1,
      totalPages: 10,
      totalResults: 50
    },
    people: {
      results: [2, 3],
      page: 10,
      totalPages: 10,
      totalResults: 50
    }
  },
  mediaInfo: {
    active: 'movie__2',
    ids: ['tv__1', 'movie__3', 'people_3', 'movie__2', 'tv__4']
  }
};

describe('Media selectors tests', () => {
  it('should get popular media contents', () => {
    const movies = sels.getPopularMedia('movie')(state);
    const tvs = sels.getPopularMedia('tv')(state);
    const people = sels.getPopularMedia('people')(state);
    expect(movies).toEqual([
      { id: 2, title: 'BB' }, 
      { id: 3, title: 'CC' }
    ]);
    expect(tvs).toEqual([
      { id: 2, name: 'CC' }, 
      { id: 4, name: 'EE' }
    ]);
    expect(people).toEqual([
      { id: 2, name: 'BB' }, 
      { id: 3, name: 'CC' }
    ]);
  });

  it('should get the active movie detail', () => {
    const info = sels.getMediaDetail('movie')(state);
    expect(info).toEqual({ id: 2, title: 'BB' });
  });

  it('should has more popular movies to load', () => {
    const res = sels.hasMorePopularMediaResults('movie')(state);
    expect(res).toBeTruthy();
  });

  it('should has no more popular people to load', () => {
    const res = sels.hasMorePopularMediaResults('people')(state);
    expect(res).toBeFalsy();
  });
});