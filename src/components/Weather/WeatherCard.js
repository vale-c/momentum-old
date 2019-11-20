import React from 'react';
import './Weather.scss';
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
            <h3 className="weekDay">{moment(newDate).format('dddd')}</h3>
            <p className="currentDate">{moment(newDate).format('MMMM Do')}</p>
            <i id="icon" className={imgURL}></i>
            <p className="min"><strong>Min:</strong> {Math.round(this.props.day.main.temp_min)}°C</p>
            <p className="max"><strong>Max:</strong> {Math.round(this.props.day.main.temp_max)}°C</p>
            <h4 className="card-text">{this.props.day.weather[0].description}</h4>
      </div>
    )
  }
}

export default Card;