import React from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/App';
import registerServiceWorker from './registerServiceWorker';
import { Util } from 'reactstrap';

import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

Util.setGlobalCssModule(bootstrap);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
