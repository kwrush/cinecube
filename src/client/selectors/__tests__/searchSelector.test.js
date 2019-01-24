import * as searchSel from '../searchSelectors';

const state = {
  entities: {
    movie: {
      1: { id: 1, title: 'AA' },
      2: { id: 2, title: 'BB' },
      4: { id: 4, title: 'CC' }
    },
    tv: {
      1: { id: 1, name: 'DD' },
      2: { id: 2, name: 'EE' }
    }
  },
  search: {
    forMulti: {
      results: [
        { id: 1, schema: 'movie' },
        { id: 2, schema: 'tv' }
      ]
    },
    forMovie: {
      results: [1, 4]
    },
    forTv: {
      results: [2, 1]
    }
  }
};

describe('Search selectors tests', () => {
  it('should get search multi results', () => {
    const multi = searchSel.getMediaResults('multi')(state);
    expect(multi).toEqual([
      { id: 1, title: 'AA' },
      { id: 2, name: 'EE' }
    ]);
  });

  it('should get movie and tv search results', () => {
    const movies = searchSel.getMediaResults('movie')(state);
    const tvs = searchSel.getMediaResults('tv')(state);
    const people = searchSel.getMediaResults('people')(state);

    expect(movies).toEqual([
      { id: 1, title: 'AA' },
      { id: 4, title: 'CC' }
    ]);
    expect(tvs).toEqual([
      { id: 2, name: 'EE' },
      { id: 1, name: 'DD' }
    ]);
    expect(people).toBeUndefined();
  });
});