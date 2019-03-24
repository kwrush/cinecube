import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import { ProgressiveImage } from '../ProgressiveImage';
import MediaContent from './MediaContent';
import classNames from 'classnames';
import { getBackdropUrl } from '../../utils/imageUtils';
import { mapToCssModules } from '../../utils/helpers';
import './Backdrop.scss';

const BackdropContainer = posed.div({
  enter: { 
    opacity: 1,
    scale: 1,
    staggerChildren: 1000
  },
  exit: { 
    opacity: 0,
    scale: 1.2,
    staggerChildren: 50, 
    staggerDirection: -1,
    afterChildren: true
  }
});

const propTypes = {
  mediaEntity: PropTypes.shape({
    ...MediaContent.propTypes,
    backdropPath: PropTypes.string.isRequired
  }).isRequired,
  isIn: PropTypes.bool,
  onPoseEnd: PropTypes.func,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  mediaEntity: {},
  isIn: false,
  onPoseEnd: () => {}
}

const Backdrop = props => {
  const { mediaEntity, isIn, onPoseEnd, className, cssModule } = props;
  const activeClass = classNames('backdrop-container', { active: isIn });
  const classes = mapToCssModules(className, cssModule);

  return (
    <BackdropContainer
      className={classes}
      styleName={activeClass}
      key={`backdrop_${mediaEntity.id}`}
      pose={isIn ? 'enter' : 'exit'}
      onPoseComplete={onPoseEnd}
    >
      <div styleName="backdrop-overlay">
        <ProgressiveImage
          src={getBackdropUrl(mediaEntity.backdropPath, 'lg')}
          placeholder={getBackdropUrl(mediaEntity.backdropPath, 's')}
        />
      </div>
      <MediaContent
        styleName="media-content"
        content={mediaEntity}
      />
    </BackdropContainer>
  );
};

Backdrop.propTypes = propTypes;
Backdrop.defaultProps = defaultProps;

export default Backdrop;