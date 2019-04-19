import { fetchMediaList } from "./apiUtils";

export const trendingAll = () => fetchMediaList('trending', 'all');

export const trendingMovies = () => fetchMediaList('trending', 'movie');

export const trendingTvs = () => fetchMediaList('trending', 'tv');

export const trendingPeople = () => fetchMediaList('trending', 'people');