import { getPopularMovies, getMovieDetail, getUpcomingMovies } from '../movieSelectors';

describe('Movie selectors tests', () => {

  const state = {
    entities: {
      movie: { 1: { title: 'A' }, 2: { title: 'B' }, 3: { title: 'C' } },
    },
    pagination: {
      movie: {
        popular: {
          1: { items: [1, 2], page: 1 }
        },
        upcoming: {
          1: { items: [3], page: 1 }
        }
      }
    },
    mediaInfo: {
      movie: { active: 2, fetched: [1, 2] }
    }
  };

  it('should get popular movies from state', () => {
    expect(getPopularMovies(state)).toEqual(
      [{ mediaType: 'movie', title: 'A' }, { mediaType: 'movie', title: 'B' }]);
  });

  it('should get upcoming movies from state', () =>  {
    expect(getUpcomingMovies(state)).toEqual([{ mediaType: 'movie', title: 'C' }]);
  });

  it('should get detail of movie#2', () => {
    expect(getMovieDetail(state)).toEqual({ title: 'B' });
  });
});