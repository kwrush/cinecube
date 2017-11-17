/**
 * Loading components with ripple effect 
 */
import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  size: PropTypes.oneOf(['small', 'normal', 'large'])
};

const defaultProps = {
  size: 'normal'
}

const Loading = (props) => {

  const { size } = props;

  return (
    <div styleName={`loading loading-${size}`}>
      <div styleName="loading-ripple"></div>
      <div styleName="loading-ripple"></div>
      <div styleName="loading-ripple"></div>
    </div>
  );
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;