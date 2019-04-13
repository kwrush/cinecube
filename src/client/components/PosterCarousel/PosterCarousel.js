import React from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  Container,
  Row,
  Col
} from 'reactstrap';
import MediaQuery from 'react-responsive';
import { mapToCssModules } from '../../utils/helpers';
import { chunk } from 'lodash';
import { MoviePosterCard, TvPosterCard } from '../PosterCard';

class PosterCarousel extends React.PureComponent {
  static propTypes = {
    mediaEntities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        posterPath: PropTypes.string,
        title: PropTypes.string.isRequired,
        mediaType: PropTypes.string.isRequired,
        voteAverage: PropTypes.number.isRequired
      })
    ),
    // for responsive testing
    _values: PropTypes.object,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    mediaEntities: [],
    _values: {}
  }

  constructor (props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };

    this._animating = false;
  }

  next = () => {
    if (this._animating) return;

    this.setState((state, props) => {
      const { activeIndex } = state;
      const newIndex = activeIndex === this._slidesCount - 1 ? 0 : activeIndex + 1;
      return {
        activeIndex: newIndex
      };
    });
  }

  previous = () => {
    if (this._animating) return;

    this.setState((state, props) => {
      const { activeIndex } = state;
      const newIndex = activeIndex === 0 ? this._slidesCount - 1 : activeIndex - 1;
      return {
        activeIndex: newIndex
      };
    });
  }

  onExited = () => {
    this._animating = false;
  }

  onExiting = () => {
    this._animating = true;
  }

  renderCarouselItem = entities => {
    const { cssModule } = this.props;
    const posterContainerClasses = mapToCssModules(
      'd-flex justify-content-center', cssModule);
    const posterClasses = mapToCssModules('ml-3 mr-3', cssModule);

    return (
      <Container className={posterContainerClasses}>
        <Row>
        {
          entities.map((media, index) => (
            <Col
              key={`poster_${media.id}`}
              className={posterClasses}
            >
              {
                media.mediaType === 'movie'
                  ? <MoviePosterCard media={media} />
                  : <TvPosterCard media={media} />
              }
            </Col>
          ))
        }
        </Row>
      </Container>
    );
  }

  renderCarousel = entities => {
    const { className, cssModule } = this.props;
    const { activeIndex } = this.state;
    const classes = mapToCssModules(className, cssModule);

    const carouselItems = entities.map((contents, index) => (
      <CarouselItem
        key={`poster_section_${index}`}
        onExited={this.onExited}
        onExiting={this.onExiting}
      >
        { this.renderCarouselItem(contents) }
      </CarouselItem>
    ));

    return (
      <Carousel
        className={classes}
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        interval={0}
      >
        { carouselItems }
        <CarouselControl 
          direction="prev" 
          directionText="Previous" 
          onClickHandler={this.previous} 
        />
        <CarouselControl 
          direction="next" 
          directionText="Next" 
          onClickHandler={this.next} 
        />
      </Carousel>
    );
  }

  render () {
    const { mediaEntities, _values } = this.props;
    return (
      <MediaQuery maxWidth={767} values={_values}>
        {
          match => {
            const itemPerSlice = match ? 2 : 4;
            const entities = chunk(mediaEntities, itemPerSlice);
            this._slidesCount = entities.length;
            return this.renderCarousel(entities);
          }
        }
      </MediaQuery>
    );
  }
}

export default PosterCarousel;