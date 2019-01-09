import { getEntitiesByType, getTopicItemsByPage, getActiveInfoByType, getFetchedInfoByType } from '../commonSelectors';

describe('Selectors test', () => {

  const state = {
    entities: {
      movie: { 1: { title: 'A' }, 2: { title: 'B' }, 3: { title: 'C' } },
      tv: { 1: { title: 'AA' }, 3: { title: 'BB' }, 5: { title: 'CC' } }
    },
    pagination: {
      movie: {
        popular: {
          1: { items: [1, 2], page: 1 },
          2: { items: [3], page: 2 }
        }
      },
      tv: {
        popular: {
          1: { items: [2, 3, 5], page: 1 }
        }
      }
    },
    mediaInfo: {
      movie: { active: 2, fetched: [1, 2] },
      tv: { active: 1, fetched: [1] }
    }
  };

  it('should get entities with the specified type', () => {
    expect(getEntitiesByType(state, 'movie')).toEqual(state.entities.movie);
  });

  it('should get items in the specified page', () => {
    expect(getTopicItemsByPage(state, 'movie', 'popular', 2)).toEqual(state.pagination.movie.popular['2'].items);
  });

  it('shoud get active info by type', () => {
    expect(getActiveInfoByType(state, 'movie')).toEqual(2);
    expect(getActiveInfoByType(state, 'tv')).toEqual(1);
  });

  it('should get fetched info by the specified type', () => {
    expect(getFetchedInfoByType(state, 'movie')).toEqual([1, 2]);
    expect(getFetchedInfoByType(state, 'tv')).toEqual([1]);
  })
});