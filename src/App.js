import React, { Component } from 'react';
import Clock from './Components/Clock';
import Weather from "./Components/Weather.js";
import Greeting from './Components/Greeting';
import Quotes from './Components/Quotes';
import Todo from './Components/Todo';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
      todos: ''
		};
  }

  

  render() {
    return (
      <div className="App">
        <Weather/>
        <Clock/>
        <Greeting/>
        <Todo/>
        <Quotes/>
      </div>
    );
  }
}

export default App;
