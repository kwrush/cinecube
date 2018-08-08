import React from 'react';
import PropTypes from 'prop-types';
import { 
  Carousel,
  CarouselIndicators,
  CarouselControl
} from 'reactstrap';

import './style.scss';

class BackdropCarousel extends React.Component {

  static PropTypes = {
    backdrops: PropTypes.array
  }

  static defaultProps = {
    backdrops: []
  }
  
  constructor (props) {
    super(props);

    this.state = {
      activeIndex: 0
    }
  }

  next = () => {

  }

  previous = () => {

  }

  goToIndex = (index) => {
    
  }

  renderBackdropItems = (items) => {
    const slides = items.map((item) => {

    });

    return slides;
  }

  render () {

    const { backdrops } = this.props;

    return (
      <Carousel>
        <CarouselIndicators 
          styleName="indicators"
          items={backdrops}
          activeIndex={this.state.activeIndex}
          onClickHandler={this.goToIndex}
        />
        { this.renderBackdropItems(backdrops) }
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
}

export default BackdropCarousel;