import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from '../../utils/helpers';
import './Avatar.scss';

const propTypes = {
  avatar: PropTypes.string,
  alt: PropTypes.string,
  round: PropTypes.bool,
  border: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  avatar: null,
  alt: null,
  round: true,
  border: true
};

const Avatar = props => {
  const { avatar, alt, round, border, className, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);
  const styleNames = classNames('avatar', { border }, { round });
  return (
    <div className={classes} styleName={styleNames}>
      <Media object data-src={avatar} alt={alt} />
    </div>
  );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
