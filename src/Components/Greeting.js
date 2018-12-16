import React from 'react';
import './Greeting.css';
import {Grid, Row, Col} from 'react-bootstrap';

function getRandom(items) {
  return items[Math.floor(Math.random()*items.length)];
}

class Greeting extends React.Component {
	constructor(props) {
		super(props)
    this.state = {
      firstName: ''
    };
  }

  componentWillMount() {
    this._randomAll()
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
    const { firstName } = this.state;
    let time = new Date().getHours();

		return <Grid>
			<Row className="greeting">
        <Col xs={6} md={3}>
          <h3 className="helloThere">Good {time<12 ? 'Morning' : time<18 ? 'Afternoon' : 'Evening'} {firstName} </h3>
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
    "Wizard",
    "Cutie",
    "Alien",
    "Human",
    "Sexy",
    "Princess",
    "Angel",
    "Cutie Pie",
    "Bae",
    "Handsome",
    "Pal",
    "Smarty Pants",
    "Cookie",
    "Sunshine",
    "Baaaaaaby",
    "Honeybunch",
    "Yoooouhoooo",
    "Good Looking",
    "Classy",
    "Miss",
    "Human Shield",
    "Emperor",
    "King",
    "Queen",
    "Ace",
    "Cauliflower",
    "Bananarama",
    "Sweet Potato",
    "Dark Lord",
    "Barbie",
    "Vampire",
    "Sunflower",
    "Flower"
	]}


export default Greeting;
