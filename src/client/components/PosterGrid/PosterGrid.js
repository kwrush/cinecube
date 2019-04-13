import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col
} from 'reactstrap';
import { 
  MoviePosterCard,
  TvPosterCard
 } from '../PosterCard';
import { mapToCssModules } from '../../utils/helpers';

const propTypes = {
  mediaSet: PropTypes.oneOfType([
    PropTypes.arrayOf(MoviePosterCard.propTypes.media),
    PropTypes.arrayOf(TvPosterCard.propTypes.media)
  ]),
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {};

const PosterGrid = props => {
  const { mediaSet, className, cssModule } = props;
  const rootClasses = mapToCssModules(className, cssModule);
  const colClasses = mapToCssModules('mb-4', cssModule);

  return (
    <Row className={rootClasses}>
      {
        mediaSet && mediaSet.map(media => {
          const type = media.mediaType;
          const card = type === 'movie'
            ? <MoviePosterCard media={media} />
            : <TvPosterCard media={media} />

          return (
            <Col 
              className={colClasses}
              key={`${type}_${media.id}`}
              lg="3"
              md="4"
              sm="6"
            >
              { card }
            </Col>
          );
        })
      }
    </Row>
  );
};

PosterGrid.propTypes = propTypes;
PosterGrid.defaultProps = defaultProps;

export default PosterGrid;