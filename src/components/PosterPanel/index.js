import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { mapToCssModules } from 'utils/helpers';
import ImageCard from 'components/ImageCard';

class PosterPanel extends React.Component {
  constructor (props) {
    super(props);
  }
  
  componentWillMount () {
    const { loadPosters } = this.props;
    loadPosters();
  }
  
  render () {
    const { posters, className, cssModule } = this.props;
    const classes = mapToCssModules(className, cssModule);
    const colSize = 12 / posters.length;
    
    const posterCols = posters.map(poster => {
      return (
        <Col key={poster.id} md={`${colSize}`}>
          <Link to={`/movie/${poster.id}`} styleName="poster-link">
            <ImageCard 
              styleName='poster'
              imgUrl={poster.posterPath.s} 
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

export default PosterPanel;