import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';

const btnStyle = {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "50%",
    color: "#ff0000",
    cursor: "pointer",
    fontSize: "1rem",
    float: "none",
    marginLeft: "5px"
};

export class TodoItem extends Component {
    getStyle = () => {
        return {
            textDecoration: this.props.todo.completed ? 
            'line-through' : 'none'
        }
    }

    render() {
        const { id, title } = this.props.todo;
        return (
            <div className="todoItemWrapper" style={this.getStyle()}>
                <p>
                    <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} /> {' '}
                    { title }
                    <button type="button" className="close" aria-label="Close" onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </p>
            </div>
        )
    }
}

//PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
}

export default TodoItem
