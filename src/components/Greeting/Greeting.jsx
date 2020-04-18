import React from 'react';
import './Greeting.scss';
import {Grid, Row, Col} from 'react-bootstrap';

function getRandom(items) { //pick a random name from the nameData list at the bottom of the Greeting component
  return items[items.length * Math.random() | 0];
}

class Greeting extends React.Component {
	constructor(props) {
		super(props)
    this.state = {
      firstName: ''
    };
  }

  componentDidMount() {
    setInterval(this._randomAll(), 1000)
  }

  _randomAll() {
    Object.keys(this.state).forEach(name => {
      this.setState({
        [name]: getRandom(nameData[name])
      })
    })
  };

  handleGetNameClick = (e) => {
    this.setState({
      [e.target.name]: getRandom(nameData[e.target.name])
    })
  };

	render() {
    const { firstName } = this.state; //set the first name to access it

    let time = new Date().getHours(); //get precise time

		return <Grid>
			<Row className="greetingTextWrapper">
        <Col xs={6} md={3}>
          <h3 className="greetingText">Good {time < 12 ? 'Morning' : time < 18 ? 'Afternoon' : time < 22 ? 'Evening' : 'Night'} {firstName} </h3>
        </Col>
      </Row>
		</Grid>;
	}
}

const nameData = {
	"firstName": [
    "Honey",
    "Sweetheart",
    "Mate",
    "Bro",
    "Wiz",
    "Cutie",
    "Alien",
    "Human",
    "Angel",
    "Cutie Pie",
    "Sunshine",
    "Beautiful",
    "Good Looking",
    "Pal",
    "Cheerio",
    "Cookie Crunch",
    "Smarty Pants",
    "Cookie",
    "Queen",
    "King",
    "Human",
    "Turtle",
    "Waffle Crisp",
    "Honey Tea",
    "Rockstar",
    "Fox",
    "Lucky Charm",
    "Classy",
    "Captain",
    "Ace",
    "Sweetie",
    "Sunflower",
	]}


export default Greeting;
