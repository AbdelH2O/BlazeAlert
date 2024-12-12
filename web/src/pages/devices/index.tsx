// pages/devices.js
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table/data-table';
import React from 'react';
import { Device, columns } from '@/components/data-table/devices';

const devices: Device[] = [
	{
		id: '1',
		name: 'Device 1',
		status: 'Active',
		location: '33.123, 44.123',
		time_active: '2h 30m',
	},
	{
		id: '2',
		name: 'Device 2',
		status: 'Inactive',
		location: '33.123, 44.123',
		time_active: '1h 30m',
	},
	{
		id: '3',
		name: 'Device 3',
		status: 'Active',
		location: '33.123, 44.123',
		time_active: '3h 30m',
	},
]

const DeviceListPage = () => {
	const [layout, setLayout] = React.useState<'grid' | 'list'>('list');
	// <div className="flex h-screen">
	//   {/* Sidebar Navigation */}
	//   <aside className="w-1/5 bg-gray-800 text-white flex flex-col p-4">
	//     <div className="text-2xl font-bold mb-6">BlazeAlert</div>
	//     <nav className="flex flex-col gap-6">
	//       <a href="/home" className="text-gray-300 hover:text-white text-lg">Home</a>
	//       <a href="/map" className="text-gray-300 hover:text-white text-lg">Map</a>
	//       <a href="/statistics" className="text-gray-300 hover:text-white text-lg">Statistics</a>
	//     </nav>
	//   </aside>
	return (

		<Layout>
			{/* Main Content */}
			<main className="w-4/5 p-8">
				{/* Header */}
				<header className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Devices</h1>
					<Button
						onClick={() => {
							console.log('Add Device');
						}}
						className="bg-red-600 text-white hover:bg-red-700"
					>
						Add Device
					</Button>
				</header>

				{/* Device List */}
				<section className="bg-white p-6 shadow-lg rounded-lg">
					{/* <h2 className="text-2xl font-medium text-gray-800 mb-4">Registered Devices</h2> */}
					<DataTable
						columns={columns}
						data={devices}
						layout={layout}
						setLayout={setLayout}
					/>
					
				</section>
			</main>
		</Layout>
	);
	// </div>
};

export default DeviceListPage;
