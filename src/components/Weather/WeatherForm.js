import React, { Component } from 'react'
import axios from 'axios';
const CORS_HEADER = "https://cors-anywhere.herokuapp.com/";
const OW_API = "13b0886c7c035390785605fc1c637712";

let inputStyle = {
    borderRadius: '5px',
    padding: '0.3em 0.7em',
    fontFamily: 'Roboto Condensed',
    fontSize: '1em',
    height: '2em'
  }

class WeatherForm extends React.Component {

    searchLocation = (e) => {
        e.preventDefault();
        const query = e.target.value;
        
        axios
        .get(CORS_HEADER + `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${OW_API}`)
    }

    render() {
        return (
            <div>
            <form className="form-inline" onSubmit={this.searchLocation}>
                <div className="form-group">
                    <input type="search"
                        className="form-control"
                        style={inputStyle}
                        name="city"
                        placeholder="Search for a city..." />       
                    <button className="btn btn-primary btn-sm">Submit</button>
                </div>
            </form>
            </div>
        )
    }
}

export default WeatherForm