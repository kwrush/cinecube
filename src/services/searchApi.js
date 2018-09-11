/**
 * Search by media type of multi
 */
import { api, fetchMediaList } from './apiUtils';
import { API_URL } from '../constants/routes';

export const searchMulti = (query, params) => {
  const apiUrl = `${API_URL}/search/multi`;

  return api.get(apiUrl, {
    params: { query: query, ...params }
  });
};

export const searchMovies = (params) => fetchMediaList('movie', 'search', params);

export const searchTvs = (params) => fetchMediaList('tv', 'search', params);

export const searchPeople = (params) => fetchMediaList('people', 'search', params);
