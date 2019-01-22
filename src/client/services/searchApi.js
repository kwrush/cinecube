/**
 * Search by media type
 */
import { requestMediaList } from './apiUtils';

export const searchMulti = async (query = '', params = {}) => 
  requestMediaList('search', 'multi', { query, ...params });

export const searchMovies = async (query = '', params = {}) => 
  requestMediaList('search', 'movie', { query, ...params });

export const searchTvs = async (query = '', params = {}) => 
  requestMediaList('search', 'tv', { query, ...params });

export const searchPeople = async (query = '', params = {}) => 
  requestMediaList('search', 'people', { query, ...params });
