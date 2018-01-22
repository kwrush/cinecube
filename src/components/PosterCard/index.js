import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Card,
  CardText,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import FaCalendar from 'react-icons/lib/fa/calendar';

import { mapToCssModules } from 'utils/helpers';

import ImageCard from 'components/ImageCard/index';

const propTypes = {
  id: PropTypes.number.isRequired,
  mediaType: PropTypes.oneOf(['movie', 'tv', 'people']),
  posterUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  intro: PropTypes.string,
  releaseDate: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  mediaType: 'movie',
  posterUrl: '',
  title: '',
  intro: '',
  releaseDate: ''
};

const PosterCard = (props) => {
  const {
    id,
    mediaType,
    posterUrl,
    title,
    releaseDate,
    intro,
    className,
    cssModules
  } = props;

  const classes = mapToCssModules(className, cssModules);

  return (
    <div className={classes}>
      <Card styleName="poster-card" className="d-flex flex-row justify-content-between">
        <ImageCard imgUrl={posterUrl} styleName="image-content"/>
        <div styleName="card-content">
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>
            <FaCalendar />{releaseDate}
          </CardSubtitle>
          <CardText styleName="overview">{intro}</CardText>
          <Link to={`/${mediaType}/${id}`}>Explore</Link>
        </div>
      </Card>
    </div>
  );
};

PosterCard.propTypes = propTypes;
PosterCard.defaultProps = defaultProps;

export default PosterCard;