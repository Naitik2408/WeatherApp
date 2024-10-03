import React from 'react';

const WeatherDashboardSkeleton = () => {
  return (
    <div className="bg-gray-200 flex-1 p-10 flex flex-col justify-between animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center text-xl font-semibold">
        <div className="flex gap-6 items-center">
          <div className="h-6 bg-gray-300 rounded w-16"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="flex gap-6 items-center">
          <div className="h-12 w-12 bg-gray-400 rounded-full"></div>
          <div className="h-12 w-12 bg-gray-400 rounded-full"></div>
          <div className="w-12 h-12 rounded-full bg-gray-400"></div>
        </div>
      </div>

      {/* Week forecast */}
      <div className="grid grid-cols-7 gap-3">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl h-28"></div>
        ))}
      </div>

      {/* Today's Highlights */}
      <div>
        <div className="mb-8 h-8 bg-gray-300 rounded w-48"></div>
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl h-24"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboardSkeleton;
