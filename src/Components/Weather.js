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
      precipIntensity: "",
      precipProbability: "",
      windSpeed: ""
    };
    this.getWeatherData = this.getWeatherData.bind(this);
  }

  componentWillMount() {
    this.getLocation();
  }

  getLocation = () => {
      axios
        .get("https://api.ipdata.co/?api-key=036623005d047344581751a318e8869d09652e6c031e7d2be99e7e74")
        .then(response => {
          this.setState({
            city: response.data.city,
            region: response.data.region,
            country_name: response.data.country_name,
            latitude: response.data.latitude, //not actually displayed on screen
            longitude: response.data.longitude, //not actually displayed on screen
            emoji_flag: response.data.emoji_flag
          });
        })
        .catch(error => {
          console.log(error);
        });
  };

  componentWillReceiveProps(nextProps) {
    this.getWeatherData();
  }

  getWeatherData = () => {
    axios
      // Old Darksy API CALL
      // .get(CORS_HEADER + DARKSKY_API_CALL + this.state.latitude + "," + this.state.longitude + "?units=si")
      .get(CORS_HEADER +"https://api.openweathermap.org/data/2.5/weather?lat="+ this.state.latitude + "&lon="+this.state.longitude+"&units=metric&appid=13b0886c7c035390785605fc1c637712")
      .then(response => {
        this.setState({
          temp: response.data.main.temp,
          description: response.data.weather[0].main,
          id: response.data.weather[0].id,
          wind: response.data.wind.speed //not actually displayed on screen
        });
      })
      .catch(error => {
        console.log(error);
      });
     console.log("Temperature: " + this.state.temp);
     console.log("Description: " + this.state.description);
     console.log("ID: " + this.state.id);
     console.log("Wind Speed: " + this.state.wind);
     //get lat & long values from previous API call
     console.log("Latitude: " + this.state.latitude);
     console.log("Longitude: " + this.state.longitude);
  };

 
  render() {

    let hr = new Date().getHours();
    let tod = hr >= 17 ? "night" : "day";
    
    const { city, region, country_name, emoji_flag, temp, description, id } = this.state;

    const WeatherData = ({ city, region, country_name, emoji_flag, temp, description, id }) => 
      <div>
          <p className="location"> {city}, {region} </p>
          <p className="country_and_flag">  {country_name} {emoji_flag} </p>
    
          <p className="temp-desc"> {temp} °, {description} </p>
          <i id='icon' className={'wi wi-owm-' + tod + '-' + id}></i>
      </div>;
    
    return <div className="container">
        <div className="weatherWrapper" onClick={this.getWeatherData}>
          <WeatherData city={city} region={region} country_name={country_name} emoji_flag={emoji_flag} 
            /* from OpenWeatherMap API CALL */
            temp={temp} description={description} id={id} />
        </div>
      </div>;
  }
}

export default Weather;