import React from 'react';
import './Todo.css';

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: '',
            showTodoPanel: false
        }
    }

    render() {
        const { showTodoPanel } = this.state;
        return (
            <div className="todoWrapper">
                <button className="todoBtn" onClick = {() => this.setState({ showTodoPanel: !showTodoPanel })}> { showTodoPanel ? 'Hide' : 'Todo' } </button> 
                { showTodoPanel && ( 
                    <div className="sidePanel"> Come on, do something! </div> )
                }
            </div>
        )
    }
}

export default Todo;
