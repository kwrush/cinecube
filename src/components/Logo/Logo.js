import React from 'react';
import PropTypes from 'prop-types';
import { mapToCssModules } from '../../utils/helpers';

const propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  cssModule: PropTypes.object,
  className: PropTypes.string
};

const defaultProps = {
  color: 'inherit',
  size: '32px'
};

const Logo = props => {
  const { color, size, className, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);

  const width = `${size}`;
  const height = `${size}`;

  return (
    <svg 
      className={classes}
      width={width}
      height={height} 
      viewBox="0 0 24 24"
      role="presentation"
    >
      <path 
        fill={color}
        d="M11.995 2.281l9.005 4.966v9.685l-9 4.802-9-4.802v-9.744l8.995-4.907zm.005-2.281l-11 6v12.131l11 5.869 11-5.869v-12.066l-11-6.065zm.01 10.871l5.787-2.976-5.797-3.098-5.705 3.018 5.715 3.056zm-1.01 1.728l-6-3.208v6.185l6 3.077v-6.054zm2 .011v6.043l6-3.077v-6.051l-6 3.085z"
      />
    </svg>
  );
};

Logo.defaultProps = defaultProps;
Logo.propTypes = propTypes;

export default Logo;