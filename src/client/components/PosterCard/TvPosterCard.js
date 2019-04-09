import React from 'react';
import PropTypes from 'prop-types';
import PosterCard from './PosterCard';

const propTypes = {
  media: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mediaType: PropTypes.oneOf(['movie', 'tv']).isRequired,
    name: PropTypes.string.isRequired,
    backdropPath: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired,
    genreIds: PropTypes.arrayOf(
      PropTypes.number
    ).isRequired,
    firstAirDate: PropTypes.string.isRequired
  }),
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  media: null
};

const TvPosterCard =  ({ media, ...rest }) => {

  const theMedia = Object.assign({}, { ...media });
  theMedia.releaseDate = media.firstAirDate;
  theMedia.title = media.name;

  delete theMedia.firstAirDate;
  delete theMedia.name;

  return <PosterCard media={theMedia} { ...rest } />;
}

TvPosterCard.propTypes = propTypes;
TvPosterCard.defaultProps = defaultProps;

export default TvPosterCard;
