import { connect } from 'react-redux';
import { fetchMovies } from 'actions/movieActions';
import BackdropCarousel from 'components/BackdropCarousel/index';

const mapStateToProps = (state) => {
  const entities = state.getIn(['movie', 'entities']);
  const discovery = state.getIn(['movie', 'discover', 'result']);
  return {
    items: discovery.map(id => entities.get(id)).slice(0, 8)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadItems: () => dispatch(fetchMovies('discover'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BackdropCarousel);