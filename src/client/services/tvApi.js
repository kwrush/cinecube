/**
 * Calls backend api to fetch information about tv shows
 */

import { fetchMediaList, fetchMediaInfo } from './apiUtils';

const fetchTvList = (endpoint, { language, page, region }) => fetchMediaList(
  'tv', 
  endpoint, 
  { language, page, region }
);

export const popularTvs = (params = {}) => fetchTvList('popular', { ...params });

export const onAirTvs = (params = {}) => fetchTvList('onair', { ...params });

export const topRatedTvs = (params = {}) => fetchTvList('toprated', { ...params });

export const tvDetail = id => (params = {}) => {
  const { language } = params;
  return fetchMediaInfo(id, 'tv', 'detail', { language });
};

export const tvCredits = id => (params = {}) => {
  const { language } = params;
  return fetchMediaInfo(id, 'tv', 'credits', { language });
};

export const tvImages = id => (params = {}) => {
  const { language } = params;
  return fetchMediaInfo(id, 'tv', 'images', { language });
};

export const tvVideos = id => (params = {}) => {
  const { language } = params;
  return fetchMediaInfo(id, 'tv', 'videos', { language });
};

export const similarTvs = id => (params = {}) => {
  const { language } = params;
  return fetchMediaInfo(id, 'tv', 'similar', { language });
};

