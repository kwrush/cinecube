import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../components/Header';
import { fetchPopularMovies } from '../actions/movieActions';
import { getPopularMedia } from '../selectors/mediaSelectors';
import { BackdropCarousel } from '../components/BackdropCarousel';

class Home extends React.Component {

  componentWillMount() {
    this.props.getPopularMovies();
    this.props.getInTheatreMovies();
  }

  render () {

    const { popularMovies } = this.props;

    return (
      <div>
        <Header />
        <BackdropCarousel mediaEntities={popularMovies ? popularMovies.slice(0, 4) : []} />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  popularMovies: getPopularMedia('movie')(state),
});

const mapDispatchToProps = (dispatch) => ({
  getPopularMovies: () => {
    dispatch(fetchPopularMovies());
  },
  getInTheatreMovies: () => {
    dispatch(fetchPopularMovies());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
