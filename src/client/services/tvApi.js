/**
 * Calls backend api to fetch information about tv shows
 */

import { requestMediaList, mediaInfo } from './apiUtils';

export const popularTvs = async (params = {}) => {
  const { language, page, region } = params;
  return requestMediaList('tv', 'popular', {
    language: language,
    page: page,
    region: region
  });
};

export const tvDetail = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'tv', null, { language: language });
};

export const tvCredits = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'tv', 'credits', { language: language });
};

export const tvImages = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'tv', 'images', { language: language });
};

export const tvVideos = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'tv', 'videos', { language: language });
};

export const similarTvs = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'tv', 'similar', { language: language });
};

