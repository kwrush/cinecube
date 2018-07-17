
/**
 * Routes for calling api
 */

const PORT = 3000;
export const API_URL = `http://localhost:${PORT}/api`;


export const movie = '/movie';
export const tv = '/tv';
export const people = '/people';

export const movieRoutes = {
  popular: `${movie}/popular`,
  discover: `${movie}/discover`,
  topRated: `${movie}/top_rated`,
  upcoming: `${movie}/upcoming`,
  inTheatre: `${movie}/in_theatre`,
  search: `${movie}/search`,
  info: `${movie}`
};

export const tvRoutes = {
  popular: `${tv}/popular`,
  discover: `${tv}/discover`,
  topRated: `${tv}/top_rated`,
  onAir: `${tv}/on_air`,
  search: `${tv}/search`,
  info: `${tv}`
};

export const peopleRoutes = {
  popular: `${people}/popular`,
  search: `${people}/search`,
  info: `${people}`
};

export const searchRoutes = '/search/multi';

export const favoriteRoutes = '/favoirte';

