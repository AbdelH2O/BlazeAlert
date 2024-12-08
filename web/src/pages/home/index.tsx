// pages/device.js
import React from 'react';

const DevicePage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-1/5 bg-gray-800 text-white flex flex-col p-4">
        <div className="text-2xl font-bold mb-6">BlazeAlert</div>
        <nav className="flex flex-col gap-6">
          <a href="/list" className="text-gray-300 hover:text-white text-lg">Device List</a>
          <a href="/map" className="text-gray-300 hover:text-white text-lg">Map</a>
          <a href="/statistics" className="text-gray-300 hover:text-white text-lg">Statistics</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-4/5 p-8 bg-gray-100">
        {/* Search Bar */}
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search for devices"
            className="w-2/3 p-3 border rounded shadow"
          />
        </div>

        {/* Device Information Section */}
        <section className="bg-white p-8 shadow-lg rounded-lg mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Device Name</h1>
          <p className="text-gray-500 text-lg">Fire Risk Assessment</p>

          <div className="text-5xl font-bold text-red-500 mt-6">High Risk</div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div className="p-4 bg-gray-50 border rounded shadow text-center">
              <div className="font-semibold text-lg">Wind Speed</div>
              <div className="text-xl">3 m/s</div>
            </div>
            <div className="p-4 bg-gray-50 border rounded shadow text-center">
              <div className="font-semibold text-lg">Humidity Level</div>
              <div className="text-xl">50%</div>
            </div>
            <div className="p-4 bg-gray-50 border rounded shadow text-center">
              <div className="font-semibold text-lg">Smoke Level</div>
              <div className="text-xl">0 ppm</div>
            </div>
            <div className="p-4 bg-gray-50 border rounded shadow text-center">
              <div className="font-semibold text-lg">Visibility</div>
              <div className="text-xl">12 km</div>
            </div>
            <div className="p-4 bg-gray-50 border rounded shadow text-center">
              <div className="font-semibold text-lg">Feels Like</div>
              <div className="text-xl">30°C</div>
            </div>
            <div className="p-4 bg-gray-50 border rounded shadow text-center">
              <div className="font-semibold text-lg">Chance of Rain</div>
              <div className="text-xl">0%</div>
            </div>
            <div className="p-4 bg-gray-50 border rounded shadow text-center">
              <div className="font-semibold text-lg">Pressure</div>
              <div className="text-xl">1008 hPa</div>
            </div>
            <div className="p-4 bg-gray-50 border rounded shadow text-center">
              <div className="font-semibold text-lg">Sunset</div>
              <div className="text-xl">20:58</div>
            </div>
          </div>
        </section>

        {/* Live Updates and 7-day Statistics */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Updates</h2>
            <div className="flex justify-around">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mb-2"></div>
                <div className="text-gray-600">Last Update</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mb-2"></div>
                <div className="text-gray-600">24h Readings</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mb-2"></div>
                <div className="text-gray-600">48h Readings</div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7-day Statistics</h2>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span className="text-gray-700">Today</span>
                <span className="text-gray-500">Sunny</span>
                <span className="font-semibold">25°C</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-700">Tuesday</span>
                <span className="text-gray-500">Sunny</span>
                <span className="font-semibold">Device OK</span>
              </li>
              {/* Add more days as needed */}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DevicePage;
