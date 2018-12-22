import React, { Component } from 'react';
import Clock from './Components/Clock';
import Greeting from './Components/Greeting';
import Quotes from './Components/Quotes';
import Focus from './Components/Focus';
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
        <Clock/>
        <Greeting/>
        <Quotes/>
      </div>
    );
  }
}

export default App;
