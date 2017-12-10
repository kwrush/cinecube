import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { mapToCssModules } from 'utils/helpers';

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const SectionContainer = (props) => {
  const {
    className, 
    cssModule,
    ...attributes
  } = props;
  
  const classes = mapToCssModules(className, cssModule);

  return (
    <Container {...attributes} styleName="section" className={classes}/>
  );
};

SectionContainer.propTypes = propTypes;

export default SectionContainer;