import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import SectionHeader from 'components/SectionHeader/index';
import CardPanel from 'components/CardPanel/index';

const PosterSection = (props) => {
  const {
    ...attributes
  } = props;

  return (
    <Container {...attributes} styleName="poster-section" />
  );
};

export default PosterSection