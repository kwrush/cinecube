/**
 * Calls backend api to fetch persons information
 */

import { fetchMediaList, fetchMediaInfo } from './apiUtils';

export const fetchPopularPeople = (params) => fetchMediaList('people', 'popular', params);

export const fetchPeopleInfo = (id) => fetchMediaInfo('people', id);

export const fetchPeopleImages = (id) => fetchMediaInfo('people', id, 'images');

export const fetchPeopleCredits = (id) => fetchMediaInfo('people', id, 'credits');

export const searchPeople = (params) => fetchMediaList('people', 'search', params);

