import axios from 'axios';
import React from 'react';
import './Weather.css';

const CORS_HEADER = "https://cors-anywhere.herokuapp.com/";
// const DARKSKY_API_CALL = "https://api.darksky.net/forecast/640bddbf1aa37eddd8253e47a46a46a8/";
const IPGEO_KEY = "3f061a38048d48d2ba1d660be4ba55f7";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      temp: "",
      description: "",
      windSpeed: "",
      humidity: "",
    };
    this.getLocation = this.getLocation.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);
  }


  getLocation = () => {
      axios
      .get("https://ip.zxq.co/") //awesome API to get Geolocation with no rate limit!
      .then(response => {
          this.setState({
            city: response.data.city,
            region: response.data.region,
            country: response.data.country,
            loc: response.data.loc,
          });
        })
        .catch(error => {
          console.log(error);
        });
  };

  getWeatherData = () => {
    axios
      // .get(CORS_HEADER + DARKSKY_API_CALL + this.state.latitude + "," + this.state.longitude + "?units=si")
      //https://api.openweathermap.org/data/2.5/weather?lat="+ this.state.latitude + "&lon="+this.state.longitude+"&units=metric&appid=13b0886c7c035390785605fc1c637712"
      .get(CORS_HEADER + "api.openweathermap.org/data/2.5/weather?q="+this.state.city+ ","+this.state.country+ "&units=metric&appid=13b0886c7c035390785605fc1c637712")
      .then(response => {
        this.setState({
          temp: response.data.main.temp,
          description: response.data.weather[0].main,
          id: response.data.weather[0].id,
          humidity: response.data.main.humidity,
          wind: response.data.wind.speed
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getCountryFlag = () => {
    axios
    .get(`https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEO_KEY}`)
    .then(res=> {
      this.setState({
          country_flag: res.data.country_flag,
      });
    })
    .catch(error => {
      console.log(error);
    })
  };

  UNSAFE_componentWillMount() {
    this.getLocation();
    this.getWeatherData();
    this.getCountryFlag();
  }

  render() {

    let hr = new Date().getHours();
    let tod = hr > 17 ? "night" : "day";
    
    const { city, region, country, country_flag, temp, description, id, wind, humidity } = this.state;

    const WeatherData = ({ city, region, country, country_flag, temp, description, id, humidity }) => 
      <div>
          <h4 className="location"> {city} </h4>
          <h4 className="region-country"> {region}, {country},&nbsp;
            <img alt="country-flag" src= {country_flag} style={{height: '1rem'}} />
          </h4> 
          <i id='icon' className={'wi wi-owm-' + tod + '-' + id}></i>
          <h3 className="desc"> {description} </h3>
          <h2 className="temp"> {temp}°</h2>
          <h5 className="humidity">Humidity: {humidity}%</h5>   
      </div>;
    
    return <div className="card">
      <div className="weatherWrapper">
        <WeatherData city={city} region={region} country={country} country_flag={country_flag}
                    /* from OpenWeatherMap API CALL */
                    temp={temp}
                    description={description}
                    id={id}
                    wind={wind}
                    humidity={humidity}
        />
        </div>
      </div>;
  }
}

export default Weather;