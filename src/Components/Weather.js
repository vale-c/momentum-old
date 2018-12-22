import React from 'react';
import './Weather.css';

import axios from 'axios';

class Weather extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    city : '',
    temperature : ''
  };

}
api.openweathermap.org/data/2.5/weather?q=London
componentDidMount() {
  this.getWeatherData();
}

getWeatherData = () => {
  axios
      .get('api.openweathermap.org/data/2.5/weather?q=London')

}