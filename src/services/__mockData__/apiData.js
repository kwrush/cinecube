export const popularFirstPage = {
  status: 200,
  page: 1,
  results: [
    {
      id: 1,
      title: 'Toy Story',
      posterPath: 'image/poster1.jpeg'
    },
    {
      id: 2,
      title: 'Toy Story 3',
      posterPath: 'image/poster2.jpeg'
    }
  ]
}

export const popularSecondPage = {
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

export const overview = {
  id: 1,
  title: 'Toy Story',
  posterPath: 'image/poster1.jpeg'
}

export const credtis = {
  id: 1,
  title: 'Breaking Bad',
  credits: {
    cast: [
      {name: 'A', id: 1},
      {name: 'B', id: 2}
    ],
    directing: [
      {name: 'D1', id: 3},
      {name: 'D2', id: 4}
    ],
    writing: [
      {name: 'W', id: 5},
    ]
  }
}

export const multiResults = {
  page: 1,
  results: {
    movie: popularFirstPage.results,
    tv:    popularSecondPage.results,
    person: [{
      name: 'Tom Hanks'
    }, {
      name: 'Tom Cruise'
    }]
  }
}