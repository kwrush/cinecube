import { createSelector } from "reselect";
import { getEntityIds, getEntities, getInfoId } from "./commonSelectors";

const getMovies = (ids, entities) => ids && ids.length && ids.map(id => entities[`${id}`]);

const getMovieEntities = state => getEntities(state, 'movie');
const getPopularMovieIds = state => getEntityIds(state, 'movie', 'popular');
const getDiscoveredMovieIds = state => getEntityIds(state, 'movie', 'discover');
const getTopRatedMovieIds = state => getEntityIds(state, 'movie', 'topRated');
const getUpcomingMovieIds = state => getEntityIds(state, 'movie', 'upcoming');
const getInTheatreMovieIds = state => getEntityIds(state, 'movie', 'inTheatre');
const getMovieInfoId = state => getInfoId(state, 'movie');

export const getPopularMovies = createSelector(
  getPopularMovieIds,
  getMovieEntities,
  getMovies
);

export const getDiscoveredMovies = createSelector(
  [getDiscoveredMovieIds, getMovieEntities],
  getMovies
);

export const getTopRatedMovies = createSelector(
  getTopRatedMovieIds,
  getMovieEntities,
  getMovies
);

export const getUpcomingMovies = createSelector(
  getUpcomingMovieIds,
  getMovieEntities,
  getMovies
);

export const getInTheatreMovies = createSelector(
  getInTheatreMovieIds,
  getMovieEntities,
  getMovies
);

export const getMovieDetail = createSelector(
  getMovieInfoId,
  getMovieEntities,
  (id, entities) => entities[`${id}`]
);
