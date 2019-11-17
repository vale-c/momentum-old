import axios from 'axios';
import React from 'react';
import './Weather.css';
import WeatherCard from './WeatherCard';

const PROXY = "https://cors-anywhere.herokuapp.com/";
const OW_API = "13b0886c7c035390785605fc1c637712";
//const DS_API = "930e15060e75d78b3b7cc44da030601c";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lng: "",
      region: "",
      city: "",
      temp: "",
      description: "",
      windSpeed: "",
      humidity: "",
      showWeatherForecast: false,
      days: []
    };
    this.findCoordinates = this.findCoordinates.bind(this);
    //this.getIpLocation = this.getIpLocation.bind(this);
    this.getForecast = this.getForecast.bind(this);
  }

  // getIpLocation = () => {
  //   axios
  //     .get("https://ip.zxq.co/") //awesome API to get Geolocation with no rate limit!
  //     .then(response => {
  //       this.setState({
  //         city: response.data.city,
  //         region: response.data.region
  //       });
  //       //console.log(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  findCoordinates = () => {
    let currentComponent = this; //caching "this" to prevent from Error cannot setState of "undefined"!

    function locInfo(pos)  {
      let crd = pos.coords;
      const lng = crd.longitude;
      const lat = crd.latitude;

      axios(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(res => {
            currentComponent.setState({
              region: res.data.address.state,
              city: res.data.address.town,
              country: res.data.address.country
            });
            console.log(res);
        })
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 10000
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locInfo, error, options);
    }
  
  }
  
  componentDidMount = () => {
    const city = this.state.city;
    const country = this.state.country;

    axios
      .get(PROXY+`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${OW_API}`)
      .then(response => {
        this.setState({
          temp: response.data.main.temp,
          description: response.data.weather[0].main.list,
          id: response.data.weather[0].id,
          humidity: response.data.main.humidity,
          wind: response.data.wind.speed
        });
        //console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getForecast = () => {
    const city = this.state.city;
    const country = this.state.country;
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&APPID=${OW_API}`;

    fetch(PROXY + weatherURL)
      .then(res => res.json())
      .then(data => {
        const dailyData = data.list.filter(reading =>
          reading.dt_txt.includes("18:00:00")
        );
        this.setState({
          days: dailyData
        });
      });
  };

  UNSAFE_componentWillMount() {
    this.findCoordinates();
    //this.getIpLocation();
    this.getForecast();
  }

  render() {
    let hour = new Date().getHours();
    let timeOfDay = hour > 17 ? "night" : "day";

    const { showWeatherForecast } = this.state;
    const { city, region, temp, description, id, wind, humidity } = this.state;

    const WeatherData = ({ city, region, temp, description, id, humidity }) => (
      <div>
        <p className="location">{city}</p>
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