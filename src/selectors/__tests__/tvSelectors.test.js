import { getPopularTvs, getTvDetail } from '../tvSelectors';

describe('Tv selectors tests', () => {

  const state = {
    entities: {
      tv: { 1: { id: 1, 'title': 'A' }, 2: { id: 2, 'title': 'B' } }
    },
    tv: {
      popular: {items: [1, 2]},
      info: { target: 1 }
    }
  };

  it('should get popular tvs correctly', () => {
    expect(getPopularTvs(state)).toEqual([{ id: 1, 'title': 'A' }, { id: 2, 'title': 'B' }]);
  });

  it('should get detail of tv#1', () => {
    expect(getTvDetail(state)).toEqual({ id:1, 'title': 'A' });
  })
});