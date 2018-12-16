import React, { Component } from 'react';
import Clock from './Components/Clock';
import Greeting from './Components/Greeting';
import Quotes from './Components/Quotes';
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

      </div>
    );
  }
}

export default App;
