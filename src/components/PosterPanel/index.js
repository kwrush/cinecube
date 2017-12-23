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
  posters: ImmutablePropTypes.mapOf(
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
  loadPosters: PropTypes.func,
  endPoint: PropTypes.string,
  posterSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'orig']),
  columns: PropTypes.number
};

const defaultProps = {
  posters: Map(),
  loadPosters: () => {},
  endPoint: '/',
  posterSize: 's',
  columns: 4
};

class PosterPanel extends React.Component {
  constructor (props) {
    super(props);
  }
  
  componentWillMount () {
    this.props.loadPosters();
  }
  
  render () {
    const { posters, className, cssModule } = this.props;
    const classes = mapToCssModules(className, cssModule);
    const colSize = 12 / this.props.columns;
    
    const posterCols = posters.toList().map(poster => {
      return (
        <Col key={poster.get('id')} md={`${colSize}`}>
          <Link 
            styleName="poster-link" 
            to={`${this.props.endPoint}/${poster.get('id')}`} 
            title={poster.get('title') || poster.get('name')}>
            <ImageCard 
              styleName='poster'
              imgUrl={poster.getIn(['posterPath', this.props.posterSize])} 
            />
          </Link>
        </Col>
      );
    });
    
    return (
      <Row styleName='panel-row' className={classes}>
        { posterCols }
      </Row>
    );
  }
} 

PosterPanel.propTypes = propTypes;
PosterPanel.defaultProps = defaultProps;

export default PosterPanel;