/**
 * Main entry point
 */

import './style.scss';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from 'components/Header/index';
import Footer from 'components/Footer/index';
import Home from 'containers/Home/index';
import Movie from 'containers/Movie/index';
import Tv from 'containers/Tv/index';
import People from 'containers/People/index';
import Favorite from 'containers/Favorite/index';


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
      </div>
    );
  }
}

export default App;
