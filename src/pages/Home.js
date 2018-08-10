import React from 'react';
import { Container } from 'reactstrap';
import BackdropCarousel from '../components/BackdropCarousel';
import PosterBanner from '../components/PosterBanner';
const mockData = [
  {
    "id": 351286,
    "mediaType": "movie",
    "rating": 6.6,
    "title": "Jurassic World: Fallen Kingdom",
    "posterUrl": "https://image.tmdb.org/t/p/w220_and_h330_bestv2/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg",
    "genreIds": [
      28,
      12,
      878
    ],
    "backdropUrl": "https://image.tmdb.org/t/p/original/3s9O5af2xWKWR5JzP2iJZpZeQQg.jpg",
    "releaseDate": "2018-06-06"
  },
  {
    "id": 181808,
    "mediaType": "movie",
    "rating": 5.8,
    "title": "Star Wars: The Last Jedi",
    "posterUrl": "https://image.tmdb.org/t/p/w220_and_h330_bestv2/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/original/oVdLj5JVqNWGY0LEhBfHUuMrvWJ.jpg",
    "genreIds": [
      14,
      12,
      878,
      28
    ],
    "releaseDate": "2017-12-13"
  },
  {
    "id": 353081,
    "mediaType": "movie",
    "rating": 7.8,
    "title": "Mission: Impossible - Fallout",
    "posterUrl": "https://image.tmdb.org/t/p/w220_and_h330_bestv2/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/original/5qxePyMYDisLe8rJiBYX8HKEyv2.jpg",
    "genreIds": [
      12,
      28,
      53
    ],
    "releaseDate": "2018"
  },
  {
    "id": 299536,
    "mediaType": "movie",
    "rating": 8.3,
    "title": "Avengers: Infinity War",
    "posterUrl": "https://image.tmdb.org/t/p/w220_and_h330_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/original/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
    "genreIds": [
      12,
      878,
      14,
      28
    ],
    "releaseDate": "2018-04-25"
  },
  {
    "id": 363088,
    "mediaType": "movie",
    "rating": 7,
    "title": "Ant-Man and the Wasp",
    "posterUrl": "https://image.tmdb.org/t/p/w220_and_h330_bestv2/rv1AWImgx386ULjcf62VYaW8zSt.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/original/6P3c80EOm7BodndGBUAJHHsHKrp.jpg",
    "genreIds": [
      28,
      12,
      14,
      35,
      878
    ],
    "releaseDate": "2018-07-04"
  },
  {
    "id": 335984,
    "mediaType": "movie",
    "rating": 8.2,
    "title": "Blade Runner 2049",
    "posterUrl": "https://image.tmdb.org/t/p/w220_and_h330_bestv2/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/original/mVr0UiqyltcfqxbAUcLl9zWL8ah.jpg",
    "genreIds": [
      9648,
      878,
      53
    ],
    "releaseDate": "2017-10-5"
  }
];

class Home extends React.Component {

  render () {
    return (
      <Container>
        <div>This is home page</div>
        <BackdropCarousel backdrops={mockData.slice(0, 4)} />
        <PosterBanner 
          items={mockData}
          title="Popular Movies"
        />
      </Container>
    );
  }
} 


export default Home;
