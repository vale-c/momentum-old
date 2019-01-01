import axios from 'axios';
import React from 'react';
import './Weather.css';

const CORS_HEADER = "https://cors-anywhere.herokuapp.com/";
// const DARKSKY_API_CALL = "https://api.darksky.net/forecast/640bddbf1aa37eddd8253e47a46a46a8/";
// const Google_Geo = "AIzaSyC1TaAGpiy3G-ICOu0j7MCWAjVdeZACpAo";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      temp: "",
      description: "",
      windSpeed: "",
      humidity: ""
    };
    this.getLocation = this.getLocation.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);
  }


  getLocation = () => {
      axios
        .get("http://ip.zxq.co/") //awesome API to get Geolocation with no rate limit!!
        //https://api.ipdata.co/?api-key=036623005d047344581751a318e8869d09652e6c031e7d2be99e7e74 --> REACHED LIMIT OF API CALLS FOR THIS KEY!!!
        .then(response => {
          this.setState({
            city: response.data.city,
            region: response.data.region,
            country: response.data.country,
            loc: response.data.loc
            //emoji_flag: response.data.emoji_flag
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

  componentWillMount() {
    this.getLocation();
    this.getWeatherData();
  }

  render() {

    let hr = new Date().getHours();
    let tod = hr >= 17 ? "night" : "day";
    
    const { city, region, country,  temp, description, id, wind, humidity } = this.state;

    const WeatherData = ({ city, region, country, temp, description, id, humidity }) => 
      <div>
          <h4 className="location"> {city} </h4>
          <h4 className="region-contry"> {region}, {country}  </h4>
          <i id='icon' className={'wi wi-owm-' + tod + '-' + id}></i>
          <h3 className="desc"> {description} </h3>
          <h2 className="temp"> {temp}°</h2>
          <h5 className="humidity">Humidity: {humidity}%</h5>   
      </div>;
    
    return <div className="card">
      <div className="weatherWrapper">
        <WeatherData city={city} region={region} country={country}
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