import axios from 'axios';
import React from 'react';
import './Weather.css';

//const GOOGLE_API_KEY = "AIzaSyAOcD54Wg5Tsi9WLR0DDiqZ8kLWONvXwuY";
const CORS_HEADER = "https://cors-anywhere.herokuapp.com/";
const DARKSKY_API_CALL = "https://api.darksky.net/forecast/640bddbf1aa37eddd8253e47a46a46a8/";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: "",
      summary: "",
      precipIntensity: "",
      precipProbability: "",
      windSpeed: ""
    };
  }

  componentDidMount() {
      axios
        .get("https://api.ipdata.co/?api-key=036623005d047344581751a318e8869d09652e6c031e7d2be99e7e74")
        .then(response => {
          this.setState({
            city: response.data.city,
            region: response.data.region,
            country_name: response.data.country_name,
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            emoji_flag: response.data.emoji_flag
          });
        })
        .catch(error => {
          console.log(error);
        });
  };

  getWeatherData = () => {
    axios
      .get(CORS_HEADER + DARKSKY_API_CALL + this.state.latitude + "," + this.state.longitude + "?units=si")
      .then(response => {
        this.setState({
          temperature: response.data.currently.temperature,
          summary: response.data.currently.summary,
          icon: response.data.currently.icon,
          precipIntensity: response.data.currently.precipIntensity,
          precipProbability: response.data.currently.precipProbability,
          windSpeed: response.data.currently.windSpeed
        });
      })
      .catch(error => {
        console.log(error);
      });
     console.log("Temperature: " + this.state.temperature);
     console.log("Summary: " + this.state.summary);
     console.log("Precipitation Intensity: " + this.state.precipIntensity);
     console.log("Precipitation Probability: " + this.state.precipProbability);
     console.log("Wind Speed: " + this.state.windSpeed);
     //get lat & long values from previous API call
     console.log("Latitude: " + this.state.latitude);
     console.log("Longitude: " + this.state.longitude);
  };

  render() {
    const { city, region, country_name, emoji_flag, temperature, summary, icon } = this.state;

    const WeatherData = ({ city, region, country_name, emoji_flag, temperature, summary, icon }) => <div>
        <p className="location">
          {city},{region}
        </p>
        <p className="country_and_flag">
          {country_name} {emoji_flag}
        </p>
        <p className="temp"> {temperature} </p>
        <p className="summary"> {summary} </p>
        <i className="wi">{icon}</i>
      </div>;

    const Button = ({ onClick }) => (
      <button type="button" className="weather-btn" onClick={onClick}>
        Get Weather Data
      </button>
    );

    return (
      <div className="container">
        <div className="weather-wrapper">
          <Button onClick={this.getWeatherData} />
          <WeatherData
            city={city}
            region={region}
            country_name={country_name}
            emoji_flag={emoji_flag}
            temperature={temperature}
            summary={summary}
            icon={icon}
          />
        </div>
      </div>
    );
  }
}

export default Weather;