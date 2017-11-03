import React, { Component } from 'react';
import logo from '../logo.svg';

//styles
import './App.css';

class App extends Component {
    render () {
        return (
            <div className="App">
                <div className="header">
                    <img src={logo} alt="logo" className="App-logo"/>
                    <h2 className="App-title">Cinematify</h2>
                    <div className="App-subtitle">Test build</div>
                </div>
            </div>
        );
    }
}

export default App;
