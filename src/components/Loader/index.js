/**
 * Component shows loading animation
 */
import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  cssModule: PropTypes.object,
  loading: PropTypes.bool,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  spacing: PropTypes.number,
  units: PropTypes.string,
  loaderNumber: PropTypes.number
};

const defaultProps = {
  loading: true,
  color: '#FFFFFF',
  width: 5,
  height: 35,
  spacing: 2,
  units: 'px',
  loaderNumber: 6
};

const Loader = props => {

  // make rectangles
  const subs = Array(props.loaderNumber).fill().map((s, i) => {
    let styles = {
      margin: `${props.spacing}${props.units}`,
      backgroundColor: props.color,
      width: `${props.width}${props.units}`,
      height: `${props.height}${props.units}`,
      display: 'inline-block',
      animationDuration: '1.2s',
      animationDelay: `${i * 0.1}s`,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out'
    };
    
    return <div key={i} style={styles} styleName="loader-sub"></div>
  });

  return props.loading ? 
    (
      <div styleName="loader">
        {subs}
      </div>
    ) : null;
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;