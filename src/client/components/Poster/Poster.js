import React from 'react';
import PropTypes from 'prop-types';
import { mapToCssModules } from '../../utils/helpers';
import './Poster.scss';

const propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string 
};

const defaultProps = {
  title: 'poster'
};

const Poster = (props) => {
  const { imageUrl, title, className, cssModule } = props;

  const classes = mapToCssModules(className, cssModule);
  
  return (
    <div styleName="poster" className={classes}>
      <img src={imageUrl} alt={title} styleName="poster-img" />
    </div>
  );
} 

Poster.propTypes = propTypes;
Poster.defaultProps = defaultProps;

export default Poster;