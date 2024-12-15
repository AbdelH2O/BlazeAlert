import React from 'react';
import Layout from '@/components/layout';
import Map from '@/components/map';
import { MapProvider } from '@/components/map-provider';
import NoSsr from '@/components/no-ssr';

export default function MapPage() {
  return (
	<NoSsr>
		<MapProvider>
			<Layout>
			<h1 className="text-3xl font-bold mb-4">Map Interface</h1>
			
			<div className="bg-gray-300 border w-full rounded-lg w-full flex items-center justify-center">
				<Map />
			</div>
			
			{/* Legend */}
			<div className="mt-6">
				<h2 className="text-2xl font-semibold mb-2">Legend</h2>
				<ul className="flex space-x-4">
				<li className="flex items-center">
					<span className="w-4 h-4 bg-green-500 rounded-full inline-block mr-2"></span>
					<span>Normal</span>
				</li>
				<li className="flex items-center">
					<span className="w-4 h-4 bg-orange-500 rounded-full inline-block mr-2"></span>
					<span>Potential Risk</span>
				</li>
				<li className="flex items-center">
					<span className="w-4 h-4 bg-red-500 rounded-full inline-block mr-2"></span>
					<span>Warning</span>
				</li>
				</ul>
			</div>
			</Layout>
		</MapProvider>
	</NoSsr>
  );
}