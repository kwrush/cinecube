import { getPopularMovies, getMovieDetail } from '../movieSelectors';

describe('Movie selectors tests', () => {

  const state = {
    entities: {
      movie: { 1: { id: 1, 'title': 'A' }, 2: { id: 2, 'title': 'B' } }
    },
    movie: {
      popular: {items: [1, 2]},
      info: { target: 2 }
    }
  };

  it('should get popular movies correctly', () => {
    expect(getPopularMovies(state)).toEqual([{ id: 1, 'title': 'A' }, { id: 2, 'title': 'B' }]);
  });

  it('should get detail of movie#2', () => {
    expect(getMovieDetail(state)).toEqual({ id:2, 'title': 'B' });
  })
});