import {
  movieApiRoute,
  tvApiRoute,
  peopleApiRoute,
  searchApiRoute,
  trendingApiRoute,
  API_URL
} from '../apiRoutes';

describe('apiRoute test', () => {
  it('should return the correct api url for movie api', () => {
    expect(movieApiRoute('popular')).toBe(`${API_URL}/movie/popular`);
    expect(movieApiRoute('upcoming')).toBe(`${API_URL}/movie/upcoming`);
    expect(movieApiRoute('toprated')).toBe(`${API_URL}/movie/top-rated`);
    expect(movieApiRoute('nowplaying')).toBe(`${API_URL}/movie/now-playing`);
    expect(movieApiRoute('detail', 100)).toBe(`${API_URL}/movie/100`);
    expect(movieApiRoute('credits', 100)).toBe(`${API_URL}/movie/100/credits`);
    expect(movieApiRoute('images', 100)).toBe(`${API_URL}/movie/100/images`);
    expect(movieApiRoute('videos', 100)).toBe(`${API_URL}/movie/100/videos`);
    expect(movieApiRoute('similar', 100)).toBe(`${API_URL}/movie/100/similar`);
  });

  it('should return the correct api url for movie api', () => {
    expect(tvApiRoute('popular')).toBe(`${API_URL}/tv/popular`);
    expect(tvApiRoute('onair')).toBe(`${API_URL}/tv/on-air`);
    expect(tvApiRoute('toprated')).toBe(`${API_URL}/tv/top-rated`);
    expect(tvApiRoute('detail', 100)).toBe(`${API_URL}/tv/100`);
    expect(tvApiRoute('credits', 100)).toBe(`${API_URL}/tv/100/credits`);
    expect(tvApiRoute('images', 100)).toBe(`${API_URL}/tv/100/images`);
    expect(tvApiRoute('videos', 100)).toBe(`${API_URL}/tv/100/videos`);
    expect(tvApiRoute('similar', 100)).toBe(`${API_URL}/tv/100/similar`);
  });

  it('should return the correct api url for people api', () => {
    expect(peopleApiRoute('popular')).toBe(`${API_URL}/people/popular`);
    expect(peopleApiRoute('detail', 100)).toBe(`${API_URL}/people/100`);
    expect(peopleApiRoute('credits', 100)).toBe(`${API_URL}/people/100/credits`);
    expect(peopleApiRoute('images', 100)).toBe(`${API_URL}/people/100/images`);
  });

  it('should return the correct api url for search api', () => {
    expect(searchApiRoute('multi')).toBe(`${API_URL}/search`);
    expect(searchApiRoute('movie')).toBe(`${API_URL}/search/movie`);
    expect(searchApiRoute('tv')).toBe(`${API_URL}/search/tv`);
    expect(searchApiRoute('people')).toBe(`${API_URL}/search/people`);
  });

  it('should return the correct api url for trending api', () => {
    expect(trendingApiRoute('all')).toBe(`${API_URL}/trending`);
    expect(trendingApiRoute('movie')).toBe(`${API_URL}/trending/movie`);
    expect(trendingApiRoute('tv')).toBe(`${API_URL}/trending/tv`);
    expect(trendingApiRoute('people')).toBe(`${API_URL}/trending/people`);
  });
});