import * as searchSel from '../searchSelectors';

const state = {
  entities: {
    movie: {
      1: { id: 1, title: 'AA' },
      2: { id: 2, title: 'BB' },
      4: { id: 4, title: 'CC' },
      5: { id: 5, title: 'DD' }
    },
    tv: {
      1: { id: 1, name: 'DD' },
      2: { id: 2, name: 'EE' },
      5: { id: 5, name: 'FF' },
      8: { id: 8, name: 'GG'}
    }
  },
  search: {
    query: 'Something',
    acitve: 'multi__query__Something',
    listings: {
      'multi__query__Something': {
        results: [
          { id: 2, schema: 'movie' },
          { id: 1, schema: 'tv' },
          { id: 5, schema: 'movie' }
        ],
        page: 1,
        totalPages: 5,
        totalResults: 10
      },
      'tv__query__Other': {
        results: [1, 5, 8],
        page: 1,
        totalPages: 5,
        totalResults: 10
      }
    }
  }
};

describe('Search selectors tests', () => {

  it('should have more results to load of tv_[query:Other]', () => {
    expect(searchSel.hasMoreSearchResults('tv', 'Other')(state)).toBeTruthy();
  });

  it('should return search results of tv[query:Other]', () => {
    const res = searchSel.getSearchResults('tv', 'Other')(state);
    expect(res).toEqual([1, 5, 8]);
  });

  it('should return search results of multi[query:Something]', () => {
    const res = searchSel.getSearchResults('multi', 'Something')(state);
    expect(res).toEqual([
      { id: 2, schema: 'movie' },
      { id: 1, schema: 'tv' },
      { id: 5, schema: 'movie' }
    ]);
  });

  it('should return media entities by the results of multi[query:Something]', () => {
    const res = searchSel.getSearchMedia('multi', 'Something')(state);
    expect(res).toEqual([
      { id: 2, title: 'BB' },
      { id: 1, name: 'DD' },
      { id: 5, title: 'DD' }
    ]);
  });
});