/**
 * Calls backend api to fetch movie information
 */

import { fetchMediaList, fetchMediaInfo } from './apiUtils';

const fetchMovieList = (endpoint, { language, page, region }) => fetchMediaList(
  'movie', 
  endpoint, 
  { language, page, region }
);

export const popularMovies = (params = {}) => fetchMovieList('popular', { ...params });

export const upcomingMovies = (params = {}) => fetchMovieList('upcoming', { ...params });

export const nowPlayingMovies = (params = {}) => fetchMovieList('nowplaying', { ...params });

export const topRatedMovies = (params = {}) => fetchMovieList('toprated', { ...params });

export const movieDetail = id => (params = {}) => {
  const { language } = params;
  return fetchMediaInfo(id, 'movie', 'detail', { language });
};

export const movieCredits = id => (params = {}) => {
  const { language } = params;
  return fetchMediaInfo(id, 'movie', 'credits', { language });
};

export const movieImages = id => (params = {}) => {
  const { language } = params;
  return fetchMediaInfo(id, 'movie', 'images', { language });
};

export const movieVideos = id => (params = {}) => {
  const { language } = params;
  return fetchMediaInfo(id, 'movie', 'videos', { language });
};

export const similarMovies = id => (params = {}) => {
  const { language } = params;
  return fetchMediaInfo(id, 'movie', 'similar', { language });
};

