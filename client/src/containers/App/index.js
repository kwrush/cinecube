import React, { Component } from 'react';
import Loading from 'components/Loading/index';
import logo from 'images/logo.png';

//styles
import './style.scss';

class App extends Component {
  render () {
    return (
      <div styleName="App">
        <div styleName="header">
          <img src={logo} alt="logo" styleName="App-logo"/>
          <h2>Cinematify</h2>
          <div>Test build</div>
        </div>
        <div className="content">
          <Loading />
        </div>
      </div>
    );
  }
}

export default App;
