import React, { Component } from 'react';
import Clock from './Components/Clock';
import Weather from "./Components/Weather.js";
import Greeting from './Components/Greeting';
import Quotes from './Components/Quotes';
import Todos from './Components/Todos';
// import uuid from 'uuid';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
      todos: [],
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=8')
    .then(res => this.setState({todos: res.data}))
  }

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
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title, 
      completed: false
  })
      .then(res => 
        this.setState({ 
          todos: [...this.state.todos, res.data]
        }));
  }

  // Toggle Complete
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res =>
        this.setState({
          todos: [...this.state.todos.filter(todo => todo.id !== id)]
        })
    );
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
