import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import { mapToCssModules } from 'utils/helpers';
import ImageCard from 'components/ImageCard';

const propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['movie', 'tv', 'people']),
  posterUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  type: 'movie'
};

const PosterCard = (props) => {
  const {
    id,
    posterUrl,
    title,
    releaseDate,
  } = props;

  const classes = mapToCssModules(className, cssModule);

  return (
    <ImageCard imgUrl={posterUrl} className={classes}>
      <NavLink to={`/${type}/${id}`}>
        <Card>
          <CardBody className='d-flex flex-column justify-content-end'>
            <CardTitle>{title}</CardTitle>
            {
              releaseDate 
              ? <CardSubtitle>Release: {releaseDate}</CardSubtitle> 
              : null
            }
          </CardBody>
        </Card>
      </NavLink>
    </ImageCard> 
  );
};

PosterCard.propTypes = propTypes;
PosterCard.defaultProps = defaultProps;

export default PosterCard;