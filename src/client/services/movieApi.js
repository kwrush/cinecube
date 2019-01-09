/**
 * Calls backend api to fetch movie information
 */

import { fetchMediaList, fetchMediaInfo } from './apiUtils';

export const discoverMovies = (params) => 
  fetchMediaList('movie', 'discover', params);

export const fetchPopularMovies = (params) => 
  fetchMediaList('movie', 'popular', params);

export const fetchTopRatedMovies = (params) => 
  fetchMediaList('movie', 'topRated', params);

export const fetchUpcomingMovies = (params) => 
  fetchMediaList('movie', 'upcoming', params);

export const fetchInTheatreMovies = (params) => 
  fetchMediaList('movie', 'inTheatre', params);

export const fetchMovieInfo = (id) => 
  fetchMediaInfo('movie', id);

export const fetchMovieCredits = (id) => 
  fetchMediaInfo('movie', id, 'credits');

export const fetchMovieImages = (id) => 
  fetchMediaInfo('movie', id, 'images');

export const fetchSimilarMovies = (id) => 
  fetchMediaInfo('movie', id, 'similar');

