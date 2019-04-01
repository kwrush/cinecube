import React from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselItem,
  CarouselControl
} from 'reactstrap';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import { mapToCssModules } from '../../utils/helpers';
import { Poster } from '../Poster';
import { chunk } from 'lodash';
import { getPosterUrl } from '../../utils/imageUtils';

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
      <div className={posterContainerClasses}>
        {
          entities.map((media, index) => {
            const posterURL = getPosterUrl(media.posterPath, 's');
            const previewURL = getPosterUrl(media.posterPath, 'xs');
            return (
              <div 
                key={`poster_${media.id}`}
                className={posterClasses}
              >
                <Link 
                  style={{ display: 'block' }} 
                  to={`/${media.mediaType}/${media.id}`}
                >
                  <Poster
                    imageURL={posterURL}
                    previewURL={previewURL}
                  />
                </Link>
              </div>
            );
          })
        }
      </div>
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