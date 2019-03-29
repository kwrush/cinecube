/**
 * Inspired by https://github.com/voronianski/react-star-rating-component
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  IoIosStar,
  IoIosStarHalf,
  IoIosStarOutline
} from 'react-icons/io'
import { 
  mapToCssModules,
  roundToNearest 
} from '../../utils/helpers';

class StarRating extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    max: PropTypes.number,
    editable: PropTypes.bool,
    hover: PropTypes.bool,
    color: PropTypes.string,
    onStarClick: PropTypes.func
  }

  static defaultProps = {
    value: 0,
    max: 5,
    editable: false,
    hover: false,
    color: '#ffc107'
  }

  constructor (props) {
    super(props);

    // Round value to the nearest 0.25, such as 4.1->4, 4.3->4.25
    const v = roundToNearest(props.value, 0.25);

    this.state = {
      value: v,
      origValue: v
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.value !== this.props.value) {

      const v = roundToNearest(this.props.value, 0.25);

      this.setState(prevState => ({
        value: v,
        origValue: v
      }));
    }
  }

  onValueChange = i => e => {
    if (!this.props.editable) return;

    const newValue = parseInt(e.currentTarget.value, 10);

    this.setState(prevState => ({
      value: newValue,
      origValue: newValue
    }));
  }

  onStarHover = i => e => {
    e.stopPropagation();

    const { editable, hover } = this.props;

    if (!editable || !hover) return;

    this.setState(prevState => ({
      value: i
    }));
  }

  onStarHoverOut = i => e => {
    e.stopPropagation();

    const { editable, hover } = this.props;

    if (!editable || !hover) return;

    this.setState(prevState => ({
      value: prevState.origValue
    }));
  }

  renderStar = (value, i) => {
    if (value > i) {
      return <IoIosStar />;
    } else if (value === i) {
      return <IoIosStar />;
    } else if (value < i) {
      return i - value <= 0.5 ? <IoIosStarHalf /> : <IoIosStarOutline />
    }
  }

  renderStars = () => {
    const { name, max, editable, color } = this.props; 
    const { value, origValue } = this.state;

    const starCount = 5;
    const v = value * starCount / max;

    const starStyles = {
      margin: '0',
      padding: '0 1px',
      float: 'left',
      corsor: editable ? 'pointer' : 'default',
      color
    };

    const radioStyles = {
      display: 'none',
      position: 'absolute'
    };

    const stars = [];
    for (let i = 1; i <= starCount; i++) {
      const id = `${name}_${i}`;
      const starNode = (
        <input
          name={name} 
          id={id}
          value={i}
          key={`input_${id}`}
          type="radio"
          checked={origValue === i}
          style={radioStyles}
          onChange={this.onValueChange(i)}
        />
      );
      const starLabel = (
        <label 
          htmlFor={id}
          key={`label_${id}`}
          style={starStyles}
          onMouseEnter={this.onStarHover(i)}
          onMouseLeave={this.onStarHoverOut(i)}
        >
          { this.renderStar(v, i) }
        </label>
      );

      stars.push(starNode);
      stars.push(starLabel);
    }

    return stars.length > 0 ? stars : null;
  }

  render () {

    const { className, cssModule } = this.props;
    const classes = mapToCssModules(className, cssModule);

    return (
      <div 
        className={classes} 
        style={{ display: 'inline-block', position: 'relative' }}
      >
        { this.renderStars() }
      </div>
    );
  }
}

export default StarRating;