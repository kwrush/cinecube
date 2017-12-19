import { connect } from 'react-redux';
import { movieActionTypes } from 'constants/actionTypes';
import { fetchMovies } from 'actions/movieActions';
import BackdropCarousel from 'components/BackdropCarousel/index';

const mapStateToProps = (state) => {
  const entities = state.getIn(['movie', 'entities']);
  const entity = state.getIn(['movie', 'discover', 'result']);
  return {
    items: Object.keys(entity.toJS()).map(id => entities.getIn(['movie', `${id}`]).toJS())
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadItems: () => dispatch(
      fetchMovies(movieActionTypes.DISCOVER_MOVIE_REQUEST))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BackdropCarousel);