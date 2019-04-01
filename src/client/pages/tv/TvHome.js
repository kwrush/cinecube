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
import { fetchPopularTvs } from '../../actions/tvActions';
import { getPopularMedia, hasMorePopularMediaResults } from '../../selectors/mediaSelectors';
import { getPosterUrl } from '../../utils/imageUtils';
import { StarRating } from '../../components/StarRating';
import { mapToCssModules } from '../../utils/helpers';

class MovieHome extends React.Component {

  static propTypes = {
    tvs: PropTypes.array,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    tvs: []
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
    if (hasMorePopularMediaResults('tv')) {
      this.props.getPopularTvs(this.state.page);
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

    return entities.map((tvs, index) => {
      return (
        <Row key={`tv_row_${index}`}>
          {
            tvs.map(tv => {
              const posterURL = getPosterUrl(tv.posterPath, 'm');
              const previewURL = getPosterUrl(tv.posterPath, 'xs');
              const tvLink = `/tv/${tv.id}`;
              return (
                <Col 
                  key={`tv_${tv.id}`}
                  md="6"
                  sm="12"
                >
                  <Card className={cardClasses}>
                    <Link 
                      to={tvLink}
                      style={{ display: 'block' }}
                    >
                      <Poster
                        imageURL={posterURL}
                        previewURL={previewURL}
                      />
                    </Link>
                    <CardBody>
                      <CardTitle>{tv.title}</CardTitle>
                      <CardSubtitle>
                        <StarRating value={tv.voteAverage} max={10} />
                      </CardSubtitle>
                      <CardText>
                        { tv.overview }
                      </CardText>
                      <Link to={tvLink}>View More</Link>
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
    const { tvs } = this.props;
    const entities = chunk(tvs, Math.ceil(tvs.length / 2));
    return (
      <Container>
        { this.renderMovieList(entities) }
        <Button onClick={this.nextPage}>Load more</Button>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  tvs: getPopularMedia('tv')(state)
})

const mapDispatchToProps = dispatch => ({
  getPopularTvs: page => {
    dispatch(fetchPopularTvs({ page: page }))
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(MovieHome);