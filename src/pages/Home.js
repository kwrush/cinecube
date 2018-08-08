import React from 'react';
import { Container } from 'reactstrap';
import Backdrop from '../components/Backdrop';

const mockData = {
  "id": 335984,
  "video": false,
  "rating": 7.3,
  "title": "Blade Runner 2049",
  "posterUrl": "https://image.tmdb.org/t/p/w220_and_h330_bestv2/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
  "backdropUrl": "https://image.tmdb.org/t/p/original/mVr0UiqyltcfqxbAUcLl9zWL8ah.jpg",
  "genre_ids": [
    9648,
    878,
    53
  ],
  "overview": "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.",
  "releaseDate": "2017-10-04"
};

class Home extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isActive: false
    };
  }
  active = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render () {
    let { isActive } = this.state;
    return (
      <Container onMouseDown={this.active}>
        <div>This is home page</div>
        <Backdrop active={isActive} {...mockData}/>
      </Container>
    );
  }
} 


export default Home;
