/**
 * Search by media type
 */
import { fetchMediaList } from './apiUtils';

export const searchMulti = (query = '') => (params = {}) => 
  fetchMediaList('search', 'multi', { query, ...params });

export const searchMovies = (query = '') => (params = {}) => 
  fetchMediaList('search', 'movie', { query, ...params });

export const searchTvs = (query = '') => (params = {}) => 
  fetchMediaList('search', 'tv', { query, ...params });

export const searchPeople = (query = '') => (params = {}) => 
  fetchMediaList('search', 'people', { query, ...params });
