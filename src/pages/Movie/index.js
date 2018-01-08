import React from 'react';
import { Container } from 'reactstrap';
import SectionContainer from 'components/SectionContainer/index';
import SectionHeader from 'components/SectionHeader/index';

const Movie = () => (
  <Container>
    <SectionContainer>
      <SectionHeader
        title="Movies"
        url="/movie/popular"
      />
    </SectionContainer>
  </Container>
);

export default Movie;