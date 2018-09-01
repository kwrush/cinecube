import { createSelector } from "reselect";
import { getEntitiesByType, getTopicItemsByPage, getActiveInfoByType, getFetchedInfoByType } from "./commonSelectors";

const getMovies = (ids, entities) => 
  typeof ids === 'array' ? ids.map(id => entities[`${id}`]) : [];

const getMovieListByTopic = (topic) => (state, props) => 
  getTopicItemsByPage(state, 'movie', topic, typeof props === 'undefined' ? 1 : props.page );

const getMovieEntities = state => getEntitiesByType(state, 'movie');

const getPopularMovieIds = getMovieListByTopic('popular');

const getTopRatedMovieIds = getMovieListByTopic('topRated');

const getUpcomingMovieIds = getMovieListByTopic('upcoming');

const getInTheatreMovieIds = getMovieListByTopic('inTheatre');

export const getPopularMovies = createSelector(
  getPopularMovieIds,
  getMovieEntities,
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
  getActiveInfoByType,
  getFetchedInfoByType,
  getMovieEntities,
  (activeId, fetchedId, entities) => 
    typeof activeId === 'undefined' 
      ? null 
      : typeof fetchedId === 'undefined' 
        ? null 
        : fetchedId.includes(activeId)
          ? entities[`${activeId}`]
          : null
);
