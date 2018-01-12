import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import { movieDomains } from 'constants/domains';
import { getPopularMovies, getInTheatreMovies, getUpcomingMovies } from 'selectors/movieSelectors';
import { movieActionTypes as actionTypes } from 'constants/actionTypes';
import { fetchMoviesIfNeeded } from 'actions/movieActions';
import { mapToCssModules } from 'utils/helpers';

import LoadingHOC from 'components/LoadingHOC/index';
import SectionContainer from 'components/SectionContainer/index';
import SectionHeader from 'components/SectionHeader/index';
import PosterPanel from 'components/PosterPanel/index';

const mapStateToProps = (state) => {
  return {
    popularMovies: getPopularMovies(state).slice(0, 8),
    inTheatreMovies: getInTheatreMovies(state).slice(0, 8),
    upcomingMovies: getUpcomingMovies(state).slice(0, 8)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPopularMovies: () => dispatch(fetchMoviesIfNeeded(actionTypes.FETCH_POPULAR_MOVIE_REQUEST)),
    loadInTheatreMovies: () => dispatch(fetchMoviesIfNeeded(actionTypes.FETCH_IN_THEATRE_MOVIE_REQUEST)),
    loadUpcomingMovies: () => dispatch(fetchMoviesIfNeeded(actionTypes.FETCH_UPCOMING_MOVIE_REQUEST)),
  };
};

const PosterPanelHOC = LoadingHOC(PosterPanel);

const Movie = (props) => {
  
  const { 
    popularMovies, 
    inTheatreMovies,
    upcomingMovies,
    loadPopularMovies,
    loadInTheatreMovies,
    loadUpcomingMovies,
    className,
    cssModule
  } = props;

  const classes = mapToCssModules(className, cssModule);
  
  return (
    <Container className={classes}>
      <SectionContainer>
        <SectionHeader
          title="Popular"
          url={movieDomains.popular}
        />
        <PosterPanelHOC
          items={popularMovies}
          loadData={loadPopularMovies}
          domain={movieDomains.info}
          posterSize={'m'}
          columns={8}
        />
      </SectionContainer>
      <SectionContainer>
        <SectionHeader
          title="Now Playing"
          url={movieDomains.popular}
        />
        <PosterPanelHOC
          items={inTheatreMovies}
          loadData={loadInTheatreMovies}
          domain={movieDomains.info}
          posterSize={'m'}
          columns={8}
        />
      </SectionContainer>
      <SectionContainer>
        <SectionHeader
          title="Upcoming"
          url={movieDomains.popular}
        />
        <PosterPanelHOC
          items={upcomingMovies}
          loadData={loadUpcomingMovies}
          domain={movieDomains.info}
          posterSize={'m'}
          columns={8}
        />
      </SectionContainer>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);