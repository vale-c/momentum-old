import React from 'react';
import './Todos.css';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import PropTypes from 'prop-types';

class Todos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showTodoPanel: false,
        }
    }

    render() {
        const { showTodoPanel } = this.state;

        return <div className="todoListWrapper">
            <button className="todoBtn" onClick = {() => this.setState({showTodoPanel: !showTodoPanel})}> {showTodoPanel ? 'Todos' : 'Todos'} </button>  
            { 
                showTodoPanel && (this.props.todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo} />
                ))
            )}
            {
                showTodoPanel && <AddTodo/>
            }
        </div>
    }
}

//Proptypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired
}

export default Todos;
