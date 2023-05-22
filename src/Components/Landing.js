import React, { useContext, useState } from "react";

import "../App.css";
import weatherContext from "./Context/weatherContext";
import moment from "moment/moment";
import Weather from "./Weather";

const Landing = () => {
  const context = useContext(weatherContext);
  const {
    topBarData,
    fetchTopBarData,
    isTopBarAvailable,
    setProgress 
  } = context;

  const handleGetStarted = async () => {
    setProgress(10)
    await fetchTopBarData();
    setProgress(100)
  };

  const timeAtRender = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  const [liveWatch, setLiveWatch] = useState(timeAtRender)

  const updateTime = () => {
    const tempTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    setLiveWatch(tempTime)
  }

  setInterval(updateTime, 1000);

  return (
    <div className="h-full w-full">
      <div className="content absolute top-0 text-black h-full w-screen flex flex-col">
        {isTopBarAvailable && <div className="flex w-full justify-between">
          <div className="brandDiv w-[40%] tablet:w-[25%] h-full flex bg-gradient-to-b from-black to-transparent">
            <div className="flex w-full items-center justify-center">
                <p className="font-bold text-base text-white tracking-wider">WeatherSense<span className="text-baseOrange hidden desktop:inline">&nbsp;-&nbsp;The Weather App</span></p>
            </div>
          </div>

          <div className="flex w-[60%] tablet:w-[50%]">
          <div className="w-full bg-gradient-to-b from-white to-transparent flex overflow-hidden">
            <div className="inner flex">
              <div className="w-[200%] bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-transparent flex">
                {topBarData.map((city) => {
                    return (
                      <div
                        className="flex px-1 items-center space-x-1 w-fit"
                        key={city.name}
                      >
                        <img
                          src={`https://openweathermap.org/img/w/${city.icon}.png`}
                          className="aspect-square w-8 h-8 laptop:w-10"
                          alt="icon"
                        />
                        <p className="w-52">
                          {city.temp} &#176;C &nbsp;&nbsp;&nbsp; {city.name},{" "}
                          {city.country}
                        </p>
                      </div>
                    );
                  })}
              </div>

              <div className="w-[200%] bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-transparent flex">
                {topBarData.map((city) => {
                    return (
                      <div
                        className="flex px-1 items-center space-x-1 w-fit"
                        key={city.name}
                      >
                        <img
                          src={`https://openweathermap.org/img/w/${city.icon}.png`}
                          className="aspect-square w-8 h-8 laptop:w-10"
                          alt="icon"
                        />
                        <p className="w-52">
                          {city.temp} &#176;C &nbsp;&nbsp;&nbsp; {city.name},{" "}
                          {city.country}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          </div>

          <div className="hidden tablet:flex justify-center items-center w-[25%] h-full bg-gradient-to-b from-black to-transparent">
            <div className="flex text-white">
              <p className="font-medium">{liveWatch}</p>
            </div>
          </div>
        </div>}

        {
          isTopBarAvailable ?
          <>
          <Weather />
          </>
          :
          <div className="flex justify-center my-auto w-full to-blue-100">
          <div className="flex flex-col items-center justify-center pt-12 px-4 h-full tablet:w-[80%] laptop:w-1/2 space-y-5">
            <div className="flex flex-row">
              <p
                className="text-4xl tablet:text-7xl font-bold text-white"
                style={{ textShadow: "3px 4px 4px #000" }}
              >
                Weather
              </p>
              <p
                className="text-4xl tablet:text-7xl font-bold text-[#010101]"
                style={{ textShadow: "1px 1px 3px #000" }}
              >
                Sense
              </p>
            </div>
            <div className="flex flex-col mx-auto space-y-10">
              <p
                className="text-xl tablet:text-2xl text-justify tablet:text-center tracking-wide leading-7 text-white"
                style={{ textShadow: "3px 4px 1px #000" }}
              >
                Your to-go source for accurate and up-to-date weather information.
                Stay informed about the current weather conditions for your
                location or any other city in the world.
              </p>
              <button
                to="/Weather"
                className="text-xl px-6 py-3 font-semibold tracking-wide bg-baseOrange w-fit rounded-lg self-center outline-baseOrange outline-offset-2 hover:text-current hover:outline focus:outline-none"
                onClick={handleGetStarted}
              >
                Get started
              </button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Landing;