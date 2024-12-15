// import { MapProvider } from "@/components/map-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		// <MapProvider>
			<Component {...pageProps} />
		// </MapProvider>
	)
}
