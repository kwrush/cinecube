import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { Backdrop } from '../components/Backdrop';
import { fetchPopularMovies } from '../actions/movieActions';
import { getPopularMedia } from '../selectors/mediaSelectors';
import { getPosterUrl } from '../utils/imageUtils';

class Home extends React.Component {

  componentWillMount() {
    this.props.getPopularMovies();
    this.props.getInTheatreMovies();
  }

  render () {

    const { popularMovies } = this.props;

    return (
      <Container>
        <div>This is home page</div>
        <Backdrop mediaEntities={popularMovies ? popularMovies.slice(0, 4) : []} />
      </Container>
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
