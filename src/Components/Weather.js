import axios from 'axios';
import React from 'react';
import './Weather.css';

const CORS_HEADER = "https://cors-anywhere.herokuapp.com/";
//const DARKSKY_API_CALL = "https://api.darksky.net/forecast/640bddbf1aa37eddd8253e47a46a46a8/";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      temp: "",
      description: "",
      windSpeed: ""
    };

    this.getLocation = this.getLocation.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);
  }


  getLocation = () => {
      axios
        .get("https://ipinfo.io/json")
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
    
    const { city, region, country,  temp, description, id, wind } = this.state;

    const WeatherData = ({ city, region, country, temp, description, id }) => 
      <div>
          <h4 className="location"> {city} </h4>
          <h4 className="country_and_flag"> {region} {country}  </h4>
          <i id='icon' className={'wi wi-owm-' + tod + '-' + id}></i>
          <h3 className="temp-desc"> {temp} °, {description} </h3>
         {/*  <h5 className="wind">Wind Speed: {wind} km/h </h5>   */}
      </div>;
    
    return <div className="container">
      <div className="weatherWrapper">
        <WeatherData city={city} region={region} country={country}
                     /* from OpenWeatherMap API CALL */
                     temp={temp}
                     description={description}
                     id={id}
                     wind={wind}
        />
        </div>
      </div>;
  }
}

export default Weather;