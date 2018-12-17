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
			newImg: [],
			loadingState: true
		};
  }


  render() {
    return (
      <div className="App">
        <Clock/>
        <Greeting/>
        <Focus/>
        <Quotes/>
      </div>
    );
  }
}

export default App;
