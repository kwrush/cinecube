/**
 * Calls backend api to fetch movie information
 */

import { requestMediaList, mediaInfo } from './apiUtils';

const fetchMovieList = (endpoint, { language, page, region }) => requestMediaList(
  'movie', 
  endpoint, 
  { language, page, region }
);

export const popularMovies = async (params = {}) => fetchMovieList('popular', { ...params });

export const upcomingMovies = async (params = {}) => fetchMovieList('upcoming', { ...params });

export const nowPlayingMovies = async (params = {}) => fetchMovieList('now-playing', { ...params });

export const topRatedMovies = async (params = {}) => fetchMovieList('top-rated', { ...params });

export const movieDetail = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'movie', null, { language: language });
};

export const movieCredits = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'movie', 'credits', { language });
};

export const movieImages = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'movie', 'images', { language });
};

export const movieVideos = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'movie', 'videos', { language });
};

export const similarMovies = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'movie', 'similar', { language });
};

