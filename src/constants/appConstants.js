export const API_URL = 'http://localhost:8000/api';

export const navLinks = [
  { 
    url: '/movie',
    tag: 'Movies' 
  },
  {
    url: '/tv',
    tag: 'TV Shows'
  },
  {
    url: '/people',
    tag: 'People'
  },
  {
    url: '/favorite',
    tag: 'Favorites'
  }
]

export const movieEndPoints = {
  popular:    '/movie/popular',
  discover:   '/movie/discover',
  topRated:   '/movie/top_rated',
  upcoming:   '/movie/upcoming',
  inTheatre:  '/movie/in_theatre',
  search:     '/movie/search',
  info:       '/movie'
}

export const tvEndPoints = {
  popular:  '/tv/popular',
  discover: '/tv/discover',
  topRated: '/tv/top_rated',
  onAir:    '/tv/on_air',
  search:   '/tv/search',
  info:     '/tv'
}

export const peopleEndPoints = {
  popular: '/people/popular',
  search:  '/poeple/search',
  info:    '/people'
}

