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
    people: {}
  },
  mediaInfo: {
    movie: { id: 1 },
    tv: { id: 3 },
    people: { id: 2 }
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
    expect(people).toBeUndefined();
  });

  it('should get media detail contents', () => {
    const movie = sels.getMediaDetail('movie')(state);
    const tv = sels.getMediaDetail('tv')(state);
    const people = sels.getMediaDetail('people')(state);
    expect(movie).toEqual({ id: 1, title: 'AA' });
    expect(tv).toEqual({ id: 3, name: 'DD' });
    expect(people).toEqual({ id: 2, name: 'BB' });
  });
});