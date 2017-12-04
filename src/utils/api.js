import axios from 'axios';

import { API_URL, movieEndPoints, tvEndPoints, peopleEndPoints } from '../constants/appConstants';

const api = axios.create({
  baseURL: API_URL,
  timeout: 600000
});

/**
 * Load the specific category (popular, top rated...) of movies
 */
export const loadMovies = async (type, params) => {
  
}

/**
 * Search for movies by the given query
 */
export const searchMovies = async (query, params) => {
  
}

/**
 * Load details of a movie by its id
 */
export const movieInfo = async (id) => {
  
}

/**
 * Load the specific category (popular, top rated...) of tv shows
 */
export const loadTvShows = async (type, params) => {
  
}

/**
 * Search for tv shows by the given query
 */
export const searchTvShows = async (query, params) => {
  
}

/**
 * Load details of tv show by its id
 */
export const tvInfo = async (id) => {
  
}

/**
 * Search for people by the given query
 */
export const searchPeople = async (query, params) => {
  
}

/**
 * Overview of the person with the given id
 */
export const peopleInfo = async (id) => {
  
}

/**
 * Search for movies, tv shows and persons in a single request
 */
export const searchMulti = async (query) => {
  
}