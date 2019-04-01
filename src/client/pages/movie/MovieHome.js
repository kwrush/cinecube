import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Poster } from '../../components/Poster';
import { chunk } from 'lodash';
import { fetchPopularMovies } from '../../actions/movieActions';
import { getPopularMedia, hasMorePopularMediaResults } from '../../selectors/mediaSelectors';
import { getPosterUrl } from '../../utils/imageUtils';
import { StarRating } from '../../components/StarRating';
import { mapToCssModules } from '../../utils/helpers';

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

  renderMovieList = entities => {
    const { cssModule } = this.props
    const cardClasses = mapToCssModules(
      'd-flex justify-content-center', cssModule);

    return entities.map((movies, index) => {
      return (
        <Row key={`movie_row_${index}`}>
          {
            movies.map(movie => {
              const posterURL = getPosterUrl(movie.posterPath, 'm');
              const previewURL = getPosterUrl(movie.posterPath, 'xs');
              const movieLink = `/movie/${movie.id}`;
              return (
                <Col 
                  key={`movie_${movie.id}`}
                  md="6"
                  sm="12"
                >
                  <Card className={cardClasses}>
                    <Link 
                      to={movieLink}
                      style={{ display: 'block' }}
                    >
                      <Poster
                        imageURL={posterURL}
                        previewURL={previewURL}
                      />
                    </Link>
                    <CardBody>
                      <CardTitle>{movie.title}</CardTitle>
                      <CardSubtitle>
                        <StarRating value={movie.voteAverage} max={10} />
                      </CardSubtitle>
                      <CardText>
                        { movie.overview }
                      </CardText>
                      <Link to={movieLink}>View More</Link>
                    </CardBody>
                  </Card>
                </Col>
              )
            })
          }
        </Row>
      );
    });
  }

  render () {
    const { movies } = this.props;
    const entities = chunk(movies, Math.ceil(movies.length / 2));
    return (
      <Container>
        { this.renderMovieList(entities) }
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