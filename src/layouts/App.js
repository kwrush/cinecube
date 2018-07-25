import React from 'react';
import { 
  BrowserRouter,
  Route,
  Switch 
} from 'react-router-dom';
import NotFound from './404';
import Main from './Main';

const App = props => (
  <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} />
        <Route component={NotFound} />
      </Switch>
  </BrowserRouter>
);

export default App;
