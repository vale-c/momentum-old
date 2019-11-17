import axios from 'axios';
import React from 'react';
import './Weather.css';
import WeatherCard from './WeatherCard';

const PROXY = "https://cors-anywhere.herokuapp.com/";
const OW_API = "13b0886c7c035390785605fc1c637712";
//const DarkSky_API = "930e15060e75d78b3b7cc44da030601c";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      region: "",
      city: "",
      temp: "",
      description: "",
      windSpeed: "",
      humidity: "",
      showWeatherForecast: false,
      days: []
    };
  }

  componentDidMount = () => {
    let currentComponent = this; //caching "this" to prevent from Error cannot setState of "undefined"!

    function locInfo(pos)  { 
      //Getting LAT & LON using GeoLocation API embedded into html5
      let crd = pos.coords;
      
      const lon = crd.longitude;
      const lat = crd.latitude;

      axios
        .get(PROXY + `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}` , {
                      headers: {
                        'Access-Control-Allow-Origin': true,
                      },
            })
        // Geo Coord Info
        .then((res) => {
          currentComponent.setState({
            lat: res.data.lat,
            lon: res.data.lon,
            city: res.data.address.city,
            town: res.data.address.town,
            region: res.data.address.state,
            country: res.data.address.country
          });
          //current Weather Data
          return axios.get(PROXY+`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OW_API}`);
        })
        .then((response) => {
            currentComponent.setState({
              temp: response.data.main.temp,
              description: response.data.weather[0].main.list,
              id: response.data.weather[0].id,
              humidity: response.data.main.humidity,
              wind: response.data.wind.speed
            });
          //Weekly Weather Forecast Data
          return fetch(PROXY + `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${OW_API}`);
        })

        .then(res => res.json())
          .then(data => {
            const dailyData = data.list.filter(reading =>
              reading.dt_txt.includes("18:00:00")
            );
            currentComponent.setState({
              days: dailyData
            });
          });
        
    }
    //error parameters for geolocation call
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    //option parameters for geolocation call
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 10000
    };
    
    // GEOLOCATION API (HTML5)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locInfo, error, options);
    }
  }

  render() {
    let hour = new Date().getHours();
    let timeOfDay = hour > 17 ? "night" : "day";

    const { showWeatherForecast } = this.state;
    const { city, town, region, temp, description, id, wind, humidity } = this.state;

    const WeatherData = ({  city, town, region, temp, description, id, humidity }) => (
      <div>
        <p className="locationType"> { {town} ? town : {city}}</p>
        <p className="region-country">{region}</p>
        <i id="icon" className={"wi wi-owm-" + timeOfDay + "-" + id}></i>
        <h3 className="desc">{description}</h3>
        <p className="temp">{Math.round(temp)}°</p>
        <p className="humidity">Humidity: {humidity}%</p>
      </div>
    );

    return (
      <div className="weatherData">
        <div className="weatherWrapper">
          <WeatherData
            /* from IP.ZQ.CO */
            city={city}
            town={town}
            region={region}
            /* from OpenWeatherMap API CALL */
            temp={temp}
            description={description}
            id={id}
            wind={wind}
            humidity={humidity}
          />

          {/* <WeatherForm /> */}
          <button className="weeklyBtn" onClick={() => this.setState({ showWeatherForecast: !showWeatherForecast }) } >
            <span role="img" aria-label="temp-emoji">
              Weekly 🌡️
            </span>
          </button>

          <br />
          <br />

          <div className="hook"></div>
          <div className="forecastWrapper">
            {showWeatherForecast && this.state.days.map((day, index) => (
                <WeatherCard day={day} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;