import { createSelector } from "reselect";
import { 
  getEntitiesByType, 
  getTopicItemsByPage, 
  getActiveInfoByType, 
  getFetchedInfoByType 
} from "./commonSelectors";

const getMovies = (ids, entities) => 
  Array.isArray(ids) ? ids.map(id => ({ ...entities[`${id}`], ...{ mediaType: 'movie' } })) : [];

const getMovieListByTopic = (topic) => (state, props) => 
  getTopicItemsByPage(state, 'movie', topic, 
    typeof props === 'undefined' 
      ? 1 
      : typeof props.page === 'undefined'
        ? 1
        : props.page);

const getMovieEntities = state => getEntitiesByType(state, 'movie');

const getPopularMovieIds = (state, props) => getMovieListByTopic('popular')(state, props);

const getTopRatedMovieIds = (state, props) => getMovieListByTopic('topRated')(state, props);

const getUpcomingMovieIds = (state, props) => getMovieListByTopic('upcoming')(state, props);

const getInTheatreMovieIds = (state, props) => getMovieListByTopic('inTheatre')(state, props);

const getActiveMovieInfo = (state) => getActiveInfoByType(state, 'movie');

const getFetchedMovieInfo = (state) => getFetchedInfoByType(state, 'movie');

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
  getActiveMovieInfo,
  getFetchedMovieInfo,
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
