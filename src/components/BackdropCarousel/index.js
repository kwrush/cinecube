import './style.scss';

import React from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  Carousel,
  CarouselCaption,
  CarouselControl,
  CarouselIndicators,
  CarouselItem
} from 'reactstrap';
import { mapToCssModules } from 'utils/helpers';

const propTypes = {
  items: ImmutablePropTypes.mapOf(
    ImmutablePropTypes.mapContains({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      releaseDate: PropTypes.string,
      posterUrl: ImmutablePropTypes.map,
      backdropUrl: ImmutablePropTypes.map,
    })
  )
};

const defaultProps = {
  items: Map()
}

class BackdropCarousel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  onExiting = () => {
    this.animating = true;
  }
  
  onExited = () => {
    this.animating = false;
  }
  
  nextSlide = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.items.size - 1 
      ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }
  
  prevSlide = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0
      ? this.props.items.size - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }
  
  goToSlide = (index) => {
    if (this.animating) return;
    if (index >= 0 && index < this.props.items.size) {
      this.setState({ activeIndex: index });
    } 
  }
  
  render () {
    const { activeIndex } = this.state;
    const { items, className, cssModule } = this.props;
    const classes = mapToCssModules(className, cssModule);
    const keys = [];

    const slides = items.toList().map((item, index) => {

      let captionText = item.get('releaseDate') || '';
      let captionHeader = item.get('title') || item.get('name');

      let id = index + '-' + item.get('id');

      // for indexing carousel indicators
      keys.push({
        key: id
      });

      return (
        <CarouselItem
          key={id}
          src={item.getIn(['backdropPath', 'l'])}
          altText={captionHeader}
          onExiting={this.onExiting}
          onExited={this.onExited}
          styleName="item"
        >
          <CarouselCaption captionText={captionText} captionHeader={captionHeader} />  
        </CarouselItem>
      );
    });

    return (
      <div className={classes}>
        <Carousel
          activeIndex={activeIndex}
          next={this.nextSlide}
          previous={this.prevSlide}
          interval={false}
        >
          <CarouselIndicators 
            styleName="carousel-indicator"
            items={keys} 
            activeIndex={activeIndex} 
            onClickHandler={this.goToSlide} 
          />
          {slides}
          <CarouselControl direction="prev" directionText="previous" onClickHandler={this.prevSlide} />
          <CarouselControl direction="next" directionText="next" onClickHandler={this.nextSlide} />
        </Carousel>
      </div>
    );
  }
}

BackdropCarousel.propTypes = propTypes;
BackdropCarousel.defaultProps = defaultProps;

export default BackdropCarousel;