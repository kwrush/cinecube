import { 
  getPopularTvs,
  getTopRatedTvs,
  getTvDetail
 } from '../tvSelectors';

describe('Tv selectors tests', () => {

  const state = {
    entities: {
      tv: { 1: { title: 'A' }, 2: { title: 'B' }, 3: { title: 'C' } },
    },
    pagination: {
      tv: {
        popular: {
          1: { items: [1, 2], page: 1 }
        },
        topRated: {
          1: { items: [3], page: 1 }
        }
      }
    },
    mediaInfo: {
      tv: { active: 2, fetched: [1, 2] }
    }
  };

  it('should get popular tvs from state', () => {
    expect(getPopularTvs(state)).toEqual(
      [{ mediaType: 'tv', title: 'A' }, { mediaType: 'tv', title: 'B' }]);
  });

  it('should get top rated tvs from state', () =>  {
    expect(getTopRatedTvs(state)).toEqual([{ mediaType: 'tv', title: 'C' }]);
  });

  it('should get detail of movie#2', () => {
    expect(getTvDetail(state)).toEqual({ title: 'B' });
  })
});