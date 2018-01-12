import './style.scss';

import React from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import { movieDomains, tvDomains } from 'constants/domains';
import { getDiscoverMovies, getInTheatreMovies } from 'selectors/movieSelectors';
import { getDiscoverTvs, getOnAirTvs } from 'selectors/tvSelectors';
import { movieActionTypes, tvActionTypes } from 'constants/actionTypes';
import { fetchMoviesIfNeeded } from 'actions/movieActions';
import { fetchTvShowsIfNeeded } from 'actions/tvActions';
import { mapToCssModules } from 'utils/helpers';

import LoadingHOC from 'components/LoadingHOC/index';
import SectionContainer from 'components/SectionContainer/index';
import SectionHeader from 'components/SectionHeader/index';
import BackdropCarousel from 'components/BackdropCarousel/index';
import PosterPanel from 'components/PosterPanel/index';

const mapStateToProps = (state) => {
  return {
    discoverMovies: getDiscoverMovies(state).slice(0, 4),
    discoverTvs: getDiscoverTvs(state).slice(0, 3),
    inTheatreMovies: getInTheatreMovies(state).slice(0, 4),
    onAirTvs: getOnAirTvs(state).slice(0, 4)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDiscovery: () => {
      dispatch(fetchMoviesIfNeeded(movieActionTypes.DISCOVER_MOVIE_REQUEST));
      dispatch(fetchTvShowsIfNeeded(tvActionTypes.DISCOVER_TV_REQUEST));
    },
    loadInTheatreMovies: () => dispatch(fetchMoviesIfNeeded(movieActionTypes.FETCH_IN_THEATRE_MOVIE_REQUEST)),
    loadOnAirTvs: () => dispatch(fetchTvShowsIfNeeded(tvActionTypes.FETCH_ON_AIR_TV_REQUEST))
  };
}

const CarouselHOC = LoadingHOC(BackdropCarousel);
const InTheatreMovieHOC = LoadingHOC(PosterPanel);
const OnAirTvHOC = LoadingHOC(PosterPanel);

const Home = (props) => {
  const { 
    discoverMovies, 
    discoverTvs,
    inTheatreMovies,
    onAirTvs,
    loadDiscovery,
    loadInTheatreMovies,
    loadOnAirTvs,
    className,
    cssModule
  } = props;

  const classes = mapToCssModules(className, cssModule);
    
  const discover = discoverMovies.concat(discoverTvs);

  return (
    <Container className={classes}>
      <SectionContainer>
        <SectionHeader title="Discover" />
        <CarouselHOC 
          items={discover} 
          loadData={loadDiscovery}
          loadingEffectSize={'large'}
        />
      </SectionContainer>
      <Row>
        <Col sm="12" md="6">
          <SectionContainer>
            <SectionHeader title="Now Playing" />
            <InTheatreMovieHOC
              items={inTheatreMovies}
              loadData={loadInTheatreMovies}
              domain={movieDomains.info}
              posterSize={'s'}
            />
          </SectionContainer>
        </Col>
        <Col sm="12" md="6">
          <SectionContainer>
            <SectionHeader title="On the Air" />
            <OnAirTvHOC
              items={onAirTvs}
              loadData={loadOnAirTvs}
              domain={tvDomains.info}
              posterSize={'s'}
            />
          </SectionContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);