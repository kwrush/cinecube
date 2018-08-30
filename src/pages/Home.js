import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import BackdropCarousel from '../components/BackdropCarousel';
import PosterBanner from '../components/PosterBanner';
import { getPopularMovies } from '../selectors/movieSelectors';
import { fetchMovieListIfNeeded } from '../actions/movieActions';

class Home extends React.Component {

  componentWillMount() {
    this.props.getPopularMovies();
  }

  render () {

    const { popularMovies } = this.props;

    return (
      <Container>
        <div>This is home page</div>
        <BackdropCarousel backdrops={popularMovies ? popularMovies.slice(0, 4) : []} />
        <PosterBanner 
          items={
            popularMovies ? popularMovies.slice(4, 8) : []
          }
          title="Popular Movies"
        />
      </Container>
    );
  }
};

const mapStateToProps = (state) => ({
  popularMovies: getPopularMovies(state)
});

const mapDispatchToProps = (dispatch) => ({
  getPopularMovies: () => {
    dispatch(fetchMovieListIfNeeded('popular'));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
