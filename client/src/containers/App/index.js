import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loading from 'components/Loading/index';
import Header from 'components/Header/index';
import Home from 'scenes/Home/index';
import Movie from 'scenes/Movie/index';
import Tv from 'scenes/Tv/index';
import People from 'scenes/People/index';
import logo from 'images/logo.png';

import './style.scss';

class App extends React.Component {
  render () {
    return (
      <div styleName="App">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/movies" component={Movie} />
            <Route path="/tvs" component={Tv} />
            <Route path="/people" component={People} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
