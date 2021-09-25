import publicIp from "react-public-ip";
import React, {useState, useEffect} from "react";
import axios from "axios";
import './App.css';
import earth from './images/earth.png';
import Login from "./Login";

const App = () => {
    console.log(Login.handleChange);
    const [weather, setWeather] = useState({})
    const [userDetails, setUserDetails] = useState(null)
    const [season, setSeason] = useState({})
  const fetchGeoLocation = async (ip) => {
    if(ip){
      return await axios.get(`https://geo.ipify.org/api/v1?apiKey=at_8XrZ8UrBlzmxYzgR2J2hcFp7ZtnC3&ipAddress=${ip}`);
    }
  }

  const fetchGeoLocationAddress = async (city, country) => {
    if(city && country){
      return  await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=5070f6fea5200623773cf6f8e661ab5e`);
     
    }
  }

  const getIpAddress = async () => {
    const  publicIpV4 = await publicIp.v4();

    if(publicIpV4){
      const result = await fetchGeoLocation(publicIpV4);
      const { city, country} = result.data.location;
      const address = await fetchGeoLocationAddress(city, country);
      setWeather(address.data)
      console.log(address.data.main.temp)
      let description = address.data.weather[0].description.toString().toLowerCase()
      if (address.data.main.temp < 288){
        setSeason("winter")
      }
      else if (address.data.main.temp > 288){
        if(description.includes("rain") || description.includes("thunderstorm")) {
          setSeason("rain")
        }
        else if(description.includes("mist") || description.includes("haze")) {
          setSeason("mist")
        }
        else{
          setSeason("summer")
        }
      }
    }
  }

 useEffect(() => {
    getIpAddress()
    const users = JSON.parse(localStorage.getItem("users")) || null;
    setUserDetails(users)
    console.log(users);
  }, [])

  console.log(userDetails);

  if(!Object.keys(weather).length) return <div>Loading....</div>

  return (
    <div className ={season}>
    <div className="App">
      <header className="App-header ${season}">
        <h1>Hi {userDetails.name} ! Here are the weather details of your location.</h1>
        <div className = "overLap">
        <img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} alt="logo" className="weather" />
        <img src={earth} alt="earth" className="earth"/>
        </div>
        <ul><b>
        <li>Weather condition: {weather.weather[0].main}</li>
        <li>Pressure:  {weather.main.pressure} hPa</li>
        <li>Wind speed:  {weather.wind.speed} meter/sec</li>
        <li>Humidity:  {weather.main.humidity}  %</li>
        <li>Temperature: {Math.round(weather.main.temp - 273.15)} °C</li>
        </b>
        </ul>
      </header>
    </div>
    </div>
  );
}

export default App;
