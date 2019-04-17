/**
 * Calls backend api to fetch information about tv shows
 */

import { requestMediaList, mediaInfo } from './apiUtils';

const fetchTvList = (endpoint, { language, page, region }) => requestMediaList(
  'tv', 
  endpoint, 
  { language, page, region }
);

export const popularTvs = async (params = {}) => fetchTvList('popular', { ...params });

export const onAirTvs = async (params = {}) => fetchTvList('on-air', { ...params });

export const topRatedTvs = async (params = {}) => fetchTvList('top-rated', { ...params });

export const tvDetail = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'tv', null, { language: language });
};

export const tvCredits = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'tv', 'credits', { language });
};

export const tvImages = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'tv', 'images', { language });
};

export const tvVideos = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'tv', 'videos', { language });
};

export const similarTvs = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'tv', 'similar', { language });
};

