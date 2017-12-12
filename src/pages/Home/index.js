import './style.scss';

import React from 'react'
import { Container } from 'reactstrap';
import SectionContainer from 'components/SectionContainer/index';
import SectionHeader from 'components/SectionHeader/index';
import CarouselCountainer from 'containers/CarouselContainer/index';

// debug
const items = [
  {  
    "id":346364,
    "title":"It",
    "posterUrl": "https://image.tmdb.org/t/p/w342/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
    "originalLanguage":"en",
    "originalTitle":"It",
    "genreIds":[  
      18,
      14,
      27,
      53
    ],
    "backdropUrl": "https://image.tmdb.org/t/p/w780/tcheoA2nPATCm2vvXw2hVQoaEFD.jpg",
    "overview":"In a small town in Maine, seven children known as The Losers Club come face to face with life problems, bullies and a monster that takes the shape of a clown called Pennywise.",
    "releaseDate":"2017-09-05"
  },
  {  
    "id":284053,
    "title":"Thor: Ragnarok",
    "posterUrl":"https://image.tmdb.org/t/p/w342/oSLd5GYGsiGgzDPKTwQh7wamO8t.jpg",
    "originalLanguage":"en",
    "originalTitle":"Thor: Ragnarok",
    "genreIds":[  
      28,
      12,
      35,
      14,
      878
    ],
    "backdropUrl":"https://image.tmdb.org/t/p/w780/5wNUJs23rT5rTBacNyf5h83AynM.jpg",
    "overview":"Thor is imprisoned on the other side of the universe and finds himself in a race against time to get back to Asgard to stop Ragnarok, the prophecy of destruction to his homeworld and the end of Asgardian civilization, at the hands of an all-powerful new threat, the ruthless Hela.",
    "releaseDate":"2017-10-25"
  },
  {  
    "id":141052,
    "title":"Justice League",
    "posterUrl":"https://image.tmdb.org/t/p/w342/9rtrRGeRnL0JKtu9IMBWsmlmmZz.jpg",
    "originalLanguage":"en",
    "originalTitle":"Justice League",
    "genreIds":[  
      28,
      12,
      14,
      878
    ],
    "backdropUrl":"https://image.tmdb.org/t/p/w780/o5T8rZxoWSBMYwjsUFUqTt6uMQB.jpg",
    "overview":"Fueled by his restored faith in humanity and inspired by Superman's selfless act, Bruce Wayne and Diana Prince assemble a team of metahumans consisting of Barry Allen, Arthur Curry, and Victor Stone to face the catastrophic threat of Steppenwolf and the Parademons who are on the hunt for three Mother Boxes on Earth.",
    "releaseDate":"2017-11-15"
  }
];

class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Container>
        <SectionContainer>
          <SectionHeader title="Discover" />
          <CarouselCountainer />
        </SectionContainer>
      </Container>
    );
  }
}

export default Home;