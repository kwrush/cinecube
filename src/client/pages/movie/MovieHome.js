import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { fetchPopularMovies } from '../../actions/movieActions';
import { getPopularMedia, hasMorePopularMediaResults } from '../../selectors/mediaSelectors';
import { MoviePosterCard } from '../../components/PosterCard';

class MovieHome extends React.Component {

  static propTypes = {
    movies: PropTypes.array,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    movies: []
  }

  constructor (props) {
    super(props);
    this.state = {
      page: 1
    }
  }

  componentWillMount() {
    this.loadMovie();
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.page !== this.state.page)
      this.loadMovie();
  }

  loadMovie = () => {
    if (hasMorePopularMediaResults('movie')) {
      this.props.getPopularMovies(this.state.page);
    }
  }
 
  nextPage = e => {
    e.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
  }

  renderMovieList = movies => {
    return (
      <Row>
        {
          movies.map(movie => (
            <Col
              key={`movie_${movie.id}`}
              lg="3"
              md="4"
              sm="6"
              xs="12"
            >
              <MoviePosterCard media={movie} />
            </Col>
          ))
        }
      </Row>
    );
  }

  render () {
    return (
      <Container>
        { this.renderMovieList(this.props.movies) }
        <Button onClick={this.nextPage}>Load more</Button>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  movies: getPopularMedia('movie')(state)
})

const mapDispatchToProps = dispatch => ({
  getPopularMovies: page => {
    dispatch(fetchPopularMovies({ page: page }))
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(MovieHome);