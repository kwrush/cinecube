/**
 * Component shows loading animation
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Util } from 'reactstrap';
import './style.scss';

const propTypes = {
  cssModule: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  spacing: PropTypes.number,
  units: PropTypes.string,
  loaderNumber: PropTypes.number,
  isLoading: PropTypes.bool
};

const defaultProps = {
  color: '#FFFFFF',
  width: 50,
  height: 30,
  spacing: 4,
  units: 'px',
  loaderNumber: 5,
  isLoading: true
};

const Loader = props => {

  let { className, cssModule, spacing, units, color, width, height, loaderNumber } = props;
  const classes = Util.mapToCssModules(className, cssModule);

  let margin = spacing / 2;
  let subW = Math.floor((width - spacing * loaderNumber) / loaderNumber);
  let subH = height;

  // make rectangles
  const subs = Array(loaderNumber).fill().map((s, i) => {
    let styles = {
      marginLeft: `${margin}${units}`,
      marginRight: `${margin}${units}`,
      backgroundColor: color,
      width: `${subW}${units}`,
      height: `${subH}${units}`,
      float: 'left',
      animationDuration: '1.2s',
      animationDelay: `${i * 0.1}s`,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out'
    };
    
    return <div key={i} style={styles} styleName="loader-sub"></div>
  });

  return props.isLoading ? 
    (
      <div styleName="loader" className={classes}>
        {subs}
      </div>
    ) : null;
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;