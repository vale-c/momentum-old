import React, { Component } from 'react';
import Clock from './Components/Clock';
import Weather from "./Components/Weather.js";
import Greeting from './Components/Greeting';
import Quotes from './Components/Quotes';
import Todos from './Components/Todos';
import uuid from 'uuid';
import './App.css';

class App extends Component {
  state = {
      todos: [{
          id: uuid.v4(),
          title: 'Studiare Metodologie di Programmazione!!!',
          completed: false,
        },
        {
          id: uuid.v4(),
          title: 'Build Cool Stuff',
          completed: false,
        },
        {
          id: uuid.v4(),
          title: 'Create an AI powered Fashion Brand',
          completed: false,
        }
      ],
  };

  // Toggle Complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  //Add Todo
  addTodo = (title) => {
    const newTodo = {
      id: 4,
      title,
      completed: false
    }
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }

  // Toggle Complete
  delTodo = (id) => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  }

  render() {
    return (
      <div className="App">
        <Weather/>
        <Clock/>
        <Greeting/>
        <Todos
            addTodo={this.addTodo}
            todos={this.state.todos}
						markComplete={this.markComplete}
						delTodo={this.delTodo} 
        />
        <Quotes/>
      </div>
    );
  }
}

export default App;
