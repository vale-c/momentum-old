import React from 'react';
import './Todos.scss';
import TodoItem from '../TodoItem/TodoItem.jsx';
import AddTodo from '../AddTodo/AddTodo.jsx';
import PropTypes from 'prop-types';


class Todos extends React.Component {
    state = {
        showTodoPanel: false,  
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
                showTodoPanel && <AddTodo addTodo={this.props.addTodo}/>
            }
        </div>
    }
}

//Proptypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
}

export default Todos;
