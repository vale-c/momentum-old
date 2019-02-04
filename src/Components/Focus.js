import React, { Component } from "react";
import './Focus.css';
import SimpleStorage from "react-simple-storage";

class Focus extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    newItem: "",
    list: []
 };
}

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addItem() {
    // create a new item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }


  render() {
    return <div className="focusSection">
        <SimpleStorage parent={this} />
        <div className="focusInner">
          <h1 className="askFocus">What are your main goals for today?</h1>
          <input className="focusInput" type="text" 
                placeholder="" value={this.state.newItem} 
                onChange={e => this.updateInput("newItem", e.target.value)} />
        <button className="addItem animated bounce delay-2s" onClick={() => this.addItem()} disabled={!this.state.newItem.length}>
            +
          </button>
         
          <ul className="focusResult">
            {this.state.list.map(item => {
              return <li className="singleListItem" key={item.id}>
                  {item.value}
                  <button className="deleteItem" onClick={() => this.deleteItem(item.id)}>
                    X
                  </button>
                </li>;
            })}
          </ul>
        </div>
      </div>;
  }
}

export default Focus;


