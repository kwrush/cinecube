import './style.scss';
import React from 'react';
import { mapToCssModules } from 'utils/helpers';

const ImageCard = (props) => {

  const {
    className, 
    cssModule,
    imgUrl,
    children
  } = props;
  
  const classes = mapToCssModules(className, cssModule);

  return (
    <div 
      style={{
        backgroundImage: `url(${imgUrl})`
      }} 
      styleName="image-card"
      className={classes}>
        {children}
    </div>
  );
};

export default ImageCard;