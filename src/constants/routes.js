
/**
 * Routes for calling api
 */

const PORT = 3000;
export const API_URL = `http://localhost:${PORT}/api`;


const movie = '/movie';
const tv = '/tv';
const people = '/people';

export const MOVIE_ROUTES = {
  name: 'Movie',
  home: `${movie}`,
  popular: `${movie}/popular`,
  topRated: `${movie}/top_rated`,
  upcoming: `${movie}/upcoming`,
  inTheatre: `${movie}/in_theatre`,
  search: `${movie}/search`,
  info: `${movie}/:id`
};

export const TV_ROUTES = {
  name: 'TV Series',
  home: `${tv}`,
  popular: `${tv}/popular`,
  topRated: `${tv}/top_rated`,
  onAir: `${tv}/on_air`,
  search: `${tv}/search`,
  info: `${tv}/:id`
};

export const PEOPLE_ROUTES = {
  name: 'People',
  home: `${people}`,
  popular: `${people}/popular`,
  search: `${people}/search`,
  info: `${people}/:id`
};

