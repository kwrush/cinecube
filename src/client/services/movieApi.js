/**
 * Calls backend api to fetch movie information
 */

import { requestMediaList, mediaInfo } from './apiUtils';

export const popularMovies = async (params = {}) => {
  const { language, page, region } = params;
  return requestMediaList('movie', 'popular', {
    language: language,
    page: page,
    region: region
  });
};

export const movieDetail = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'movie', null, { language: language });
};

export const movieCredits = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'movie', 'credits', { language: language });
};

export const movieImages = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'movie', 'images', { language: language });
};

export const movieVideos = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'movie', 'videos', { language: language });
};

export const similarMovies = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'movie', 'similar', { language: language });
};

