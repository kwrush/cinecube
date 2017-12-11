import './style.scss';

import React from 'react';
import { Container } from 'reactstrap';
import SectionContainer from 'components/SectionContainer/index';
import SectionHeader from 'components/SectionHeader/index';
import ShutterPanel from 'components/ShutterPanel/index';

class Movie extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Container>
        <SectionContainer>
          <SectionHeader
            title="Movies"
            url="/movie/popular"
          />
          <ShutterPanel />
        </SectionContainer>
      </Container>
    );
  }
}

export default Movie;