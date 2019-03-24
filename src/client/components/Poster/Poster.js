import React from 'react';
import PropTypes from 'prop-types';
import { mapToCssModules } from '../../utils/helpers';
import { ProgressiveImage } from '../ProgressiveImage';
import './Poster.scss';

const propTypes = {
  imageURL: PropTypes.string.isRequired,
  previewURL: PropTypes.string.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func
};

const defaultProps = {
  title: 'poster',
  onClick: () => {}
};

const Poster = (props) => {
  const { imageURL, previewURL, title, onClick, className, cssModule } = props;

  const classes = mapToCssModules(className, cssModule);
  
  return (
    <div 
      styleName="poster" 
      className={classes}
      onClick={onClick}
    >
      <ProgressiveImage 
        src={imageURL}
        placeholder={previewURL}
        alt={title}
      />
    </div>
  );
} 

Poster.propTypes = propTypes;
Poster.defaultProps = defaultProps;

export default Poster;