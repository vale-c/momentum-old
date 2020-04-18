import React, { Component } from 'react'
import './AddTodo.scss';
import PropTypes from 'prop-types'

export class AddTodo extends Component {
    state = {
        title: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: '' });
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <form onSubmit={ this.onSubmit } style={{ display: 'flex' }}>
                <input
                    className="newTodo"
                    autoComplete="off"
                    type="text"
                    name="title"
                    onChange={this.onChange}
                    style={{ flex: '10', paddingTop: '35px', paddingLeft: '20px', paddingBottom: '25px'}}
                    placeholder="Add Todo..." 
                    value={this.state.title}
                />
            </form>
        )
    }
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired,
}

export default AddTodo;
