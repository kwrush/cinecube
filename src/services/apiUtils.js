import axios from 'axios';
import {
  API_URL,
  MOVIE_ROUTES,
  TV_ROUTES,
  PEOPLE_ROUTES
} from '../constants/routes';


export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000
});

export const fetchMediaList = async (mediaType, listType, params) => {

  let apiUrl = '';

  if (mediaType === 'movie') {
    apiUrl = MOVIE_ROUTES[listType]; 
  } else if (mediaType === 'people') {
    apiUrl = TV_ROUTES[listType];
  } else {
    apiUrl = PEOPLE_ROUTES[listType];
  }

  return api.get(apiUrl, {
    params: params
  })
};

export const fetchMediaInfo = async (mediaType, mediaId, infoType) => {

  let apiUrl = '';

  if (mediaType === 'movie') {
    apiUrl = MOVIE_ROUTES.home;
  } else if (mediaType === 'tv') {
    apiUrl = TV_ROUTES.home;
  } else {
    apiUrl = PEOPLE_ROUTES.home;
  }

  apiUrl += (`/${mediaId}` + (infoType ? `/${infoType}` : ''));

  console.log(apiUrl);

  return api.get(apiUrl);
}

