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
          <label for="focus-input" className="focus ask-focus">
            <ffn className="_ffn_textNode" data-ffn-css-id="1" style={textNode}>What is your main focus for today?</ffn>
          </label>
          <input id="focus-input" className="focus" type="text" autofocus="" style={inputStyle}/>
            </form>
          <div className="focus focus-list" style={focusList} >
          </div>
      </section>
    );
  }
}

export default Focus;

