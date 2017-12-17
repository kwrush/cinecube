import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from 'containers/App/index';

ReactDOM.render((
  <Provider store={configureStore()}>
    <App />
  </Provider>
), document.getElementById('root'));