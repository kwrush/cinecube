import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { mapToCssModules } from 'utils/helpers';
import ImageCard from 'components/ImageCard';

const propTypes = {
  items: ImmutablePropTypes.mapOf(
    ImmutablePropTypes.mapContains({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      title: PropTypes.string,
      posterPath: ImmutablePropTypes.mapContains({
        xs: PropTypes.string,
        s: PropTypes.string,
        m: PropTypes.string,
        l: PropTypes.string,
        orig: PropTypes.string
      })
    })
  ),
  endPoint: PropTypes.string,
  posterSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'orig']),
  columns: PropTypes.number
};

const defaultProps = {
  items: Map(),
  endPoint: '/',
  posterSize: 's',
  columns: 4
};

const PosterPanel = (props) => {

  const { items, className, cssModule, columns, endPoint, posterSize } = props;
  const classes = mapToCssModules(className, cssModule);
  const colSize = 12 / columns;

  const posterCols = items.toList().map(poster => {
    return (
      <Col key={items.get('id')} md={`${colSize}`}>
        <Link
          styleName="poster-link"
          to={`${endPoint}/${items.get('id')}`}
          title={poster.get('title') || poster.get('name')}>
          <ImageCard
            styleName='poster'
            imgUrl={poster.getIn(['posterPath', posterSize])}
          />
        </Link>
      </Col>
    );
  });

  return (
    <Row styleName='panel-row' className={classes}>
      {posterCols}
    </Row>
  );
} 

PosterPanel.propTypes = propTypes;
PosterPanel.defaultProps = defaultProps;

export default PosterPanel;