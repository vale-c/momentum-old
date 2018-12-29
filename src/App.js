import React, { Component } from 'react';
import Clock from './Components/Clock';
import Weather from "./Components/Weather";
import Greeting from './Components/Greeting';
import Focus from "./Components/Focus";
import Quotes from './Components/Quotes';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
		};
  }


  render() {
    return (
      <div className="App">
        <Weather />
        <Clock/>
        <Greeting/>
     
        <Quotes/>
      </div>
    );
  }
}

export default App;
