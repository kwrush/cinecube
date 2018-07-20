import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../components/Loader/index';

const App = props => (
  <div>
    {props.children && props.children}
    <Loader color={'#ccc'} loaderNumber={6} width={6} spacing={2} />
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
