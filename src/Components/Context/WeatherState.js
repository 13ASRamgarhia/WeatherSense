import React, { useState } from "react"
import weatherContext from "./weatherContext"
import axios from "axios"

const WeatherState = (props) => {
    const [topBarCityWeather, setTopBarCityWeather] = useState([
        {
            name: "Delhi",
            country: "IN",
            icon: "50n",
            temp: 0
        },
        {
            name: "Mumbai",
            country: "IN",
            icon: "50n",
            temp: 0
        },
        {
            name: "London",
            country: "GB",
            icon: "50n",
            temp: 0
        },
        {
            name: "New York",
            country: "US",
            icon: "50n",
            temp: 0
        },
        {
            name: "Dubai",
            country: "AE",
            icon: "50n",
            temp: 0
        },
    ])

    let topBarResData = [];
    const [topBarData, setTopBarData] = useState()
    const [count, setCount] = useState(0)
    const [isTopBarAvailable, setTopBarAvailability] = useState(false)
    const [progress, setProgress] = useState(0)

    const fetchTopBarData = async () => {
    try{
      for(let city of topBarCityWeather){
        if(count >= 1){
          return
        }

        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=789d46d0b3daa38fa228e274f22dd40c&units=metric`)

        const calcTemp = parseInt(res.data.main.temp)
        
        topBarResData = topBarResData.concat({
          name: res.data.name,
          country: res.data.sys.country,
          icon: res.data.weather[0].icon,
          temp: calcTemp
        })
     }
     setCount(count + 1)
     setTopBarData(topBarResData)
     setTopBarAvailability(true)
    }
    catch(error){
      console.log(error.message)
    }
  }

    return(
        <weatherContext.Provider value = {{topBarCityWeather, setTopBarCityWeather, topBarData, setTopBarData, isTopBarAvailable, setTopBarAvailability, fetchTopBarData, progress, setProgress, }}>
            {props.children}
        </weatherContext.Provider>
    )
}

export default WeatherState;