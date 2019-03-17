import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop } from '../Backdrop';

class BackdropCarousel extends React.PureComponent {
  static PropTypes = {
    mediaEntities: Backdrop.PropTypes.mediaEntities,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    mediaEntities: []
  }

  constructor (props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }

  onExiting = () => {
    this.animating = true;
  }

  onExited = () => {
    this.animating = false;
  }

  onScrollCarousel = () => {
    
  }

  nextBackdrop = () => {
    if (this.animating) return;
    const { activeIndex } = this.state;
  }

  prevBackdrop = () => {
    if (this.animating) return;

  }
} 

export default BackdropCarousel;