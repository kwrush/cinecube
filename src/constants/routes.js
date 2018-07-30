
/**
 * Routes for calling api
 */

const PORT = 3000;
export const API_URL = `http://localhost:${PORT}/api`;


const movie = '/movie';
const tv = '/tv';
const people = '/people';

export const movieRoutes = {
  name: 'Movie',
  home: `${movie}`,
  popular: `${movie}/popular`,
  discover: `${movie}/discover`,
  topRated: `${movie}/top_rated`,
  upcoming: `${movie}/upcoming`,
  inTheatre: `${movie}/in_theatre`,
  search: `${movie}/search`,
  info: `${movie}/:id`
};

export const tvRoutes = {
  name: 'TV Shows',
  home: `${tv}`,
  popular: `${tv}/popular`,
  discover: `${tv}/discover`,
  topRated: `${tv}/top_rated`,
  onAir: `${tv}/on_air`,
  search: `${tv}/search`,
  info: `${tv}/:id`
};

export const peopleRoutes = {
  name: 'People',
  home: `${people}`,
  popular: `${people}/popular`,
  search: `${people}/search`,
  info: `${people}/:id`
};

export const searchRoutes = '/search/multi';

export const favoriteRoutes = '/favoirte';

