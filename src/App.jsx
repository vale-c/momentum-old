import React, { Component } from 'react';
import Clock from './components/Clock/Clock.jsx';
import Weather from "./components/Weather/Weather.jsx";
import Greeting from './components/Greeting/Greeting.jsx';
import Quotes from './components/Quotes/index.jsx';
import Todos from './components/Todos/Todos.jsx';
import uuid from 'uuid';
import './App.scss';

class App extends Component {
  state = {
    todos: [{
      id: uuid.v4(),
      title: 'Add here your todos! 📃🖊️',
      completed: false,
    },
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
        <Quotes />
        <Todos
          addTodo={this.addTodo}
          todos={this.state.todos}
          markComplete={this.markComplete}
          delTodo={this.delTodo}
        />
      </div>
    );
  }
}

export default App;
