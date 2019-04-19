import axios from 'axios';
import {
  API_URL,
  movieApiRoute,
  tvApiRoute,
  peopleApiRoute,
  searchApiRoute,
  trendingApiRoute
} from '../constants/apiRoutes';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000
});

export const fetchMediaList = async (reqType, listType, params) => {

  let apiUrl = '';

  if (reqType === 'movie') {
    apiUrl = movieApiRoute(listType); 
  } else if (reqType === 'tv') {
    apiUrl = tvApiRoute(listType);
  } else if (reqType === 'people') {
    apiUrl = peopleApiRoute[listType];
  } else if (reqType === 'search') {
    apiUrl = searchApiRoute[listType];
  } else if (reqType === 'trending') {
    apiUrl = trendingApiRoute[listType];
  }

  return api.get(apiUrl, {
    params: { ...params }
  });
};

export const fetchMediaInfo = async (mediaId, mediaType, infoType, params) => {

  let apiUrl = '';

  if (mediaType === 'movie') {
    apiUrl = movieApiRoute(infoType, mediaId);
  } else if (mediaType === 'tv') {
    apiUrl = tvApiRoute(infoType, mediaId);
  } else {
    apiUrl = peopleApiRoute(infoType, mediaId);
  }
  
  return api.get(apiUrl, {
    params: { ...params }
  });
};