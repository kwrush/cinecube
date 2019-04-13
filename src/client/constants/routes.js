
/**
 * Routes for calling api
 */

const PORT = 3001;
export const API_URL = `http://localhost:${PORT}/api/v1`;
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

const movie = '/movie';
const tv = '/tv';
const people = '/people';
const search = '/search';

export const MOVIE_ROUTES = {
  home: `${movie}`,
  popular: `${movie}/popular`,
  detail: `${movie}/:id(\\d+)`,
  credits: `${movie}/:id(\\d+)/credits`,
  images: `${movie}/:id(\\d+)/images`,
  videos: `${movie}/:id(\\d+)/videos`,
  similar: `${movie}/:id(\\d+)/similar`,
};

export const TV_ROUTES = {
  home: `${tv}`,
  popular: `${tv}/popular`,
  detail: `${tv}/:id(\\d+)`,
  credits: `${tv}/:id(\\d+)/credits`,
  images: `${tv}/:id(\\d+)/images`,
  videos: `${tv}/:id(\\d+)/videos`,
  similar: `${tv}/:id(\\d+)/similar`,
};

export const PEOPLE_ROUTES = {
  home: `${people}`,
  popular: `${people}/popular`,
  detail: `${people}/:id(\\d+)`,
  credits: `${people}/:id(\\d+)/credits`,
  images: `${people}/:id(\\d+)/images`,
};

export const SEARCH_ROUTES = {
  multi: `${search}`,
  movie: `${search}${movie}`,
  tv: `${search}${tv}`,
  people: `${search}${people}`
}

