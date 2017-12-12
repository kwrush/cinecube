import { connect } from 'react-redux';
import { discoverMovie } from '../../actions/movieActions';
import BackdropCarousel from 'components/BackdropCarousel/index';

const mapStateToProps = (state) => {
  return {
    items: state.movies.discover
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadItems: () => dispatch(discoverMovie())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BackdropCarousel);