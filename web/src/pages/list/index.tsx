// pages/devices.js
import React from 'react';

const DeviceListPage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-1/5 bg-gray-800 text-white flex flex-col p-4">
        <div className="text-2xl font-bold mb-6">BlazeAlert</div>
        <nav className="flex flex-col gap-6">
          <a href="/home" className="text-gray-300 hover:text-white text-lg">Home</a>
          <a href="/map" className="text-gray-300 hover:text-white text-lg">Map</a>
          <a href="/statistics" className="text-gray-300 hover:text-white text-lg">Statistics</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-4/5 p-8 bg-gray-100">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Devices</h1>
          <button className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700">
            Add Device
          </button>
        </header>

        {/* Device List */}
        <section className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Registered Devices</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Device Name</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Location</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="border p-2">Device 1</td>
                <td className="border p-2 text-green-500">Active</td>
                <td className="border p-2">Region 1</td>
                <td className="border p-2">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border p-2">Device 2</td>
                <td className="border p-2 text-red-500">Inactive</td>
                <td className="border p-2">Region 2</td>
                <td className="border p-2">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border p-2">Device 3</td>
                <td className="border p-2 text-yellow-500">Alert</td>
                <td className="border p-2">Region 3</td>
                <td className="border p-2">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default DeviceListPage;
