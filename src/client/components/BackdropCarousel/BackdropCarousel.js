import React from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';
import { Backdrop } from '../Backdrop';
import { mapToCssModules } from '../../utils/helpers';
import './BackdropCarousel.scss';

class BackdropCarousel extends React.PureComponent {
  static propTypes = {
    mediaEntities: PropTypes.arrayOf(
      Backdrop.propTypes.media
    ),
    initialIndex: PropTypes.number,
    onActiveIndex: PropTypes.func,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    mediaEntities: [],
    initialIndex: 0,
    onActiveIndex: () => {}
  }

  constructor (props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }

  componentDidMount () {
    if (this.props.initialIndex !== this.state.activeIndex) {
      this.goToSlice(this.props.initialIndex);
    }
  }

  componentDidUpdate () {
    this.props.onActiveIndex(this.state.activeIndex);
  }

  onExiting = () => {
    this._animating = true;
    this.setState(prevState => ({
      showOverview: false
    }));
  }

  onExited = () => {
    this._animating = false;
  }

  nextSlice = () => {
    if (this._animating) return;

    this.setState((state, props) => {
      const { mediaEntities } = props;
      const { activeIndex } = state;
      const newIndex = activeIndex === mediaEntities.length - 1 ? 0 : activeIndex + 1;
      return {
        activeIndex: newIndex
      };
    });
  }

  prevSlice = () => {
    if (this._animating) return;

    this.setState((state, props) => {
      const { mediaEntities } = props;
      const { activeIndex } = state;
      const newIndex = activeIndex === 0 ? mediaEntities.length - 1 : activeIndex - 1;
      return {
        activeIndex: newIndex
      };
    });
  }

  goToSlice = (newIndex) => {
    if (this._animating || newIndex < 0 || newIndex >= this.props.mediaEntities.length) 
      return;

    this.setState({
      activeIndex: newIndex
    });
  }

  renderCarouselItems = (slices = []) => {

    return slices.map((slice, i) => (
      <CarouselItem
        key={`backdrop_${i}`}
        onExited={this.onExited}
        onExiting={this.onExiting}
      >
        <Backdrop media={slice} show={i === this.state.activeIndex}/>
      </CarouselItem>
    ));
  }

  render () {
    const { mediaEntities, className, cssModule } = this.props;
    const { activeIndex } = this.state;
    const classes = mapToCssModules(className, cssModule);

    const backdrops = this.renderCarouselItems(mediaEntities);

    return (
      <Carousel
        styleName="backdrop-carousel"
        className={classes}
        activeIndex={activeIndex}
        next={this.nextSlice}
        previous={this.prevSlice}
        ride={'carousel'}
        interval={0}
      >
        <CarouselIndicators
          styleName="carousel-indicator-dots override"
          items={backdrops}
          activeIndex={activeIndex}
          onClickHandler={this.goToSlice}
        />
        {backdrops}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.prevSlice}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.nextSlice}
        />
      </Carousel>
    );
  }
} 

export default BackdropCarousel;