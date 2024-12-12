// pages/device.js
import React from 'react';
import Layout from '@/components/layout';

const DevicePage = () => {
	// <div className="flex h-screen">
	//   {/* Sidebar Navigation */}
	//   <aside className="w-1/5 bg-gray-800 text-white flex flex-col p-4">
	//     <div className="text-2xl font-bold mb-6">BlazeAlert</div>
	//     <nav className="flex flex-col gap-6">
	//       <a href="/list" className="text-gray-300 hover:text-white text-lg">Device List</a>
	//       <a href="/map" className="text-gray-300 hover:text-white text-lg">Map</a>
	//       <a href="/statistics" className="text-gray-300 hover:text-white text-lg">Statistics</a>
	//     </nav>
	//   </aside>
	return (
		<Layout>
			<main className="w-full p-8">

				{/* Device Information Section */}
				<section className="bg-white p-8 border sha dow-lg rounded-lg mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Risk Assessment</h1>
					<p className="text-gray-500 text-lg">Based on the Last 24h</p>

					<div className="text-5xl font-bold text-orange-600 mt-6">High Risk</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
						<div className="p-4 bg-g ray-50 border rounded shadow text-center">
							<div className="font-semibold text-lg">Wind Speed</div>
							<div className="text-xl">3 m/s</div>
						</div>
						<div className="p-4 bg-g ray-50 border rounded shadow text-center">
							<div className="font-semibold text-lg">Humidity Level</div>
							<div className="text-xl">50%</div>
						</div>
						<div className="p-4 bg-g ray-50 border rounded shadow text-center">
							<div className="font-semibold text-lg">Smoke Level</div>
							<div className="text-xl">0 ppm</div>
						</div>
						<div className="p-4 bg-g ray-50 border rounded shadow text-center">
							<div className="font-semibold text-lg">Visibility</div>
							<div className="text-xl">12 km</div>
						</div>
						<div className="p-4 bg-g ray-50 border rounded shadow text-center">
							<div className="font-semibold text-lg">Feels Like</div>
							<div className="text-xl">30°C</div>
						</div>
						<div className="p-4 bg-g ray-50 border rounded shadow text-center">
							<div className="font-semibold text-lg">Chance of Rain</div>
							<div className="text-xl">0%</div>
						</div>
						<div className="p-4 bg-g ray-50 border rounded shadow text-center">
							<div className="font-semibold text-lg">Pressure</div>
							<div className="text-xl">1008 hPa</div>
						</div>
						<div className="p-4 bg-g ray-50 border rounded shadow text-center">
							<div className="font-semibold text-lg">Sunset</div>
							<div className="text-xl">20:58</div>
						</div>
					</div>
				</section>

				{/* Live Updates and 7-day Statistics */}
				<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="p-6 bg-white border shad ow-lg rounded-lg">
						<h2 className="text-2xl font-bold text-gray-800 mb-4">Critical Locations</h2>
						<div className="flex justify-around">
							<div className="flex flex-col items-center">
								<div className="w-10 h-10 relative flex items-center justify-center ">
									<div className="absolute w-10 h-10 bg-green-600 animate-pulse flex items-center justify-center rounded-full mb-2"></div>
									<div className="w-3/4 h-3/4 bg-green-600 animate-ping flex items-center justify-center rounded-full mb-2 text-white font-bold"></div>
								</div>
								<div className="text-gray-600">Green Hill</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-10 h-10 relative flex items-center justify-center ">
									<div className="absolute w-10 h-10 bg-green-600 animate-pulse flex items-center justify-center rounded-full mb-2"></div>
									<div className="w-3/4 h-3/4 bg-green-600 animate-ping flex items-center justify-center rounded-full mb-2 text-white font-bold"></div>
								</div>
								<div className="text-gray-600">North Center</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-10 h-10 relative flex items-center justify-center ">
									<div className="absolute w-10 h-10 bg-orange-600 animate-pulse flex items-center justify-center rounded-full mb-2"></div>
									<div className="w-3/4 h-3/4 bg-orange-600 animate-ping flex items-center justify-center rounded-full mb-2 text-white font-bold"></div>
								</div>
								<div className="text-gray-600">South Edge</div>
							</div>
							{/* <div className="flex flex-col items-center">
								<div className="w-10 h-10 bg-gray-200 rounded-full mb-2"></div>
								<div className="text-gray-600">North Center</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-10 h-10 bg-gray-200 rounded-full mb-2"></div>
								<div className="text-gray-600"></div>
							</div> */}
						</div>
					</div>
					<div className="p-6 bg-white border shad ow-lg rounded-lg">
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
								<span className="font-semibold">23°C</span>
							</li>
							{/* Add more days as needed */}
						</ul>
					</div>
				</section>
			</main>
		</Layout>
	);
};

export default DevicePage;
