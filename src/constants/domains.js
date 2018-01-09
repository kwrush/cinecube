export const API_URL = 'http://localhost:3000/api';

export const rootDomains = {
  movie: '/movie',
  tv: '/tv',
  people: '/people',
};

export const movieDomains = {
  popular:    `${rootDomains.movie}/popular`,
  discover:   `${rootDomains.movie}/discover`,
  topRated:   `${rootDomains.movie}/top_rated`,
  upcoming:   `${rootDomains.movie}/upcoming`,
  inTheatre:  `${rootDomains.movie}/in_theatre`,
  search:     `${rootDomains.movie}/search`,
  info:       `${rootDomains.movie}`
};

export const tvDomains = {
  popular:  `${rootDomains.tv}/popular`,
  discover: `${rootDomains.tv}/discover`,
  topRated: `${rootDomains.tv}/top_rated`,
  onAir:    `${rootDomains.tv}/on_air`,
  search:   `${rootDomains.tv}/search`,
  info:     `${rootDomains.tv}`
};

export const peopleDomains = {
  popular: `${rootDomains.people}/popular`,
  search:  `${rootDomains.people}/search`,
  info:    `${rootDomains.people}`
};

export const searchMultiDomain = '/search/multi';

export const favoriteDomain = '/favorite';