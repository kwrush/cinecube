import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Row,
  Col
} from 'reactstrap';
import { TvPosterCard } from '../../components/PosterCard';
import { fetchPopularTvs } from '../../actions/tvActions';
import { getPopularMedia, hasMorePopularMediaResults } from '../../selectors/mediaSelectors';

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

  renderMovieList = tvs => {
    return (
      <Row>
        {
          tvs.map(tv => (
            <Col
              key={`tv_${tv.id}`}
              lg="3"
              md="4"
              sm="6"
              xs="12"
            >
              <TvPosterCard media={tv} />
            </Col>
          ))
        }
      </Row>
    );
  }

  render () {
    const { tvs } = this.props;
    return (
      <Container>
        { this.renderMovieList(tvs) }
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