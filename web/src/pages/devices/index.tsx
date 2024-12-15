// pages/devices.js
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table/data-table';
import React from 'react';
import { Device, columns } from '@/components/data-table/devices';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [deviceName, setDeviceName] = React.useState('');
	const [deviceLocation, setDeviceLocation] = React.useState('');
	const [deviceList, setDeviceList] = React.useState(devices);
	
	const handleAddDevice = () => {
		setDeviceList((prev) => {
			const newDevice: Device = {
				id: String(prev.length + 1),
				name: deviceName,
				status: 'Inactive',
				location: deviceLocation,
				time_active: '0h 0m',
			};
			return [...prev, newDevice];
		});
		setDialogOpen(false);
	}

	return (

		<Layout>
			{/* Main Content */}
			<main className="w-full p-8">
				{/* Header */}
				<header className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Devices</h1>
					<Button
						onClick={() => {
							console.log('Add Device');
							setDialogOpen(true);
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
						data={deviceList}
						layout={layout}
						setLayout={setLayout}
					/>

				</section>
			</main>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add Device</DialogTitle>
						<DialogDescription>
							{/* Make changes to your profile here. Click save when you're done. */}
							Enter the details of the device you want to add.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								defaultValue="Device X"
								className="col-span-3"
								value={deviceName}
								onChange={(e) => setDeviceName(e.target.value)}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="username" className="text-right">
								Location (Latitude, Longitude)
							</Label>
							<Input
								id="username"
								defaultValue="33.123, 44.123"
								className="col-span-3"
								value={deviceLocation}
								onChange={(e) => setDeviceLocation(e.target.value)}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							onClick={handleAddDevice}
							className="bg-red-600 text-white hover:bg-red-700"
							type="submit">Add Device</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

		</Layout>
	);
	// </div>
};

export default DeviceListPage;
