import React from 'react';
import './Clock.css';
import {Grid, Row, Col} from 'react-bootstrap';

class Clock extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			time: new Date()
		}
	}

	componentDidMount() {
		setInterval(this.update, 1000)
	}

	update = () => {
		this.setState({
			time: new Date()
		})
	};

	render() {
		const h = this.state.time.getHours()
		const m = this.state.time.getMinutes()

		return <Grid>
				<Row className="clockBox">
					<Col className="clockHours">
				    <h1>{(h === 12 ? '12': h%12)}:</h1>
					</Col>
					<Col className="clockMinutes">
					  <h1>{(m < 10 ? '0' + m : m)}</h1>
					</Col>
					<Col className="clockAmOrPm">
					  <h3 className="am-pm">{(h <= 12 ? 'AM' : 'PM')}</h3>
					</Col>
				</Row>
			</Grid>;
	}
}


export default Clock;
