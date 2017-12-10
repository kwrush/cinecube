import './style.scss';

import React from 'react'
import { Container } from 'reactstrap';
import BackdropCard from 'components/BackdropCard/index';
import PosterCard from 'components/PosterCard/index';

class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Container fluid>
        <BackdropCard 
          id={284053}
          type='movie'
          backdropUrl='https://image.tmdb.org/t/p/w780/5wNUJs23rT5rTBacNyf5h83AynM.jpg'
          title='Thor: Ragnarok'
          actors={['Chris Hemsworth', 'Tom Hiddleston', 'Cate Blanchett', 'Idris Elba', 'Tessa Thompson', 'Jeff Goldblum']}
        />
      </Container>
    );
  }
}

export default Home;