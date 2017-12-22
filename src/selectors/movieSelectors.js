import { createSelector } from 'reselect';
import { descendComparator } from 'utils/helpers';

export const getMovieOverviewEntity = state => state.getIn(['movie', 'entities']);
export const getPopularMovieIds = state => state.getIn(['movie', 'popular', 'result']);
export const getDiscoverMovieIds = state => state.getIn(['movie', 'discover', 'result']);
export const getTopRatedMovieIds = state => state.getIn(['movie', 'topRated', 'result']);
export const getUpcomingMovieIds = state => state.getIn(['movie', 'upcoming', 'result']);
export const getInTheatreMovieIds = state => state.getIn(['movie', 'inTheatre', 'result']);

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
