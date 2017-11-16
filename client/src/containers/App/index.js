import React, { Component } from 'react';
import Loading from 'components/Loading/index';
import Header from 'containers/Header/index';
import logo from 'images/logo.png';

//styles
import './style.scss';

class App extends Component {
  render () {
    return (
      <div styleName="App">
        <Header />
        <div className="content">
          <Loading />
        </div>
      </div>
    );
  }
}

export default App;
