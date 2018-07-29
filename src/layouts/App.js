import React from 'react';
import { 
  BrowserRouter,
  Route,
  Switch 
} from 'react-router-dom';
import NotFound from '../pages/404';
import Main from './Main';

import Header from '../components/Header/index';
import Footer from '../components/Footer/index';

const App = props => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Main} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
