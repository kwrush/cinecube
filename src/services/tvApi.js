/**
 * Calls backend api to fetch information about tv showss˚s 
 */

import { fetchMediaList, fetchMediaInfo } from './apiUtils';

export const discoverTvs = (params) => fetchMediaList('tv', 'discover', params);

export const fetchPopularTvs = (params) => fetchMediaList('tv', 'popular', params);

export const fetchTopRatedTvs = (params) => fetchMediaList('tv', 'topRated', params);

export const fetchUpcomingTvs = (params) => fetchMediaList('tv', 'onAir', params);

export const fetchTvInfo = (id) => fetchMediaInfo('tv', id);

export const fetchTvCredits = (id) => fetchMediaInfo('tv', id, 'credits');

export const fetchTvImages = (id) => fetchMediaInfo('tv', id, 'images');

export const fetchSimilarTvs = (id) => fetchMediaInfo('tv', id, 'similar');

export const searchTvs = (params) => fetchMediaList('tv', 'search', params);
