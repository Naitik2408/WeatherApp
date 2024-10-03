import React, { useState, useEffect } from 'react';
import WeekCard from './components/WeekCard';
import { IoMdArrowUp } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import rain from './assets/weather.png';
import { IoMdCloudOutline } from "react-icons/io";
import fetchData from './api/fetchData';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import WeatherDashboardSkeleton from './skeleton/WeatherDashboardSkeleton';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]); // State for forecast data
  const [location, setLocation] = useState('Delhi'); // Default location
  const [searchTerm, setSearchTerm] = useState(''); // Separate state for input
  const [loading, setLoading] = useState(true); // Track loading state
  const [tempType, setTempType] = useState(true);

  // Function to fetch data when the location changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true); // Set loading state to true while fetching
        const currentWeather = await fetchData('current.json', location);
        const forecastWeather = await fetchData('forecast.json', location); // Fetch forecast data
        setWeatherData(currentWeather);
        setForecastData(forecastWeather.forecast.forecastday); // Set forecast data
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchWeatherData();
  }, [location]); // Fetch data when location changes

  // Handle search button click
  const handleSearch = () => {
    if (searchTerm.trim()) {
      setLocation(searchTerm); // Update location with search term
    }
  };

  const handleTempType = ()=>{
    setTempType(!tempType);
  }

  // Display loading skeleton if data is still being fetched or weatherData is not available
  const isSkeletonVisible = loading || !weatherData || forecastData.length === 0;

  return (
    <div className='w-full min:h-screen h-screen flex lg:flex-row flex-col'>
      {/* Sidebar */}
      <div className='lg:w-[30%] w-full lg:p-10 p-5 flex flex-col justify-between'>
        <div className='flex items-center gap-3 p-3 rounded-md border shadow-md justify-center'>
          <input
            type="text"
            placeholder='Search for places...'
            className='outline-none flex-1'
            value={searchTerm} // Bind input to searchTerm
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
          />
          <div
            className='font-semibold bg-gray-100 p-3 rounded-md hover:bg-gray-200 cursor-pointer'
            onClick={handleSearch} // Trigger search on button click
          >
            <IoSearch />
          </div>
        </div>

        {/* Left Sidebar Skeleton */}
        {isSkeletonVisible && (
          <div className="mt-5 flex flex-col items-center">
            <div className="h-20 w-full bg-gray-300 rounded-md mb-2 animate-pulse"></div>
            <div className="h-12 w-full bg-gray-300 rounded-md mb-2 animate-pulse"></div>
            <div className="h-12 w-full bg-gray-300 rounded-md mb-2 animate-pulse"></div>
          </div>
        )}

        {!isSkeletonVisible && (
          <>
            <div className='w-full mt-5 flex justify-center items-center'>
              <img src={rain} alt="weather" className='w-[60%]' />
            </div>
            <div className='flex gap-2 text-gray-800'>
              <div className='text-7xl'>{Math.round(tempType? weatherData.current.temp_c: weatherData.current.temp_f)}</div>
              <div className='text-3xl'>{tempType? '°C':'°F'}</div>
            </div>
            <div className='border-b border-gray-300 pb-4 flex gap-2 text-xl'>
              <div className='font-semibold text-gray-800'>{weatherData.location.name}, </div>
              <div>{weatherData.location.localtime.split(' ')[1]}</div>
            </div>
            <div className='flex flex-col gap-3 mt-5'>
              <div className='flex gap-4 items-center'>
                <div className='text-xl text-gray-500'><IoMdCloudOutline /></div>
                <div className='font-semibold text-gray-700'>{weatherData.current.condition.text}</div>
              </div>
            </div>
            <div className='w-full h-32 rounded-2xl overflow-hidden mt-5'>
              <img src="https://images.unsplash.com/photo-1525476325627-1380280dcfab?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover' />
            </div> 
          </>

        )}
      </div>

      {/* Main content */}
      <div className={`bg-gray-200 lg:flex-1 lg:p-10 p-5 flex flex-col justify-between`}>
        {isSkeletonVisible ? (
          <WeatherDashboardSkeleton />
        ) : (
          <>
            <div className='flex justify-between items-center text-xl text-gray-800 font-semibold mb-5'>
              <div className='flex lg:gap-6 gap-2 items-center'>
                {/* <div>Today</div> */}
                <div>Week</div>
              </div>
              <div className='flex lg:gap-6 gap-2 items-center'>
                <div className={`h-full aspect-square ${tempType? 'bg-gray-900': 'bg-gray-300'} cursor-pointer flex justify-center items-center lg:p-4 p-2 text-sm rounded-full ${tempType? 'text-gray-50': 'text-gray-900'}`} onClick={handleTempType}>C</div>
                <div className={`h-full aspect-square ${tempType? 'bg-gray-300': 'bg-gray-900'} cursor-pointer flex justify-center items-center lg:p-4 p-2 text-sm rounded-full ${tempType? 'text-gray-900': 'text-gray-50'} text-gray-50`} onClick={handleTempType}>F</div>
                <div className='w-8 h-8 lg:w-12 lg:h-12 rounded-full overflow-hidden'>
                  <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                    alt=""
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
            </div>

            {/* Week forecast */}
            <div className='grid lg:grid-cols-7 grid-cols-2 gap-3'>
              {forecastData.map((day, index) => (
                <WeekCard
                  key={index}
                  day={new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  icon={day.day.condition.icon}
                  maxTemp={tempType? day.day.maxtemp_c:day.day.maxtemp_f}
                  minTemp={tempType? day.day.mintemp_c:day.day.mintemp_f}
                  tempType={tempType}
                />
              ))}
            </div>

            {/* Today's Highlight */}
            <div className='mt-16'>
              <div className='mb-8 text-xl font-semibold text-gray-800'>Today's Highlight</div>
              <div className='grid lg:grid-cols-3 grid-cols-2 gap-3'>
                <div className='bg-white rounded-2xl p-5 flex flex-col'>
                  <div className='text-gray-400 mb-2'>UV Index</div>
                  <div className="w-24 h-24">
                    <CircularProgressbarWithChildren
                      value={weatherData.current.uv}
                      maxValue={12}
                      styles={buildStyles({
                        pathColor: weatherData.current.uv < 6 ? '#f59e0b' : weatherData.current.uv < 9 ? '#f97316' : '#ef4444',
                        trailColor: '#e5e7eb',
                        rotation: 0.75, // Rotate the gauge to make it a semi-circle
                        strokeLinecap: 'round',
                      })}
                    >
                      <div className="text-2xl font-semibold text-gray-800">{weatherData.current.uv}</div>
                    </CircularProgressbarWithChildren>
                  </div>
                </div>
                <div className='bg-white rounded-2xl p-5 flex flex-col gap-3'>
                  <div className='text-gray-400'>Wind Status</div>
                  <div className='font-semibold text-gray-800 flex flex-col lg:flex-row gap-1 items-end'>
                    <div className='lg:text-5xl text-4xl'>{weatherData.current.wind_kph.toFixed(2)}</div>
                    <div className='text-xl'>km/h</div>
                  </div>
                </div>
                <div className='bg-white rounded-2xl p-5'>
                  <div className='text-gray-400 mb-4'>Humidity</div>
                  <div className='font-semibold text-gray-800 flex gap-1 items-start'>
                    <div className='text-5xl'>{weatherData.current.humidity}</div>
                    <div className='text-xl'>%</div>
                  </div>
                </div>
                <div className='bg-white rounded-2xl p-5 flex flex-col gap-3'>
                  <div className='text-gray-400'>Visibility</div>
                  <div className='flex gap-1 items-center text-gray-600'>
                    <IoMdArrowUp />
                    <div>{weatherData.current.vis_km} km</div>
                  </div>
                </div>
                <div className='bg-white rounded-2xl p-5'>
                  <div className='text-gray-400 mb-2'>Air Quality</div>
                  <div className='text-xl font-semibold text-gray-800'>{weatherData.current.air_quality ? weatherData.current.air_quality['us-epa-index'] : 'N/A'}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;