/**
 * Calls backend api to fetch persons information
 */

import { fetchMediaList, fetchMediaInfo } from './apiUtils';

export const popularPeople = (params = {}) => {
  const { language, page } = params;
  return fetchMediaList('people', 'popular', {
    language,
    page
  });
};

export const peopleDetail = (id, params = {}) => {
  const { language } = params;
  return fetchMediaInfo(id, 'people', null, { language });
};

export const peopleCredits = (id, params = {}) => {
  const { language } = params;
  return fetchMediaInfo(id, 'people', 'credits', { language });
};

export const peopleImages = (id, params = {}) => {
  const { language } = params;
  return fetchMediaInfo(id, 'people', 'images', { language });
};



