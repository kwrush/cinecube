import React from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col, Button } from 'reactstrap';

import { getCurrentPage, getTotalPages } from 'selectors/commonSelectors';
import { getUpcomingMovies } from 'selectors/movieSelectors';
import { fetchMoviesIfNeeded } from 'actions/movieActions';
import { movieActionTypes as actionTypes } from 'constants/actionTypes';

import { mapToCssModules } from 'utils/helpers';

import PosterCard from 'components/PosterCard/index';

const mapStateToProps = (state) => {
  return {
    currentPage: getCurrentPage(state, 'movie', 'upcoming'),
    totalPages: getTotalPages(state, 'movie', 'upcoming'),
    upcomingMovies: getUpcomingMovies(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUpcomingMovies: (params) => dispatch(fetchMoviesIfNeeded(actionTypes.FETCH_UPCOMING_MOVIE_REQUEST, params)) 
  }
};

class UpcomingMovies extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      movies: this.props.upcomingMovies.toList(),
      hasMore: this.props.currentPage < this.props.totalPages
    };
  }

  componentWillMount () {
    this.props.loadUpcomingMovies();
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      movies: this.state.movies.concat(nextProps.upcomingMovies.toList()),
      hasMore: nextProps.currentPage < nextProps.totalPages
    });
  }

  render () {
    const { className, cssModules } = this.props;
    const classes = mapToCssModules(className, cssModules);

    const posterCards = this.state.movies.toList().map((movie) => {
       return this.renderPosterCard(movie);
    });

    const loadMoreButton = (
      <div style={{
        margin: '1rem 0'
      }}>
        <Button color="info" onClick={this.loadMore} block>More...</Button>
      </div>
    );

    return (
      <Container className={classes}>
        <Row>{ posterCards }</Row>
        { this.state.hasMore ? loadMoreButton : null }
      </Container>
    );
  }

  loadMore = () => {
    this.props.loadUpcomingMovies({
      page: this.props.currentPage + 1
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMovies);
