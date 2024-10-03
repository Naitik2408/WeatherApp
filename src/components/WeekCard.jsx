import React from 'react';
import rain from '../assets/weather.png';

function WeekCard({ day, icon, maxTemp, minTemp, tempType }) {
  return (
    <div className='flex flex-col justify-between items-center bg-white px-8 py-4 rounded-2xl gap-2 shadow-md shadow-gray-300'>
      <div>{day}</div>
      <div className='w-12'><img src={icon} alt="weather icon" /></div>
      <div className='flex gap-1'>
        <div>{Math.round(maxTemp)}{tempType? '°C':'°F'}</div>
        -
        <div>{Math.round(minTemp)}{tempType? '°C':'°F'}</div>
      </div>
    </div>
  );
}

export default WeekCard;
