import { createSelector } from 'reselect';
import { getDataEntities, getResult } from './commonSelectors';
import { descendComparator } from 'utils/helpers';

export const getMovieOverviewEntity = state => getDataEntities(state, 'movie');
export const getPopularMovieIds = state => getResult(state, 'movie', 'popular');
export const getDiscoverMovieIds = state => getResult(state, 'movie', 'discover');
export const getTopRatedMovieIds = state => getResult(state, 'movie', 'topRated');
export const getUpcomingMovieIds = state => getResult(state, 'movie', 'upcoming');
export const getInTheatreMovieIds = state => getResult(state, 'movie', 'inTheatre');

export const getPopularMovies = createSelector(
  [ getMovieOverviewEntity, getPopularMovieIds ],
  (data, ids) => ids.map(id => data.get(id))
); 

export const getDiscoverMovies = createSelector(
  [ getMovieOverviewEntity, getDiscoverMovieIds ],
  (data, ids) => {
    return ids
    .map(id => data.get(id))
    .sortBy(
      movie => movie.get('releaseDate'),
      (d1, d2) => descendComparator(new Date(d1).getTime(), new Date(d2).getTime())
  )}
);

export const getInTheatreMovies = createSelector(
  [ getMovieOverviewEntity, getInTheatreMovieIds ],
  (data, ids) => ids
    .map(id => data.get(id))
    .sortBy(
      movie => movie.get('popularity'),
      (p1, p2) => descendComparator(p1, p2)
    )
);
