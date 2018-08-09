import React from 'react';
import { Container } from 'reactstrap';
import BackdropCarousel from '../components/BackdropCarousel';

const mockData = [
  {
    "id": 383498,
    "mediaType": "movie",
    "rating": 7.6,
    "title": "Deadpool 2",
    "posterUrl": "https://image.tmdb.org/t/p/w220_and_h330_bestv2/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/original/9lttPLlmZ8l7arZm7AXgKHhl7nv.jpg",
    "genreIds": [
      28,
      35,
      878
    ],
    "releaseDate": "2018-5-18"
  },
  {
    "id": 335984,
    "mediaType": "movie",
    "rating": 6.2,
    "title": "Blade Runner 2049",
    "posterUrl": "https://image.tmdb.org/t/p/w220_and_h330_bestv2/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/original/mVr0UiqyltcfqxbAUcLl9zWL8ah.jpg",
    "genreIds": [
      9648,
      878,
      53
    ],
    "releaseDate": "2017-10-5"
  },
  {
    "id": 353081,
    "mediaType": "movie",
    "rating": 4.4,
    "title": "Mission: Impossible - Fallout",
    "posterUrl": "https://image.tmdb.org/t/p/w220_and_h330_bestv2/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/original/5qxePyMYDisLe8rJiBYX8HKEyv2.jpg",
    "genreIds": [
      12,
      28,
      53
    ],
    "releaseDate": "2018-7-12"
  }
];

class Home extends React.Component {

  render () {
    return (
      <Container>
        <div>This is home page</div>
        <BackdropCarousel backdrops={mockData} />
      </Container>
    );
  }
} 


export default Home;
