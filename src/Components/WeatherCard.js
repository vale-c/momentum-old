import React from 'react';
import './Weather.css';
import moment from 'moment';

class Card extends React.Component {
  // Props: day, key(index)
  render() {
    let hour = new Date().getHours();
    let timeOfDay = hour > 17 ? "night" : "day";

    let newDate = new Date();
    const weekday = this.props.day.dt * 1000
    newDate.setTime(weekday)

    const imgURL = "wi wi-owm-" + timeOfDay + "-" + this.props.day.weather[0].id

    return (
        <div className="weatherCard">
            <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
            <p className="text-muted">{moment(newDate).format('MMMM Do')}</p>
            <i id="icon" className={imgURL}></i>
            <p className="minMax">Max {Math.round(this.props.day.main.temp_max)}°C,
               Min {Math.round(this.props.day.main.temp_min)}°C</p>
            <h4 className="card-text">{this.props.day.weather[0].description}</h4>
      </div>
    )
  }
}

export default Card