import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import {
  Row,
  Col,
  Container
} from 'reactstrap';
import { 
  MoviePosterCard, 
  TvPosterCard 
} from '../../components/PosterCard';
import { ProgressiveImage } from '../../components/ProgressiveImage';
import { getProfileUrl } from '../../utils/imageUtils';
import { getSearchMedia, getSearchQuery } from '../../selectors/searchSelectors';
import { searchByMediaType } from '../../actions/searchActions';

class SearchMulti extends React.PureComponent {
  static propTypes = {
    searchResults: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        schema: PropTypes.oneOf(['movie', 'tv', 'people']).isRequired
      })
    ),
    getMediaEntities: PropTypes.func,
    performSearch: PropTypes.func
  }

  static defaultProps = {
    getSearchResults: () => {},
    performSearch: () => {}
  }

  constructor (props) {
    super(props);
    this.state = {
      query: queryString.parse(this.props.location.search).query
    };
  }

  componentDidUpdate (prevProps, prevState) {
    const q = queryString.parse(this.props.location.search).query;
    const prev = queryString.parse(prevProps.location.search).query;
    
    if (q !== prev) {
      this.setState(prevState => ({
        query: q
      }));
    }

    if (prevState.query !== this.state.query) {
      this.props.performSearch(this.state.query);
    }
  }

  componentDidMount() {
    this.props.performSearch(this.state.query);
  }

  renderMovieResults = results => {
    const { query } = this.state;
    return (
      <div>
        <h2>MOVIE</h2>
        <Row>
          {
            results.slice(0, 4).map((result, index) => (
              <Col 
                key={`movie_${result.id}`}
                lg="3"
                md="3"
                sm="6"
                xs="6"
              >
                <MoviePosterCard media={result} />
              </Col>
            ))
          }
        </Row>
        <Link to={`/search/movie?query=${query}`}>More Results...</Link>
      </div>
    );
  }

  renderTvResults = results => {
    const { query } = this.state;
    return (
      <div>
        <h2>TV SERIES</h2>
        <Row>
          {
            results.slice(0, 4).map((result, index) => (
              <Col 
                key={`tv_${result.id}`}
                lg="3"
                md="3"
                sm="6"
                xs="6"
              >
                <TvPosterCard media={result} />
              </Col>
            ))
          }
        </Row>
        <Link to={`/search/tv?query=${query}`}>More Results...</Link>
      </div>
    );
  }

  renderPeopleResults = results => {
    const { query } = this.state;
    return (
      <div>
        <h2>PEOPLE</h2>
        <Row>
          {
            results.slice(0, 4).map((result, index) => {
              const imgSrc = getProfileUrl(result.profilePath, 'm');
              const preview = getProfileUrl(result.profilePath, 's');
              return (
                <Col
                  key={`people_${result.id}`}
                  lg="3"
                  md="3"
                  sm="6"
                  xs="6"
                >
                  <Link to={`/people/${result.id}`} style={{ display: 'block' }}>
                    <ProgressiveImage 
                      src={imgSrc}
                      placeholder={preview}
                      alt={result.name}
                      blur
                    />
                    <p>{result.name}</p>
                  </Link>
                </Col>
              );
            })
          }
        </Row>
        <Link to={`/search/people?query=${query}`}>More Results...</Link>
      </div>
    );
  }

  render () {
    const { searchResults } = this.props;

    if (!searchResults) return <div>Loading...</div>;

    const movieResults = [];
    const tvResults = [];
    const peopleResults = [];

    for (var i = 0; i < searchResults.length; i++) {
      const result = searchResults[i];
      if (result.mediaType === 'people') {
        peopleResults.push(result);
      } else {
        result.mediaType === 'movie' 
          ? movieResults.push(result)
          : tvResults.push(result);
      }
    }

    return (
      <Container>
        { movieResults.length > 0 && this.renderMovieResults(movieResults) }
        { tvResults.length > 0 && this.renderTvResults(tvResults) }
        { peopleResults.length > 0 && this.renderPeopleResults(peopleResults) }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: getSearchMedia('multi', getSearchQuery(state))(state),
});

const mapDispatchToProps = dispatch => ({
  performSearch: (query) => {
    dispatch(searchByMediaType('multi', { query }));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchMulti));