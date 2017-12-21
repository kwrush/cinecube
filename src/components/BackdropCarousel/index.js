import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselCaption,
  CarouselControl,
  CarouselIndicators,
  CarouselItem
} from 'reactstrap';
import ImageCard from 'components/ImageCard/index';
import { mapToCssModules } from 'utils/helpers';

const propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      genreIds: PropTypes.arrayOf(PropTypes.number),
      posterUrl: PropTypes.string,
      backdropUrl: PropTypes.string
    })
  )
};

const defaultProps = {
  items: []
}

class BackdropCarousel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  componentWillMount () {
    const { loadItems } = this.props;
    loadItems();
  }

  onExiting = () => {
    this.animating = true;
  }
  
  onExited = () => {
    this.animating = false;
  }
  
  nextSlide = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.items.length - 1 
      ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }
  
  prevSlide = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0
      ? this.props.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }
  
  goToSlide = (index) => {
    if (this.animating) return;
    if (index >= 0 && index < this.props.items.length) {
      this.setState({ activeIndex: index });
    } 
  }
  
  render () {
    const { activeIndex } = this.state;
    const { items, className, cssModule } = this.props;
    const classes = mapToCssModules(className, cssModule);

    const keys = [];
    
    const slides = items.map((item) => {
      keys.push({
        key: item.id
      });

      return (
        <CarouselItem
          key={item.id}
          src={item.backdropPath.l}
          altText={item.title || item.name}
          onExiting={this.onExiting}
          onExited={this.onExited}
          styleName="item"
        >
          <CarouselCaption captionText={item.releaseDate || ''} captionHeader={item.title} />  
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