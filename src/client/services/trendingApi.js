import { requestMediaList } from "./apiUtils";

export const trendingAll = async () => requestMediaList('trending', 'all');

export const trendingMovies = async () => requestMediaList('trending', 'movie');

export const trendingTvs = async () => requestMediaList('trending', 'tv');

export const trendingPeople = async () => requestMediaList('trending', 'people');