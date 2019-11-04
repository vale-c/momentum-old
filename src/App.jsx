import React, { Component } from 'react';
import Clock from './components/Clock/Clock.js';
import Weather from "./components/Weather/Weather.js";
import Greeting from './components/Greeting/Greeting.js';
import Quotes from './components/Quotes/Quotes.js';
import Todos from './components/Todos/Todos.js';
import uuid from 'uuid';
import './App.css';

class App extends Component {
  state = {
    todos: [{
    //   id: uuid.v4(),
    //   title: 'Hey Human Friend 👁️🖖',
    //   completed: false,
    // },
    //{
      id: uuid.v4(),
      title: 'Add here your todos! 📃🖊️',
      completed: false,
    },
    // {
    //   id: uuid.v4(),
    //   title: 'It is a nice way to keep track of all the stuff you have to do.😉👍',
    //   completed: false,
    // }
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
      id: uuid.v4(),
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

  UNSAFE_componentWillMount() {
    localStorage.getItem('todos') && this.setState({
      todos: JSON.parse(localStorage.getItem('todos')),
    })
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('todos', JSON.stringify(nextState.todos));
    localStorage.setItem('todosDate', Date.now());
  }

  render() {
    return (
      <div className="App container">
        <Weather />
        <Clock />
        <Greeting />
        <Todos
          addTodo={this.addTodo}
          todos={this.state.todos}
          markComplete={this.markComplete}
          delTodo={this.delTodo}
        />
        <Quotes />
      </div>
    );
  }
}

export default App;
