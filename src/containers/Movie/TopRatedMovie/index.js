import React from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'reactstrap';

import { getTopRatedMovies } from 'selectors/movieSelectors';
import { fetchMoviesIfNeeded } from 'actions/movieActions';
import { movieActionTypes as actionTypes } from 'constants/actionTypes';

import { mapToCssModules } from 'utils/helpers';

import PosterCard from 'components/PosterCard/index';

const mapStateToProps = (state) => {
  return {
    topRatedMovies: getTopRatedMovies(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopRatedMovies: (params) => dispatch(fetchMoviesIfNeeded(actionTypes.FETCH_TOP_RATED_MOVIE_REQUEST, params)) 
  }
};

class TopRatedMovies extends React.Component {

  componentWillMount () {
    this.props.loadTopRatedMovies();
  }

  render () {
    const { topRatedMovies, className, cssModules } = this.props;
    const classes = mapToCssModules(className, cssModules);

    const posterCards = topRatedMovies.toList().map((movie) => {
       return this.renderPosterCard(movie);
    });

    return (
      <Container className={classes}>
        <Row>{ posterCards }</Row>
      </Container>
    );
  }

  renderPosterCard = (movie) => {
    const id = movie.get('id');
    return (
      <Col key={id} md="6" sm="12" xs="12">
        <PosterCard 
          id={id}
          mediaType="movie"
          title={movie.get('title')}
          posterUrl={movie.getIn(['posterPath', 's'])}
          releaseDate={movie.get('releaseDate')}
          intro={movie.get('overview')}
        />
      </Col>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopRatedMovies);
