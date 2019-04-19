
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
const trending = '/trending';

const MOVIE_ROUTES = {
  popular: `${movie}/popular`,
  upcoming: `${movie}/upcoming`,
  toprated: `${movie}/top-rated`,
  nowplaying: `${movie}/now-playing`,
  detail: `${movie}/:id`,
  credits: `${movie}/:id/credits`,
  images: `${movie}/:id/images`,
  videos: `${movie}/:id/videos`,
  similar: `${movie}/:id/similar`,
};

const TV_ROUTES = {
  popular: `${tv}/popular`,
  onair: `${tv}/on-air`,
  toprated: `${tv}/top-rated`,
  detail: `${tv}/:id`,
  credits: `${tv}/:id/credits`,
  images: `${tv}/:id/images`,
  videos: `${tv}/:id/videos`,
  similar: `${tv}/:id/similar`,
};

const PEOPLE_ROUTES = {
  popular: `${people}/popular`,
  detail: `${people}/:id`,
  credits: `${people}/:id/credits`,
  images: `${people}/:id/images`,
};

const SEARCH_ROUTES = {
  multi: `${search}`,
  movie: `${search}${movie}`,
  tv: `${search}${tv}`,
  people: `${search}${people}`
};

const TRENDING_ROUTES = {
  all: `${trending}`,
  movie: `${trending}${movie}`,
  tv: `${trending}${tv}`,
  people: `${trending}${people}`
};

const createApiRoute = (tail, id) => {
  const url = `${API_URL}${tail}`;
  return id 
    ? url.replace(':id', id) 
    : url
};

export const movieApiRoute = (endpoint, id) => {
  const tail = MOVIE_ROUTES[endpoint.toLowerCase()];
  return createApiRoute(tail, id);
};

export const tvApiRoute = (endpoint, id) => {
  const tail = `${TV_ROUTES[endpoint.toLowerCase()]}`;
  return createApiRoute(tail, id);
};

export const peopleApiRoute = (endpoint, id) => {
  const tail = `${PEOPLE_ROUTES[endpoint.toLowerCase()]}`;
  return createApiRoute(tail, id);
};

export const searchApiRoute = endpoint => {
  const tail = `${SEARCH_ROUTES[endpoint.toLowerCase()]}`;
  return createApiRoute(tail);
};

export const trendingApiRoute = endpoint => {
  const tail = `${TRENDING_ROUTES[endpoint.toLowerCase()]}`;
  return createApiRoute(tail);
};
