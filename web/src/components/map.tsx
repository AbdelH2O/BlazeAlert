import { GoogleMap, Marker } from "@react-google-maps/api";

//Map's styling
export const defaultMapContainerStyle = {
	width: '100%',
	height: '80vh',
	borderRadius: '15px 0px 0px 15px',
};
const defaultMapOptions = {
	zoomControl: true,
	tilt: 0,
	gestureHandling: 'auto',
	mapTypeId: 'satellite',
};
const defaultMapCenter = {
	// 33.518838, -5.102900
	lat: 33.518838,
	lng: -5.102900
}
const defaultMapZoom = 16
const markers = [
	{ lat: 33.518838, lng: -5.102900 },
	{ lat: 33.520548, lng: -5.106552 },
	{ lat: 33.515657, lng: -5.110121 },
]

export default function Map() {
	if (typeof global.window === 'undefined') return null;
	return (
		<div className="w-full">
			<GoogleMap
				mapContainerStyle={defaultMapContainerStyle}
				center={defaultMapCenter}
				zoom={defaultMapZoom}
				options={defaultMapOptions}>
				{markers.map((marker, index) => (
					<Marker key={index} position={marker} icon={"https://maps.google.com/mapfiles/ms/icons/green-dot.png"}>
					</Marker>
				))}
				<Marker position={{ lat: 33.515697, lng: -5.111021 }} icon={"https://maps.google.com/mapfiles/ms/icons/orange-dot.png"}>
				</Marker>
			</GoogleMap>
		</div>
	)
};
