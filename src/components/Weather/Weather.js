import axios from 'axios';
import React from 'react';
import './Weather.css';
import WeatherCard from './WeatherCard';
//import WeatherForm from './WeatherForm';

const CORS_HEADER = "https://cors-anywhere.herokuapp.com/";
const IPGEO_KEY = "3f061a38048d48d2ba1d660be4ba55f7";
const OW_API = "13b0886c7c035390785605fc1c637712";


class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      temp: "",
      description: "",
      windSpeed: "",
      humidity: "",
      showWeatherForecast: false,
      days: []
    };
    this.getLocation = this.getLocation.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);
    this.getCountryFlag = this.getCountryFlag.bind(this);
  }

  getLocation = () => {
    axios
      .get("https://ip.zxq.co/") //awesome API to get Geolocation with no rate limit!
      .then(response => {
        this.setState({
          city: response.data.city,
          region: response.data.region,
          country: response.data.country,
        });
        //console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getWeatherData = () => {
    const city = this.state.city;
    const country = this.state.country;

    axios
      .get(CORS_HEADER + `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${OW_API}`)
      .then(response => {
        this.setState({
          temp: response.data.main.temp,
          description: response.data.weather[0].main.list,
          id: response.data.weather[0].id,
          humidity: response.data.main.humidity,
          wind: response.data.wind.speed
        });
        //console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };


  componentDidMount = () => {
    const city = this.state.city;
    const country = this.state.country;
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&APPID=${OW_API}`

    fetch(CORS_HEADER + weatherURL)
      .then(res => res.json())
      .then(data => {   
        //console.log("Data List Loaded", data.list)
        const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
        this.setState({
          days: dailyData
        })
      })
  }

  getCountryFlag = () => {
    axios
      .get(`https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEO_KEY}`)
      .then(res => {
        this.setState({
          country_flag: res.data.country_flag
        });
      })
      .catch(error => {
        console.log(error);
      });
  };


  UNSAFE_componentWillMount() {
    this.getLocation();
    this.getWeatherData();
    this.getCountryFlag();
  }

  render() {

    let hour = new Date().getHours();
    let timeOfDay = hour > 17 ? "night" : "day";

    const { showWeatherForecast } = this.state;
    const { city,  region,  country_flag,  temp,  description,  id,  wind,  humidity  } = this.state;

    const WeatherData = ({ city, region, country_flag, temp, description, id, humidity  }) => (
      <div>
        <p className="location"> {city}, </p>
        <p className="region-country"> {region},
          <img
            alt="country-flag"
            src={country_flag}
            className="country-flag"
          />
        </p>
        <i id="icon" className={"wi wi-owm-" + timeOfDay + "-" + id}></i>
        <h3 className="desc"> {description} </h3>
        <p className="temp"> {Math.round(temp)}°</p>
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
            country_flag={country_flag}
            /* from OpenWeatherMap API CALL */
            temp={temp}
            description={description}
            id={id}
            wind={wind}
            humidity={humidity}  
          />
        

          {/* <WeatherForm /> */}

        <button className="weeklyBtn" onClick={() => this.setState({ showWeatherForecast: !showWeatherForecast })}><span role="img" aria-label="temp-emoji">Weekly 🌡️</span></button>
        <br/><br/>
        <div className="forecastWrapper">
          { 
              showWeatherForecast &&  this.state.days.map((day, index) => <WeatherCard day={day} key={index}/>)
          }
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;