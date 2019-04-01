import React from 'react';
import { connect } from 'react-redux';
import { fetchPopularMovies } from '../../actions/movieActions';
import { fetchPopularTvs } from '../../actions/tvActions';
import { getPopularMedia } from '../../selectors/mediaSelectors';
import { BackdropCarousel } from '../../components/BackdropCarousel';
import { PosterCarousel } from '../../components/PosterCarousel';

class Home extends React.Component {

  componentWillMount() {
    this.props.getPopularMovies();
    this.props.getPopularTvs();
  }

  render () {

    const { popularMovies, popularTvs } = this.props;

    return (
      <div>
        <BackdropCarousel mediaEntities={popularMovies ? popularMovies.slice(0, 5) : []} />
        <div>
          <h1>Popular Movies</h1>
          <PosterCarousel mediaEntities={popularMovies ? popularMovies.slice(5, 20) : []} />
        </div>
        <div>
          <h1>Popular Series</h1>
          <PosterCarousel mediaEntities={popularTvs ? popularTvs : []} />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  popularMovies: getPopularMedia('movie')(state),
  popularTvs: getPopularMedia('tv')(state)
});

const mapDispatchToProps = (dispatch) => ({
  getPopularMovies: () => {
    dispatch(fetchPopularMovies());
  },
  getPopularTvs: () => {
    dispatch(fetchPopularTvs());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
