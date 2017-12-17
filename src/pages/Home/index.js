import './style.scss';

import React from 'react'
import { Container } from 'reactstrap';
import SectionContainer from 'components/SectionContainer/index';
import SectionHeader from 'components/SectionHeader/index';
import CarouselCountainer from 'containers/CarouselContainer/index';

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
          <div>Something below</div>
        </SectionContainer>
      </Container>
    );
  }
}

export default Home;