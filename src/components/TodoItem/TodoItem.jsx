import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoItem.scss';

const btnStyle = {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "50%",
    color: "#ff0000",
    cursor: "pointer",
    fontSize: "1.5rem",
    fontWeight: "700",
    float: "none",
    marginLeft: "10px"
};

export class TodoItem extends Component {
    getStyle = () => {
        return {
            textDecoration: this.props.todo.completed ? 
            'line-through' : 'none'
        }
    }

    render() {
        const { id, title, completed } = this.props.todo;
        return (
            <div className="todoItemWrapper" style={this.getStyle()}>
                <p className="todoItem">
                    <input className="todoItem" type="checkbox" checked={ completed } onChange={this.props.markComplete.bind(this, id)} /> {' '}
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
