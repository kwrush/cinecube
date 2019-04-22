import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ProgressiveImage } from '../ProgressiveImage';
import { mapToCssModules } from '../../utils/helpers';
import './Avatar.scss';

const defaultAvatar = require('../../assets/images/default_user_avatar.png');

const propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  round: PropTypes.bool,
  border: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  src: defaultAvatar,
  alt: null,
  round: true,
  border: true
};

const Avatar = props => {
  const { src, alt, round, border, className, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);
  const styleNames = classNames('avatar', { border }, { round });
  return (
    <div styleName="avatar-container">
      <div className={classes} styleName={styleNames}>
        <ProgressiveImage
          src={src}
          placeholder={src}
          alt={alt}
          blur={false}
        />
      </div>
    </div>
  );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
