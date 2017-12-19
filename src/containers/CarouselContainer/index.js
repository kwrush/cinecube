import { connect } from 'react-redux';
import { movieActionTypes } from 'constants/actionTypes';
import { fetchMovies } from 'actions/movieActions';
import BackdropCarousel from 'components/BackdropCarousel/index';

const mapStateToProps = (state) => {
  const entities = state.getIn(['movie', 'entities']);
  const pages = state.getIn(['movie', 'discover', 'pages']);
  return {
    items: pages.size === 0 ? [] : Object.keys(pages.get(`${pages.size}`).toJS()).map(id => entities.getIn(['movie', `${id}`]).toJS())
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadItems: () => dispatch(
      fetchMovies(movieActionTypes.DISCOVER_MOVIE_REQUEST))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BackdropCarousel);