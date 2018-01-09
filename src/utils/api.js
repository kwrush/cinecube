import axios from 'axios';
import { API_URL, movieDomains, tvDomains, peopleDomains, searchMultiDomain } from 'constants/domains';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 600000
})

/**
 * Load the specific category (popular, top rated...) of movies
 */
export const loadMovies = async (type, params) => {
  return api.get(movieDomains[type], { params: params });
}

/**
 * Search for movies by the given query
 */
export const searchMovies = async (query, params) => {
  return api.get(movieDomains.search, {
    params: { query: query, ...params }
  });
}

/**
 * Load details of a movie by its id
 */
export const movieInfo = async (id) => {
  return api.get(`${movieDomains.info}/${id}`);
}

/**
 * Load the specific category (popular, top rated...) of tv shows
 */
export const loadTvShows = async (type, params) => {
  return api.get(tvDomains[type], { params: params });
}

/**
 * Search for tv shows by the given query
 */
export const searchTvShows = async (query, params) => {
  return api.get(tvDomains.search, {
    params: { query: query, ...params }
  });
}

/**
 * Load details of tv show by its id
 */
export const tvShowsInfo = async (id) => {
  return api.get(`${tvDomains.info}/${id}`);
}

export const popularPeople = async (params) => {
  return api.get(peopleDomains.popular, {
    params: { ...params }
  });
}

/**
 * Search for people by the given query
 */
export const searchPeople = async (query, params) => {
  return api.get(peopleDomains.search, {
    params: { query: query, ...params }
  });
}

/**
 * Get profile of the person with the given id
 */
export const peopleProfile = async (id) => {
  return api.get(`${peopleDomains.info}/${id}`);
}

/**
 * Search for movies and tv shows in a single request
 */
export const searchMulti = async (query, params) => {
  return api.get(searchMultiDomain, {
    params: { query: query, ...params }
  });
}