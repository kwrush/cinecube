import React from 'react';
import PropTypes from 'prop-types';
import { ProgressiveImage } from '../ProgressiveImage';
import { MediaOverview } from '../MediaOverview';
import { Poster } from '../Poster';
import { useSpring, animated } from 'react-spring';
import { getBackdropUrl, getPosterUrl } from '../../utils/imageUtils';
import { mapToCssModules } from '../../utils/helpers';
import './Backdrop.scss';


const propTypes = {
  media: PropTypes.shape({
    ...MediaOverview.propTypes,
    posterPath: PropTypes.string.isRequired,
    backdropPath: PropTypes.string.isRequired
  }).isRequired,
  show: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  show: false
};

const Backdrop = props => {
  const { media, show, className, cssModule } = props;
  const classes = mapToCssModules(className, cssModule);

  const maskProps = useSpring({
    transform: `translateX(${show ? 0 : '100%'})`,
    from: {
      transform: 'translateX(100%)'
    },
    delay: 300
  });

  return (
    <div className={classes} styleName="backdrop-container">
      <div styleName="backdrop-overlay">
        <ProgressiveImage
          src={getBackdropUrl(media.backdropPath, 'lg')}
          placeholder={getBackdropUrl(media.backdropPath, 's')}
        />
      </div>
      <div styleName="poster-mask">
        <animated.div style={maskProps}>
          <Poster
            imageURL={getPosterUrl(media.posterPath, 'm')}
            previewURL={getPosterUrl(media.posterPath, 'xs')}
            title={media.title}
          />
        </animated.div>
      </div>
      <MediaOverview 
        media={media} 
        show={show} 
        delay={400} 
        styleName="overview"
      />
    </div>
  );
};

Backdrop.propTypes = propTypes;
Backdrop.defaultProps = defaultProps;

export default Backdrop;