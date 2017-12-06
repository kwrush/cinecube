/**
 * Loading components with ripple effect 
 */
import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { mapToCssModules } from 'utils/helpers';

const propTypes = {
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  size: 'normal'
}

const Loading = (props) => {

  const { size, className, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);

  return (
    <div styleName={`loading loading-${size}`} className={classes}>
      <div styleName="loading-ripple"></div>
      <div styleName="loading-ripple"></div>
      <div styleName="loading-ripple"></div>
    </div>
  );
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;