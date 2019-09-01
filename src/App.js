import React, { Component } from 'react';
import Clock from './Components/Clock';
import Weather from "./Components/Weather.js";
import Greeting from './Components/Greeting';
import Quotes from './Components/Quotes';
import Todo from './Components/Todos';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
      todos: [
        {
          id: 1,
          title: 'Studiare Metodologie di Programmazione!!!',
          completed: false,
        },
        {
          id: 2,
          title: 'Build Cool Stuff',
          completed: false,
        },
        {
          id: 3,
          title: 'Create an AI powered Fashion Brand',
          completed: false,
        }
      ]
		};
  }

  // Toggle Complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
        return todo;
      })  
    });
  }

  // Toggle Complete
  delTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo=> todo.id !== id)]
    });
  }

  render() {
    console.log(this.state.todos);
    return (
      <div className="App">
        <Weather/>
        <Clock/>
        <Greeting/>
        <Todo todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
        <Quotes/>
      </div>
    );
  }
}

export default App;
