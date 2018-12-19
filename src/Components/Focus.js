import React  from 'react';
import './Focus.css';


class Focus extends React.Component {
  constructor(props) {
    super(props);

		this.state = {
			newTask: [],
      completed: false
		};
  }


  render() {
      const textNode = {
        borderBottomColor: 'rgba(0, 0, 0, 0)'
      }
      const inputStyle = {
        display: 'block'
      }
      const focusList = {
        display: 'none'
      }

      return (
      <section className="focus-section">
        <form className="focus">
          <label className="focus ask-focus">
            <div className="textNode" style={textNode}>What is your main focus for today?</div>
          </label>
          <input id="focus-input" className="focus" type="text" autoFocus="" style={inputStyle}/>
        </form>
        <div className="focus focus-list" style={focusList}></div>
      </section>
    );
  }
}

export default Focus;

