import React, { useContext, useState } from "react";

import "../App.css";
import weatherContext from "./Context/weatherContext";
import axios from "axios";

import humidityImg from "../Assets/humidity.png";
import feelsLikeImg from "../Assets/feelslike.png";
import { Icon } from "semantic-ui-react";

const Weather = () => {
  const context = useContext(weatherContext);
  const { setProgress } = context;

  const [weatherData, setWeatherData] = useState({
    weatherIcon: "",
    temprature: 0,
    weatherName: "",
    weatherCityName: "",
    stateName: "",
    countryName: "",
    feelsLikeTemp: "",
    humidity: "",
  });

  const [isCityListAvailable, setCityListAvailability] = useState(false);
  const [isWeatherAvailable, setWeatherAvailability] = useState(false);

  const [cityName, setCityName] = useState("");
  const [fetchedCities, setFetchedCities] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");

  const fetchCities = async (event) => {
    try {
      if (event.key === "Enter" && cityName !== "") {
        setProgress(10)
        setCityListAvailability(false);
        setWeatherAvailability(false);
        const res = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&lang=en&&appid=${process.env.REACT_APP_API_KEY_FOR_CITIES}`
        );
        setProgress(50)
        setFetchedCities(res.data);
        setCityListAvailability(true);
        setProgress(100)
      }
    } catch (error) {
      setErrorMsg("Internal Server Error. Please try again later.");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      setProgress(100)
    }
  };

  const fetchWeather = async (city) => {
    try {
      setProgress(10)
      setWeatherAvailability(false);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.REACT_APP_API_KEY_FOR_WEATHER}&units=metric`
      );
      setProgress(50)
      if (res.data.cod === 200) {
        setWeatherData({
          ...weatherData,
          weatherIcon: res.data.weather[0].icon,
          temprature: Math.floor(res.data.main.temp),
          weatherName: res.data.weather[0].description.toUpperCase(),
          weatherCityName: city.name,
          stateName: city.state,
          countryName: res.data.sys.country,
          feelsLikeTemp: Math.floor(res.data.main.feels_like),
          humidity: Math.floor(res.data.main.humidity),
        });
      }
      setWeatherAvailability(true);
      setProgress(100)
    } catch (error) {
      setErrorMsg("Internal Server Error. Please try again later.");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      setProgress(100)
    }
  };

  return (
    <div className="h-full w-full flex relative overflow-y-hidden">
      <div className="flex flex-row w-full px-6">
        <div className="searchForm flex flex-col items-center justify-center w-full">
          <p
            className="text-3xl tablet:text-4xl font-bold text-white py-7"
            style={{ textShadow: "3px 4px 4px #000" }}
          >
            Sense weather
            <br />
            <span
              className="text-lg tablet:text-xl text-white font-medium tracking-wide"
              style={{ textShadow: "3px 4px 4px #000" }}
            >
              from any city in the world in just few clicks
            </span>
          </p>
          <div className="formDiv flex flex-col w-full items-center justify-center">
            <div className="w-full tablet:w-fit">
              <input
                type="text"
                value={cityName}
                onChange={(event) => {
                  setCityName(event.target.value);
                }}
                onKeyDown={fetchCities}
                placeholder="Start typing city name hit enter"
                className="w-full tracking-wider tablet:w-96 text-white px-4 py-3 text-lg rounded-xl bg-[rgba(255,255,255,0.25)] backdrop-blur-md focus:outline-none"
              />
              <p className="place-self-start text-gray-400 tracking-wide px-4">
                {errorMsg}
              </p>
            </div>
          </div>

          <div className="flex flex-row py-10">
            {isCityListAvailable && isWeatherAvailable ? (
              <div className="weatherCard flex flex-col px-4 py-6 rounded-lg bg-[rgba(255,255,255,0.25)] backdrop-blur-md w-fit">
                <div className="cardBody px-8 py-1 space-y-3 flex flex-col items-center justify-center">
                  <div className="iconDiv">
                    <img
                      src={`https://openweathermap.org/img/w/${weatherData.weatherIcon}.png`}
                      alt="Weather Icon"
                      className="aspect-square w-24 h-24"
                    />
                  </div>
                  <div className="flex flex-col space-y-4 px-4 pb-4 text-center">
                    <div>
                      <p className="font-semibold text-5xl text-center">
                        {weatherData.temprature} &#176;C
                      </p>
                    </div>
                    <p className="text-xl">{weatherData.weatherName}</p>
                    <div className="flex items-center my-auto">
                      <div className="flex text-center">
                        <Icon name="map marker alternate" />
                        <p className="text-xl"><span>{weatherData.weatherCityName && <span>{weatherData.weatherCityName}</span>}</span><span>{weatherData.stateName && <span>, {weatherData.stateName}</span>}</span><span>{weatherData.countryName && <span>, {weatherData.countryName}</span>}</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cardFooter">
                  <div className="flex">
                    <div className="w-[50%] flex justify-center border-t border-r border-t-[#808080] border-r-[#808080] py-4 px-6 space-x-1">
                      <div className="flex my-auto">
                        <img
                          src={feelsLikeImg}
                          alt="icon"
                          className="aspect-square w-8"
                        />
                      </div>
                      <div className="flex flex-col text-white">
                        <div>
                          <p className="text-xl">
                            {weatherData.feelsLikeTemp} &#176;C
                          </p>
                        </div>
                        <div>
                          <p className="text-base">Feels like</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[50%] flex justify-center border-t border-t-[#808080] py-4 px-6 space-x-1">
                      <div className="flex my-auto">
                        <img
                          src={humidityImg}
                          alt="icon"
                          className="aspect-square w-8"
                        />
                      </div>
                      <div className="flex flex-col text-white">
                        <div>
                          <p className="text-xl">{weatherData.humidity} %</p>
                        </div>
                        <div>
                          <p className="text-base">Humidity</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {isCityListAvailable && !isWeatherAvailable ? (
              <>
                {fetchedCities.length !== 0 ? (
                  <>
                    <div className="grid grid-cols-autofit gap-5">
                      {fetchedCities.map((city) => {
                        return (
                          <div
                            className="grid grid-cols-autofit gap-[15px] px-3 py-4 rounded-md bg-[rgba(255,255,255,0.25)] backdrop-blur-md"
                            key={city.lat}
                          >
                            <div
                              className="flex flex-col w-full h-full text-white tracking-wider cursor-pointer"
                              onClick={() => {
                                fetchWeather(city);
                              }}
                            >
                              <p>
                                <span>
                                  {city.name && <span>{city.name}</span>}
                                </span>
                                <span>
                                  {city.state && <span>, {city.state}</span>}
                                </span>
                                <span>
                                  {city.country && (
                                    <span>, {city.country}</span>
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-white">
                      This city doesn't belong to planet Earth. We only fetch
                      weather for cities around the globe.
                    </p>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
