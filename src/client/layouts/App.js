import React from 'react';
import { Provider } from 'react-redux';
import { 
  BrowserRouter,
  Route,
  Switch 
} from 'react-router-dom';
import NotFound from '../pages/404';
import Main from './Main';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import configureStore from '../store/configureStore';

const App = props => (
  <Provider store={configureStore()}>
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
  </Provider>
);

export default App;
