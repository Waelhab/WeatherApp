import React, { useEffect, useRef, useState } from 'react'
import '../pages/Weather.css'
import humidity from "../assets/humidity.png"
import windSpeed from "../assets/windspeed.png"
import search from "../assets/search.png"

import img from "../assets/img.png"
export default function WeatherPage() {
    const inputRef = useRef()
    const [weatherData,setWeatherData] = useState(false)
    const searchCity = async (city) =>{

        
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            

            const response = await fetch(url)
            const data = await response.json();
            console.log(data)
            setWeatherData({
                apiHumidity : data.main.humidity,
                apiWindSpeed : data.wind.speed,
                apiTemprature : Math.floor(data.main.temp),
                location : data.name
            })
        }catch(error){

        }
    }

    useEffect(()=>{
        searchCity("jeddah")
    },[])



  return (
    <div>
      <div className=' h-screen w-screen flex justify-center items-center '>
            <div className='background h-[600px] w-[400px] rounded-lg flex items-center justify-evenly flex-col'>
                <div className='flex'>
                <input ref={inputRef}  type="text" placeholder="Search" className="rounded-lg px-4 py-1 border border-gray-100 focus:border-purple-600 border-1 outline-none " />
                <img src={search} className='w-4 h-4 mt-2 mx-2 cursor-pointer ' onClick={()=>{
                   searchCity( inputRef.current.value)
                }}/>
                </div>

                <img src={img} className='w-44' />

                <div >
                   <p> {weatherData.apiTemprature} <sup>o</sup> C</p>
                    <p>{weatherData.location}</p>
                </div>

                <div className='flex'>
                    <div className='flex '>
                        <img src={humidity} className='w-10 h-10 mx-2'  />
                        <div>
                            <p>{weatherData.apiHumidity}%</p>
                            <p>Humidity</p>
                        </div>

                    </div>
                    <div className='flex'>
                        <img src={windSpeed} className='w-10 h-10 mx-2'  />
                        <div>
                            <p>{weatherData.apiWindSpeed} km/h</p>
                            <p>Wind Speed</p>
                        </div>

                    </div>
                </div>
            </div>
      </div>
    </div>
  )
}
