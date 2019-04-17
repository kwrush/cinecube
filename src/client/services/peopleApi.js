/**
 * Calls backend api to fetch persons information
 */

import { requestMediaList, mediaInfo } from './apiUtils';

export const popularPeople = async (params = {}) => {
  const { language, page } = params;
  return requestMediaList('people', 'popular', {
    language,
    page
  });
};

export const peopleDetail = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'people', null, { language });
};

export const peopleCredits = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'people', 'credits', { language });
};

export const peopleImages = async (id, params = {}) => {
  const { language } = params;
  return mediaInfo(id, 'people', 'images', { language });
};



