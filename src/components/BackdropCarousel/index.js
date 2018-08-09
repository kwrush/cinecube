import React from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselIndicators,
  CarouselControl
} from 'reactstrap';
import Backdrop from '../Backdrop';
import './style.scss';

class BackdropCarousel extends React.PureComponent {

  static PropTypes = {
    backdrops: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        mediaType: PropTypes.oneOf(['movie', 'tv']).isRequired,
        backdropUrl: PropTypes.string.isRequired,
        posterUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        rating: PropTypes.number,
        genreIds: PropTypes.array,
        releasedDate: PropTypes.string,
        className: PropTypes.string,
        cssModule: PropTypes.object,
      })
    )
  }

  static defaultProps = {
    backdrops: []
  }

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    }
  }

  next = () => {

    if (this._animating) return;

    const { activeIndex } = this.state;
    const nextIndex = activeIndex === this.props.backdrops.length - 1 ? 0 : activeIndex + 1;
    this.setState({
      activeIndex: nextIndex
    });
  }

  previous = () => {

    if (this._animating) return;

    const { activeIndex } = this.state;
    const nextIndex = activeIndex === 0 ? this.props.backdrops.length - 1 : activeIndex - 1;
    this.setState({
      activeIndex: nextIndex
    });
  }

  goToIndex = (index) => {

    if (this._animating) return;

    this.setState({
      activeIndex: index
    });
  }

  handleEntering = () => {
    this._animating = true;
  }

  handleAllEntered = () => {
    this._animating = false;
  }

  renderBackdropItems = (items) => {
    return items.map((item, index) => {

      const { id, ...backdropProps } = item;
      const active = index === this.state.activeIndex; 

      return (
        <Backdrop 
          key={id}
          id={id}
          active={active}
          onEntering={this.handleEntering}
          onAllEntered={this.handleAllEntered}
          { ...backdropProps }
        />
      );
    });
  }

  render() {

    let { backdrops } = this.props;
    const { activeIndex } = this.state;

    // Specify key for isndicators
    backdrops.map(item => {
      return Object.assign(item, {key: item.id});
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        interval={false}
      >
        <CarouselIndicators
          styleName="indicators"
          items={backdrops}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {this.renderBackdropItems(backdrops)}
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