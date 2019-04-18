import axios from 'axios';
import {
  API_URL,
  MOVIE_ROUTES,
  TV_ROUTES,
  PEOPLE_ROUTES,
  SEARCH_ROUTES,
  TRENDING_ROUTE
} from '../constants/routes';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000
});

export const requestMediaList = async (reqType, listType, params) => {

  let apiUrl = '';

  if (reqType === 'movie') {
    apiUrl = MOVIE_ROUTES[listType]; 
  } else if (reqType === 'tv') {
    apiUrl = TV_ROUTES[listType];
  } else if (reqType === 'people') {
    apiUrl = PEOPLE_ROUTES[listType];
  } else if (reqType === 'search') {
    apiUrl = SEARCH_ROUTES[listType];
  } else if (reqType === 'trending') {
    apiUrl = TRENDING_ROUTE[listType];
  }

  return api.get(apiUrl, {
    params: { ...params }
  });
};

export const mediaInfo = async (mediaId, mediaType, infoType, params) => {

  let apiUrl = '';

  if (mediaType === 'movie') {
    apiUrl = MOVIE_ROUTES.home;
  } else if (mediaType === 'tv') {
    apiUrl = TV_ROUTES.home;
  } else {
    apiUrl = PEOPLE_ROUTES.home;
  }

  apiUrl += (`/${mediaId}` + (infoType ? `/${infoType}` : ''));

  return api.get(apiUrl, {
    params: { ...params }
  });
};