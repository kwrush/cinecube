import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { 
  mapToCssModules,
  getFullYear
} from '../../utils/helpers';
import { Poster } from '../Poster';
import { getPosterUrl } from '../../utils/imageUtils';
import { getGenres } from '../../constants/genres';
import { StarRating } from '../StarRating';
import './PosterCard.scss';


const propTypes = {
  media: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mediaType: PropTypes.oneOf(['movie', 'tv']).isRequired,
    title: PropTypes.string.isRequired,
    backdropPath: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired,
    genreIds: PropTypes.arrayOf(
      PropTypes.number
    ).isRequired,
    releaseDate: PropTypes.string.isRequired
  }),
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  meida: null
};

const PosterCard = props => {
  const { media, className, cssModule } = props;
  const externalClasses = mapToCssModules(className, cssModule);
  const headerClasses = mapToCssModules(
    'mb-2 d-flex justify-content-between align-items-center',
    cssModule
  );
  const linkClasses = mapToCssModules('d-block', cssModule);
  const ratingClasses = mapToCssModules('d-flex align-items-center', cssModule);
  const titleClasses = mapToCssModules('font-weight-bold text-truncate', cssModule);
  const subtitleClasses = mapToCssModules(
    'd-flex justify-content-start align-items-center',
    cssModule
  );

  const linkTo = `/${media.mediaType}/${media.id}`;

  const posterInfo = (
    <CardBody styleName="poster-info override">
      <div className={headerClasses}>
        <Badge color="info">
          { getFullYear(media.releaseDate) }
        </Badge>
        <div
          className={ratingClasses} 
          styleName="poster-rating"
        >
          <StarRating
            name={`${media.meidaType}_${media.id}`}
            value={media.voteAverage}
            max={10}
          />
          <span>{media.voteAverage || 'N/A'}</span>
        </div>
      </div>
      <Link to={linkTo} styleName="poster-link">
        <CardTitle
          className={titleClasses}
          styleName="poster-title"
        >

          {media.title}
        </CardTitle>
      </Link>
      <div
        className={subtitleClasses}
        styleName="poster-subtitle"
      >
        {
          media.genreIds
            .slice(0, 2)
            .map(id => getGenres(id)).join(', ')
        }
      </div>
    </CardBody>
  );

  return (
    <div
      styleName="poster-card"
      className={externalClasses}
    >
      <Card styleName="poster-card-inner">
        <Link
          to={linkTo}
          className={linkClasses}
          styleName="poster-image poster-link"
        >
          <Poster
            imageURL={getPosterUrl(media.posterPath, 'm')}
            previewURL={getPosterUrl(media.posterPath, 'xs')}
          />
        </Link>
        {posterInfo}
      </Card>
    </div>
  );
};

PosterCard.propTypes = propTypes;
PosterCard.defaultProps = defaultProps;

export default PosterCard;