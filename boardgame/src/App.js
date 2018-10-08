import React, { Component } from 'react';
import List from './List';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  get listOfBoardGames() {
      return [{"Name": "Game1"}, {"Name": "Game2"}];
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <List listOfItems= {this.listOfBoardGames}/>
      </div>
    );
  }
}

export default App;
