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
];

export const movieEndPoints = {
  popular:    '/movie/popular',
  discover:   '/movie/discover',
  topRated:   '/movie/top_rated',
  upcoming:   '/movie/upcoming',
  inTheatre:  '/movie/in_theatre',
  search:     '/movie/search',
  info:       '/movie'
};

export const tvEndPoints = {
  popular:  '/tv/popular',
  discover: '/tv/discover',
  topRated: '/tv/top_rated',
  onAir:    '/tv/on_air',
  search:   '/tv/search',
  info:     '/tv'
};

export const peopleEndPoints = {
  popular: '/people/popular',
  search:  '/poeple/search',
  info:    '/people'
};

export const generes = {
  28:    "Action",
  12:    "Adventure",
  16:    "Animation",
  35:    "Comedy",
  80:    "Crime",
  99:    "Documentary",
  18:    "Drama",
  10751: "Family",
  14:    "Fantasy",
  36:    "History",
  27:    "Horror",
  10402: "Music",
  9648:  "Mystery",
  10749: "Romance",
  878:   "Sci-Fi",
  10770: "TV Movie",
  53:    "Thriller",
  10752: "War",
  37:    "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics"
};

