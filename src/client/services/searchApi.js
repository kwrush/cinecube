/**
 * Search by media type
 */
import { requestMediaList } from './apiUtils';

export const searchMulti = async (query = '', params = {}) => 
  requestMediaList('multi', { query, ...params });

export const searchMovies = async (query = '', params = {}) => 
  requestMediaList('movie', { query, ...params });

export const searchTvs = async (query = '', params = {}) => 
  requestMediaList('tv', { query, ...params });

export const searchPeople = async (query = '', params = {}) => 
  requestMediaList('people', { query, ...params });
