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
      <Container>
        <h1>Home</h1>
      </Container>
    );
  }
}

export default Home;