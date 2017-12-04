export const popularMoviesFirstPage = {
  status: 200,
  page: 1,
  results: [
    {
      id: 1,
      title: 'Top Story',
      posterPath: 'image/poster1.jpeg'
    },
    {
      id: 2,
      title: 'Top Story 3',
      posterPath: 'image/poster2.jpeg'
    }
  ]
}

export const popularMoviesSecondPage = {
  status: 200,
  page: 2,
  results: [
    {
      id: 3,
      title: 'Up',
      posterPath: 'image/poster3.jpeg'
    },
    {
      id: 4,
      title: 'Inside Out',
      posterPath: 'image/poster4.jpeg'
    }
  ]
}

export const movieOverview = {
  id: 1,
  title: 'Top Story',
  posterPath: 'image/poster1.jpeg'
}

export const searchMovieResults = {
  page: 1,
  results: popularMoviesFirstPage.results 
}