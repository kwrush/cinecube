import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Loading from 'components/Loading/index';
import Header from 'components/Header/index';
import Home from 'scenes/Home/index';
import Movie from 'scenes/Movie/index';
import Tv from 'scenes/Tv/index';
/**
 * Main entry point
 */

import './style.scss';

import People from 'scenes/People/index';
import Favorite from 'scenes/Favorite/index';
import Footer from 'components/Footer/index';

class App extends React.Component {
  render () {
    return (
      <div styleName="app">
        <Header />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/movies" component={Movie} />
            <Route path="/tvs" component={Tv} />
            <Route path="/people" component={People} />
            <Route path="/favorites" component={Favorite} />
          </Switch>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
