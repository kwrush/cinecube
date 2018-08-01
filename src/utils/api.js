/**
 * API utility
 */

import axios from 'axios';

import {
  API_URL,
  MOVIE_ROUTES,
  TV_ROUTES,
  PEOPLE_ROUTES
} from '../constants/routes';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 60000
});

export const loadMovies = async (type, params) => {
  return api.get(MOVIE_ROUTES[type], {
    params: params
  });
};

/**
 * Search for movies by the given query
 */
export const searchMovies = async (query, params) => {
  return api.get(MOVIE_ROUTES.search, {
    params: { query: query, ...params }
  });
}

/**
 * Load details of a movie by its id
 */
export const movieInfo = async (id) => {
  return api.get(`${MOVIE_ROUTES.info}/${id}`);
}

/**
 * Load the specific category (popular, top rated...) of tv shows
 */
export const loadTvShows = async (type, params) => {
  return api.get(TV_ROUTES[type], { params: params });
}

/**
 * Search for tv shows by the given query
 */
export const searchTvShows = async (query, params) => {
  return api.get(TV_ROUTES.search, {
    params: { query: query, ...params }
  });
}

/**
 * Load details of tv show by its id
 */
export const tvShowsInfo = async (id) => {
  return api.get(`${TV_ROUTES.info}/${id}`);
}

export const popularPeople = async (params) => {
  return api.get(PEOPLE_ROUTES.popular, {
    params: { ...params }
  });
}

/**
 * Search for people by the given query
 */
export const searchPeople = async (query, params) => {
  return api.get(PEOPLE_ROUTES.search, {
    params: { query: query, ...params }
  });
}

/**
 * Get profile of the person with the given id
 */
export const peopleProfile = async (id) => {
  return api.get(`${PEOPLE_ROUTES.profile}/${id}`);
}

/**
 * Search for movies and tv shows in a single request
 */
export const searchMulti = async (query, params) => {
  return api.get(searchRoutes, {
    params: { query: query, ...params }
  });
}
