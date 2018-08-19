/**
 * Search by media type of multi
 */
import { api } from './apiUtils';
import { API_URL } from '../constants/routes';

export const searchMulti = (query, params) => {
  const apiUrl = `${API_URL}/search/multi`;

  return api.get(apiUrl, {
    params: { query: query, ...params }
  });
};