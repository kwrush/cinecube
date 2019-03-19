import React from 'react';
import MediaQuery from 'react-responsive';

const Sm = props => <MediaQuery { ...props } maxWidth={767} />;
const Default = props => <MediaQuery { ...props } minWidth={768} />;

export default {
  Sm, 
  Default
};
