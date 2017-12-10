import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
import ImageCard from 'components/ImageCard/index';
import { mapToCssModules } from 'utils/helpers';

const propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['movie', 'tv', 'people']),
  backdropUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  actors: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  type: 'movie'
};

const BackdropCard = (props) => {

  const {
    id,
    type,
    backdropUrl,
    title,
    actors,
    className,
    cssModule
  } = props;

  const classes = mapToCssModules(className, cssModule);

  return (
    <ImageCard imgUrl={backdropUrl} className={classes}>
      <NavLink to={`/${type}/${id}`} styleName="card-link">
        <Card styleName="card">
          <CardBody className='d-flex flex-column justify-content-end'>
            <CardTitle>{title}</CardTitle>
            <CardText>
              {actors.slice(0, 4).join(', ')}
            </CardText>
          </CardBody>
        </Card>
      </NavLink>
    </ImageCard>
  );
};

BackdropCard.propTypes = propTypes;
BackdropCard.defaultProps = defaultProps;

export default BackdropCard;