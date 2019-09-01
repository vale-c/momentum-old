import React, { Component } from 'react'
import './AddTodo.css';

export class AddTodo extends Component {
    render() {
        return (
            <form style={{display: 'flex'}}>
                <input
                    className="newTodo"
                    autoComplete="off"
                    type="text"
                    name="title"
                    style={{ flex: '10', padding: '5px'}}
                    placeholder="Add Todo..."        
                />
                {/* <input
                    type="submit"
                    value="Submit"
                    className="btn"
                    style={{ flex:'1' }}
                />    */}
            </form>
        )
    }
}

export default AddTodo
