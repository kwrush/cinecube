import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import BackdropCarousel from '../components/BackdropCarousel';
import PosterBanner from '../components/PosterBanner';
import { getPopularMovies, getInTheatreMovies } from '../selectors/movieSelectors';
import { fetchMovieList } from '../actions/movieActions';

class Home extends React.Component {

  componentWillMount() {
    this.props.getPopularMovies();
    this.props.getInTheatreMovies();
  }

  render () {

    const { popularMovies, inTheatreMovies } = this.props;

    return (
      <Container>
        <div>This is home page</div>
        <BackdropCarousel backdrops={popularMovies ? popularMovies.slice(0, 4) : []} />
        <PosterBanner 
          items={
            inTheatreMovies ? inTheatreMovies.slice(0, 4) : [1]
          }
          title="Now Playing"
        />
      </Container>
    );
  }
};

const mapStateToProps = (state) => ({
  popularMovies: getPopularMovies(state),
  inTheatreMovies: getInTheatreMovies(state)
});

const mapDispatchToProps = (dispatch) => ({
  getPopularMovies: () => {
    dispatch(fetchMovieList('popular', { page: 1 }));
  },
  getInTheatreMovies: () => {
    dispatch(fetchMovieList('inTheatre', { page: 1 }));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
