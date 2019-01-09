import React from 'react';
import PropTypes from 'prop-types';
import { Util } from 'reactstrap';
import './style.scss'

const propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string 
};

const defaultProps = {
  title: 'media'
};

const Poster = (props) => {
  const { imageUrl, title, className, cssModule } = props;

  const classes = Util.mapToCssModules(className, cssModule);
  
  return (
    <div styleName="poster" className={classes}>
      <img src={imageUrl} alt={`poster of ${title}`} styleName="poster-img" />
    </div>
  );
} 

Poster.propTypes = propTypes;
Poster.defaultProps = defaultProps;

export default Poster;