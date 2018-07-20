/**
 * API utility
 */

import axios from 'axios';

import {
  API_URL,
  movieRoutes,
  tvRoutes,
  peopleRoutes,
  searchRoutes
} from '../constants/routes';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 60000
});

export const loadMovies = async (type, params) => {
  return api.get(movieRoutes[type], {
    params: params
  });
};

/**
 * Search for movies by the given query
 */
export const searchMovies = async (query, params) => {
  return api.get(movieRoutes.search, {
    params: { query: query, ...params }
  });
}

/**
 * Load details of a movie by its id
 */
export const movieInfo = async (id) => {
  return api.get(`${movieRoutes.info}/${id}`);
}

/**
 * Load the specific category (popular, top rated...) of tv shows
 */
export const loadTvShows = async (type, params) => {
  return api.get(tvRoutes[type], { params: params });
}

/**
 * Search for tv shows by the given query
 */
export const searchTvShows = async (query, params) => {
  return api.get(tvRoutes.search, {
    params: { query: query, ...params }
  });
}

/**
 * Load details of tv show by its id
 */
export const tvShowsInfo = async (id) => {
  return api.get(`${tvRoutes.info}/${id}`);
}

export const popularPeople = async (params) => {
  return api.get(peopleRoutes.popular, {
    params: { ...params }
  });
}

/**
 * Search for people by the given query
 */
export const searchPeople = async (query, params) => {
  return api.get(peopleRoutes.search, {
    params: { query: query, ...params }
  });
}

/**
 * Get profile of the person with the given id
 */
export const peopleProfile = async (id) => {
  return api.get(`${peopleRoutes.info}/${id}`);
}

/**
 * Search for movies and tv shows in a single request
 */
export const searchMulti = async (query, params) => {
  return api.get(searchRoutes, {
    params: { query: query, ...params }
  });
}
