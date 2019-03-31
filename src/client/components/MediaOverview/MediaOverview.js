import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Badge
} from 'reactstrap';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { useTrail, animated } from 'react-spring';
import { mapToCssModules, roundToDicimal } from '../../utils/helpers';
import { StarRating } from '../StarRating';
import { getGenres } from '../../constants/genres';
import { getFullYear } from '../../utils/helpers';
import './MediaOverview.scss';


const propTypes = {
  media: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mediaType: PropTypes.oneOf(['movie', 'tv']).isRequired,
    title: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired,
    genreIds: PropTypes.arrayOf(
      PropTypes.number
    ).isRequired
  }),
  show: PropTypes.bool,
  delay: PropTypes.number,
  clasName: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  media: {},
  delay: 0,
  show: false
};

const MediaOverview = props => {

  const { media, show, delay, className, cssModule } = props;

  if (!media || Object.keys(media).length === 0) return null;

  const rootClasses = mapToCssModules(className, cssModule);
  const rating = roundToDicimal(media.voteAverage, 1);
  const genres = media.genreIds.map(id => getGenres(id)).join(', ');

  const sectionClasses = mapToCssModules('p-4 text-light', cssModule);
  const rowClasses = position => mapToCssModules(
    cx('d-flex', 'align-items-center', `justify-content-${position}`), cssModule);
  const genresClasses = mapToCssModules('pl-3 ml-3 border-left border-light', cssModule);

  /**
   * Set up animation
   */
  const config = {
    mass: 5,
    tension: 2000,
    friction: 200,
    opacity: show ? 1 : 0,
    y: show ? 0 : 40,
    from: {
      opacity: 0,
      y: 40
    },
    delay
  };

  const comps = [
    (
      <h5 className={rowClasses('start')} styleName="rating-header">
        <StarRating
          name={`media_${media.mediaType}_${media.id}`}
          value={rating}
          max={10}
        />
        <span>{rating}</span>
      </h5>
    ),
    (
      <div styleName="badge-section">
        <h1>{media.title}</h1>
        <div className={rowClasses('start')}>
          <Badge color="success">
            {getFullYear(media.releaseDate)}
          </Badge>
          <div className={genresClasses}>{genres}</div>
        </div>
      </div>
    ),
    (
      <div className={rowClasses('center')}>
        <Link
          to={`/${media.mediaType}/${media.id}`}
          className={mapToCssModules('d-block', cssModule)}
          styleName="media-button media-link-button"
        >
          View More
        </Link>
        <Button styleName="media-button media-trailer-button">
          View Trailer
        </Button>
      </div>
    )
  ];

  const showTrail = useTrail(comps.length, config);

  return (
    <div className={rootClasses}>
      <section
        className={sectionClasses}
        styleName="overview-section"
      >
        {
          showTrail.map(({ y, ...rest }, index) => (
            <animated.div
              key={`item_${index}`}
              style={{ ...rest, transform: y.interpolate(y => `translateY(${y}px)`) }}
            >
              { comps[index] }
            </animated.div>
          ))
        }
        
      </section>
    </div>
  );
};

MediaOverview.propTypes = propTypes;
MediaOverview.defaultProps = defaultProps;

export default MediaOverview;