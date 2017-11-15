import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const propTypes = {
  size: PropTypes.oneOf(['small', 'normal', 'large'])
};

const defaultProps = {
  size: 'normal'
}

const Loading = (props) => {

  //const { size } = props;

  return (
    <div styleName="loading">
      <div styleName="loading-ripple"></div>
      <div styleName="loading-ripple"></div>
      <div styleName="loading-ripple"></div>
    </div>
  );
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;