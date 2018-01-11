/**
 * Main entry point
 */

import './style.scss';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import DevTools from 'containers/DevTools/index';
import Header from 'components/Header/index';
import Footer from 'components/Footer/index';
import Home from 'pages/Home/index';
import Movie from 'pages/Movie/index';
import Tv from 'pages/Tv/index';
import People from 'pages/People/index';
import Favorite from 'pages/Favorite/index';


class App extends React.Component {
  render () {
    return (
      <div>
        <BrowserRouter>
          <div styleName="app">
            <Header />
            <Container fluid>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/movie" component={Movie} />
                <Route path="/tv" component={Tv} />
                <Route path="/people" component={People} />
                <Route path="/favorite" component={Favorite} />
              </Switch>
            </Container>
            <Footer />
          </div>
        </BrowserRouter>
        <DevTools />
      </div>
    );
  }
}

export default App;