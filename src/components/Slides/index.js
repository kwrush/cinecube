import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'reactstrap';

class Slides extends React.Component {

  static propTypes = {

  }

  static defaultTypes = {

  }

  constructor (props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  render () {
    return <Carousel></Carousel>;
  }
}

export default Slides;