import React from 'react';
import ReactDOM from 'react-dom';
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
      activeIndex: 0,
      innerCarouselHeight: 0
    }
  }

  componentWillMount () {
    this._innerCarouselNode = null;
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUpdate (nextProps, nextState) {
    const newHeight = `${nextState.innerCarouselHeight}px`;
    this._innerCarouselNode.style.height = newHeight;
  }

  handleWindowResize = (event) => {
    // if window is resized, the height has to be recalculated
    this.updateInnerCarouselHeight();
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

    /* Dirty fix for blink issue in reacstap carousel 
    based on https://github.com/reactstrap/reactstrap/issues/677#issuecomment-375242805,
    It seeems that set height of carousel-inner can fix the issue */
    if (this._innerCarouselNode === null) {
      const _carouselNode = ReactDOM.findDOMNode(this._carousel)
      this._innerCarouselNode = _carouselNode.querySelector('div[role="listbox"]');
    } 
  }

  handleAllEntered = () => {
    this._animating = false;
    this.updateInnerCarouselHeight();
  }

  updateInnerCarouselHeight = () => {
    const _activeItemNode = this._innerCarouselNode.querySelector('div[class*="active"]');

    if (_activeItemNode
      && _activeItemNode.offsetHeight !== this.state.innerCarouselHeight) {

      this.setState({
        innerCarouselHeight: _activeItemNode.offsetHeight
      });
    }
  }

  renderBackdropItems = (items) => {
    return items.map((item, index) => {

      const { id, ...backdropProps } = item;
      const active = index === this.state.activeIndex; 

      return (
        <Backdrop
          key={id}
          id={id}
          index={index}
          active={active}
          onEntering={this.handleEntering}
          onChildrenEntered={this.handleAllEntered}
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
        ref={ el => this._carousel = el }
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