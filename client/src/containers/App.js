import React, { Component } from 'react';
import Loading from '../components/Loading/index';
import logo from 'images/logo.png';

//styles
import './App.scss';

class App extends Component {
  render () {
    return (
      <div className="App">
        <div className="header">
          <img src={logo} alt="logo" className="App-logo"/>
          <h2 className="App-title">Cinematify</h2>
          <div className="App-subtitle">Test build</div>
        </div>
        <div className="content">
          <Loading />
        </div>
      </div>
    );
  }
}

export default App;
