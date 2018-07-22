import React from 'react';
import PropTypes from 'prop-types';

const App = props => (
  <div>
    {props.children && props.children}
  </div>
);

export default App;
